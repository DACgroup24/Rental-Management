import { useState } from 'react';
import { Link } from 'react-router-dom';
import bookingService from '../../services/bookingService';
import { useAuth } from '../../context/AuthContext';

const TIME_SLOTS = [
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '04:00 PM',
  '06:00 PM',
];

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

// Backend (Microservice 3) expects a 24-hour LocalTime string, e.g. "14:00:00".
function slotTo24Hour(slot) {
  const [time, meridiem] = slot.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (meridiem === 'PM' && hours !== 12) hours += 12;
  if (meridiem === 'AM' && hours === 12) hours = 0;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
}

export default function VisitRequestDrawer({ isOpen, onClose, property }) {
  const { user } = useAuth();
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const resetAndClose = () => {
    setDate(todayISO());
    setTime('');
    setSuccess(false);
    setError('');
    onClose();
  };

  const handleBook = async () => {
    if (!date || !time) {
      setError('Please select a date and a time slot.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await bookingService.requestVisit({
        pid: property.pid,
        uid: user.uid,
        visitDate: date,
        visitTime: slotTo24Hour(time),
      });

      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        resetAndClose();
      }, 1600);
    } catch (err) {
      setSubmitting(false);
      setError(
        err?.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <>
      <div className="visit-drawer-overlay" onClick={resetAndClose} />
      <div className="visit-drawer" role="dialog" aria-label="Request a visit">
        <div className="visit-drawer-header">
          <h3>Request a Visit</h3>
          <button className="visit-drawer-close" onClick={resetAndClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="visit-drawer-body">
          {!user ? (
            <div className="visit-success">
              <p>Please log in to request a visit.</p>
              <Link to="/login" className="btn-primary" onClick={resetAndClose}>
                Go to Login
              </Link>
            </div>
          ) : success ? (
            <div className="visit-success">
              <div className="visit-success-icon">✅</div>
              <p>Visit request sent!</p>
              <p className="visit-success-sub">
                {date} at {time}
              </p>
            </div>
          ) : (
            <>
              <p className="visit-drawer-property">{property?.address}</p>

              <label className="visit-field-label" htmlFor="visit-date">
                Select Date
              </label>
              <input
                id="visit-date"
                type="date"
                min={todayISO()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="visit-date-input"
              />

              <label className="visit-field-label">Select Time Slot</label>
              <div className="visit-time-grid">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`visit-time-slot ${time === slot ? 'selected' : ''}`}
                    onClick={() => setTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>

              {error && <p className="visit-error">{error}</p>}

              <button
                className="visit-book-btn"
                onClick={handleBook}
                disabled={submitting}
              >
                {submitting ? 'Booking...' : 'Book Request'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
