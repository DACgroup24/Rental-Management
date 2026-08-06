import { useEffect, useState } from 'react';
import bookingService, { VISIT_STATUS } from '../../services/bookingService';
import { useAuth } from '../../context/AuthContext';

// The backend doesn't track a "seen" flag for visit updates, so we track
// which decided (accepted/declined) request IDs the tenant has already
// dismissed locally, per user, so the "NEW" badge doesn't reappear.
function seenKey(uid) {
  return `seenVisitRequests:${uid}`;
}

function readSeen(uid) {
  try {
    const raw = localStorage.getItem(seenKey(uid));
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function writeSeen(uid, set) {
  localStorage.setItem(seenKey(uid), JSON.stringify([...set]));
}

export default function VisitNotifications() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [seen, setSeen] = useState(new Set());
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user?.uid) return;
    setLoading(true);
    try {
      const list = await bookingService.getUserRequests(user.uid);
      list.sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));
      setRequests(list);
      setSeen(readSeen(user.uid));
    } catch {
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  if (loading || requests.length === 0) return null;

  const statusLabel = (status) => VISIT_STATUS[status] ?? 'pending';
  const isUnseen = (req) =>
    statusLabel(req.status) !== 'pending' && !seen.has(req.requestId);

  const unseenCount = requests.filter(isUnseen).length;

  const dismiss = (requestId) => {
    const next = new Set(seen);
    next.add(requestId);
    setSeen(next);
    writeSeen(user.uid, next);
  };

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <h2>
          🔔 My Visit Requests
          {unseenCount > 0 && (
            <span className="notif-count-badge">{unseenCount}</span>
          )}
        </h2>
      </div>

      <div className="visit-requests-list">
        {requests.map((req) => {
          const status = statusLabel(req.status);
          const unseen = isUnseen(req);
          return (
            <div
              className={`visit-request-card ${unseen ? 'unseen' : ''}`}
              key={req.requestId}
            >
              <div className="visit-request-info">
                <h4>{req.propertyAddress}</h4>
                <p>
                  🗓️ {req.visitDate} at {req.visitTime}
                </p>
                <span className={`visit-status-badge ${status}`}>{status}</span>
                {unseen && <span className="notif-new-tag">NEW</span>}
              </div>

              {unseen && (
                <div className="visit-request-actions">
                  <button className="btn-secondary" onClick={() => dismiss(req.requestId)}>
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
