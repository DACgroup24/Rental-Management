import { useEffect, useState } from 'react';
import propertyService from '../../services/propertyService';

// Same visual language as the public SearchBar, but filters the
// landlord's already-loaded properties on the client instead of
// calling /api/properties/search (which is unscoped to a landlord).
export default function MyPropertiesFilterBar({ onFilter, onReset }) {
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('');
  const [propertyTypes, setPropertyTypes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await propertyService.getPropertyTypes();
        setPropertyTypes(data);
      } catch (err) {
        setPropertyTypes([]);
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ type, city, status });
  };

  const handleReset = () => {
    setType('');
    setCity('');
    setStatus('');
    onReset();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All Property Types</option>
        {propertyTypes.map((t) => (
          <option key={t.ptid} value={t.typename}>
            {t.typename}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Filter by city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="Available">Available</option>
        <option value="Rented">Rented</option>
      </select>

      <button type="submit" className="btn-primary">
        Filter
      </button>
      <button type="button" className="btn-secondary" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}
