import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertyService from '../services/propertyService';
import VisitRequestDrawer from '../components/common/VisitRequestDrawer';

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="350"><rect width="100%25" height="100%25" fill="%23e2e8f0"/><text x="50%25" y="50%25" font-size="20" fill="%2394a3b8" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>';

function imageList(images) {
  if (!images) return [];
  return images
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showVisitDrawer, setShowVisitDrawer] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await propertyService.getPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError('Could not load property details.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p className="status-msg">Loading...</p>;
  if (error) return <p className="status-msg error">{error}</p>;
  if (!property) return <p className="status-msg">Property not found.</p>;

  const {
    address,
    cityName,
    rent,
    propertyTypeName,
    landlordName,
    status,
    deposit,
    description,
    images,
  } = property;

  const pics = imageList(images);

  return (
    <div className="property-details">
      <Link to="/available-properties" className="back-link">
        ← Back to search
      </Link>
      <div className="property-details-card">
        <img src={pics[0] || FALLBACK_IMAGE} alt={address} onError={(e) => (e.target.src = FALLBACK_IMAGE)} />
        <div className="property-details-body">
          <h2>{address}</h2>
          <p className="property-location">📍 {cityName || 'Unknown city'}</p>
          <div className="property-meta">
            <span>💰 ₹{rent}/mo</span>
            {propertyTypeName && <span>🏷️ {propertyTypeName}</span>}
            {status && <span>📌 {status}</span>}
            {deposit != null && <span>🔒 Deposit ₹{deposit}</span>}
          </div>
          <p className="property-owner">Owner: {landlordName || 'N/A'}</p>
          {description && <p className="property-description">{description}</p>}

          <button
            className="request-visit-btn"
            onClick={() => setShowVisitDrawer(true)}
          >
            📅 Request a Visit
          </button>
        </div>
      </div>

      <VisitRequestDrawer
        isOpen={showVisitDrawer}
        onClose={() => setShowVisitDrawer(false)}
        property={property}
      />
    </div>
  );
}