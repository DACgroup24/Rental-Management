import { useEffect, useState } from 'react';
import propertyService from '../../services/propertyService';

export default function SearchBar({ onSearch, onReset }) {
  const [type, setType] = useState('');
  const [city, setCity] = useState('');
  const [propertyTypes, setPropertyTypes] = useState([]);

  // Load the real property-type list from the DB (property-type table)
  // instead of a hardcoded array, so the dropdown always matches what
  // /api/properties/search can actually find.
  useEffect(() => {
    (async () => {
      try {
        const data = await propertyService.getPropertyTypes();
        setPropertyTypes(data);
      } catch (err) {
        // Non-fatal: search still works without the dropdown being populated.
        setPropertyTypes([]);
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ type, city });
  };

  const handleReset = () => {
    setType('');
    setCity('');
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
        placeholder="Enter city (e.g. Mumbai)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button type="submit" className="btn-primary">
        Search
      </button>
      <button type="button" className="btn-secondary" onClick={handleReset}>
        Reset
      </button>
    </form>
  );
}
