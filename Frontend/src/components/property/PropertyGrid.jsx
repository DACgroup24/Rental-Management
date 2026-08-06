import PropertyCard from './PropertyCard';

export default function PropertyGrid({ properties, loading, error, renderActions }) {
  if (loading) {
    return <p className="status-msg">Loading properties...</p>;
  }

  if (error) {
    return <p className="status-msg error">{error}</p>;
  }

  if (!properties || properties.length === 0) {
    return <p className="status-msg">No properties found. Try adjusting your search.</p>;
  }

  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard
          key={property.pid}
          property={property}
          actions={renderActions ? renderActions(property) : null}
        />
      ))}
    </div>
  );
}
