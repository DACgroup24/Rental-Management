import { useEffect, useState } from 'react';
import propertyService from '../../services/propertyService';

// A modal-style edit form. Pass the property to edit and callbacks.
export default function EditProperty({ property, onUpdated, onCancel }) {
  const [form, setForm] = useState({
    landlordId: property.landlordId,
    address: property.address || '',
    cid: property.cid || '',
    rent: property.rent || '',
    ptid: property.ptid || '',
    status: property.status || 'Available',
    deposit: property.deposit || '',
    images: property.images || '',
    description: property.description || '',
  });
  const [cities, setCities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [cityData, typeData] = await Promise.all([
          propertyService.getCities(),
          propertyService.getPropertyTypes(),
        ]);
        setCities(cityData);
        setPropertyTypes(typeData);
      } catch (err) {
        // Dropdowns simply stay empty.
      }
    })();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        landlordId: form.landlordId,
        address: form.address,
        cid: Number(form.cid),
        rent: Number(form.rent),
        ptid: Number(form.ptid),
        status: form.status,
        description: form.description,
        deposit: form.deposit ? Number(form.deposit) : 0,
        images: form.images,
      };
      const updated = await propertyService.updateProperty(property.pid, payload);
      onUpdated?.(updated);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update property.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <form className="property-form modal-form" onSubmit={handleSubmit}>
        <h3>Edit Property</h3>
        {error && <p className="status-msg error">{error}</p>}

        <div className="form-row">
          <label>Address</label>
          <input name="address" value={form.address} onChange={handleChange} required />
        </div>

        <div className="form-row form-row-split">
          <div>
            <label>City</label>
            <select name="cid" value={form.cid} onChange={handleChange} required>
              <option value="">Select city</option>
              {cities.map((c) => (
                <option key={c.cid} value={c.cid}>
                  {c.cname}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Property Type</label>
            <select name="ptid" value={form.ptid} onChange={handleChange} required>
              <option value="">Select type</option>
              {propertyTypes.map((t) => (
                <option key={t.ptid} value={t.ptid}>
                  {t.typename}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row form-row-split">
          <div>
            <label>Rent (₹/month)</label>
            <input name="rent" type="number" min="0" value={form.rent} onChange={handleChange} required />
          </div>
          <div>
            <label>Deposit (₹)</label>
            <input name="deposit" type="number" min="0" value={form.deposit} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Available</option>
            <option>Rented</option>
          </select>
        </div>

        <div className="form-row">
          <label>Image URLs (comma separated)</label>
          <input name="images" value={form.images} onChange={handleChange} />
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
