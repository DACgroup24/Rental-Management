import { useEffect, useState } from 'react';
import propertyService from '../services/propertyService';
import SearchBar from '../components/common/SearchBar';
import PropertyGrid from '../components/property/PropertyGrid';
import VisitNotifications from '../components/user/VisitNotifications';

export default function UserDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAll = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await propertyService.getAllProperties();
      setProperties(data);
    } catch (err) {
      setError('Could not load properties. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async ({ type, city }) => {
    setLoading(true);
    setError('');
    try {
      const data = await propertyService.searchProperties({ type, city });
      setProperties(data);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div>
      <VisitNotifications />
      <div className="dashboard-section">
        <h2>Search Properties</h2>
        <SearchBar onSearch={handleSearch} onReset={loadAll} />
        <PropertyGrid properties={properties} loading={loading} error={error} />
      </div>
    </div>
  );
}
