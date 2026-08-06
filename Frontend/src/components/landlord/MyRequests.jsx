import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bookingService, { VISIT_STATUS } from '../../services/bookingService';
import { useAuth } from '../../context/AuthContext';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'declined', label: 'Declined' },
];

export default function MyRequests() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [tab, setTab] = useState('pending');
  const [busyId, setBusyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadRequests = async () => {
    setLoading(true);
    setError('');
    try {
      const list = await bookingService.getLandlordRequests(user.uid);
      // Newest first (by requested visit date).
      list.sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate));
      setRequests(list);
    } catch (err) {
      setError('Could not load visit requests. Please check the booking service connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) loadRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const handleDecision = async (requestId, decision) => {
    setBusyId(requestId);
    try {
      if (decision === 'accepted') {
        await bookingService.acceptRequest(requestId);
      } else {
        await bookingService.rejectRequest(requestId);
      }
      await loadRequests();
    } catch (err) {
      setError('Could not update the request. Please try again.');
    } finally {
      setBusyId(null);
    }
  };

  const statusLabel = (status) => VISIT_STATUS[status] ?? 'pending';

  const visible = requests.filter(
    (r) => tab === 'all' || statusLabel(r.status) === tab
  );

  return (
    <div className="visit-requests-page">
      <div className="dashboard-header">
        <h2>Visit Requests</h2>
        <Link to="/landlord/dashboard" className="btn-secondary">
          ← Back to My Properties
        </Link>
      </div>

      <div className="visit-requests-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`visit-tab ${tab === t.key ? 'active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {t.key !== 'all' && (
              <> ({requests.filter((r) => statusLabel(r.status) === t.key).length})</>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="status-msg">Loading...</p>
      ) : error ? (
        <p className="status-msg error">{error}</p>
      ) : visible.length === 0 ? (
        <p className="status-msg">No {tab !== 'all' ? tab : ''} visit requests yet.</p>
      ) : (
        <div className="visit-requests-list">
          {visible.map((req) => {
            const status = statusLabel(req.status);
            return (
              <div className="visit-request-card" key={req.requestId}>
                <div className="visit-request-info">
                  <h4>{req.propertyAddress}</h4>
                  {req.city && <p>📍 {req.city}</p>}
                  <p>👤 {req.tenantName}</p>
                  <p>✉️ {req.tenantEmail}</p>
                  <p>
                    🗓️ {req.visitDate} at {req.visitTime}
                  </p>
                  <span className={`visit-status-badge ${status}`}>{status}</span>
                </div>

                {status === 'pending' && (
                  <div className="visit-request-actions">
                    <button
                      className="visit-accept-btn"
                      disabled={busyId === req.requestId}
                      onClick={() => handleDecision(req.requestId, 'accepted')}
                    >
                      ✔ Accept
                    </button>
                    <button
                      className="visit-decline-btn"
                      disabled={busyId === req.requestId}
                      onClick={() => handleDecision(req.requestId, 'declined')}
                    >
                      ✘ Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
