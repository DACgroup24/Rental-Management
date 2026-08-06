import { Link } from 'react-router-dom';

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250"><rect width="100%25" height="100%25" fill="%23e2e8f0"/><text x="50%25" y="50%25" font-size="18" fill="%2394a3b8" text-anchor="middle" dominant-baseline="middle">No Image</text></svg>';

// The `images` field on the backend is a comma-separated string of
// filenames/URLs (e.g. "img_url_1.jpg, img_url_2.jpg"). Grab the first
// one to use as the card thumbnail.
function firstImage(images) {
  if (!images) return null;
  const first = images.split(',')[0]?.trim();
  return first || null;
}

export default function PropertyCard({ property, actions }) {
  const {
    pid,
    address,
    cityName,
    rent,
    propertyTypeName,
    landlordName,
    status,
    images,
  } = property;

  const thumbnail = firstImage(images);

  return (
    <div className="property-card">
      <img
        src={thumbnail || FALLBACK_IMAGE}
        alt={address || 'Property'}
        onError={(e) => (e.target.src = FALLBACK_IMAGE)}
      />
      <div className="property-card-body">
        <h3>{address}</h3>
        <p className="property-location">
          📍 {cityName || 'Unknown city'}
        </p>
        <div className="property-meta">
          <span>💰 ₹{rent}/mo</span>
          {propertyTypeName && <span>🏷️ {propertyTypeName}</span>}
          {status && <span>📌 {status}</span>}
        </div>
        <p className="property-owner">Owner: {landlordName || 'N/A'}</p>

        <div className="property-card-actions">
          <Link to={`/property/${pid}`} className="btn-secondary">
            View Details
          </Link>
          {actions}
        </div>
      </div>
    </div>
  );
}
