import { useEffect, useState } from 'react';
import propertyService from '../../services/propertyService';
import { useAuth } from '../../context/AuthContext';
import PropertyGrid from '../property/PropertyGrid';
import EditProperty from './EditProperty';
import AddProperty from './AddProperty';

export default function MyProperties() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const loadProperties = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await propertyService.getPropertiesByLandlord(user.uid);
      setProperties(data);
    } catch (err) {
      setError('Could not load your properties. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) loadProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  const handleDelete = async (pid) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      await propertyService.deleteProperty(pid);
      setProperties((prev) => prev.filter((p) => p.pid !== pid));
    } catch (err) {
      alert('Failed to delete property.');
    }
  };

  const handleAdded = (created) => {
    setProperties((prev) => [...prev, created]);
    setShowAddForm(false);
  };

  const handleUpdated = (updated) => {
    setProperties((prev) => prev.map((p) => (p.pid === updated.pid ? updated : p)));
    setEditing(null);
  };

  return (
    <div className="dashboard-section">
      <div className="dashboard-header">
        <h2>My Properties</h2>
        <button className="btn-primary" onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? 'Close Form' : '+ Add Property'}
        </button>
      </div>

      {showAddForm && <AddProperty onAdded={handleAdded} />}

      <PropertyGrid
        properties={properties}
        loading={loading}
        error={error}
        renderActions={(property) => (
          <>
            <button className="btn-primary" onClick={() => setEditing(property)}>
              Edit
            </button>
            <button className="btn-danger" onClick={() => handleDelete(property.pid)}>
              Delete
            </button>
          </>
        )}
      />

      {editing && (
        <EditProperty property={editing} onUpdated={handleUpdated} onCancel={() => setEditing(null)} />
      )}
    </div>
  );
}
