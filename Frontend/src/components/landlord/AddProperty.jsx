import { useEffect, useState } from 'react';
import propertyService from '../../services/propertyService';
import { useAuth } from '../../context/AuthContext';

const EMPTY_FORM = {
  address: '',
  cid: '',
  rent: '',
  ptid: '',
  status: 'Available',
  deposit: '',
  images: '',
  description: '',
};

// Hardcoded data based on your MySQL tables
const INITIAL_CITIES = [
  { cid: 1, cname: 'Pune' },
  { cid: 2, cname: 'Mumbai' },
  { cid: 3, cname: 'Bengaluru' },
  { cid: 4, cname: 'New Delhi' },
  { cid: 5, cname: 'Chennai' },
];

const INITIAL_PROPERTY_TYPES = [
  { ptid: 1, typename: '1 BHK Apartment' },
  { ptid: 2, typename: '2 BHK Apartment' },
  { ptid: 3, typename: '3 BHK Apartment' },
  { ptid: 4, typename: 'Studio Apartment' },
  { ptid: 5, typename: 'Independent Villa' },
  { ptid: 6, typename: 'PGs' },
];

export default function AddProperty({ onAdded }) {
  const { user } = useAuth();
  const [form, setForm] = useState(EMPTY_FORM);
  
  // Initialize state with your database records
  const [cities, setCities] = useState(INITIAL_CITIES);
  const [propertyTypes, setPropertyTypes] = useState(INITIAL_PROPERTY_TYPES);
  
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [cityData, typeData] = await Promise.all([
          propertyService.getCities(),
          propertyService.getPropertyTypes(),
        ]);
        
        // If your API returns data, it will override the hardcoded data.
        // If the API isn't ready yet, the dropdowns will still work perfectly.
        if (cityData && cityData.length > 0) setCities(cityData);
        if (typeData && typeData.length > 0) setPropertyTypes(typeData);
      } catch (err) {
        // Silently fail to API errors, keeping the INITIAL_CITIES and INITIAL_PROPERTY_TYPES active
        console.log("Using static dropdown data due to API fetch error.");
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
        landlordId: user?.uid,
        address: form.address,
        cid: Number(form.cid),
        rent: Number(form.rent),
        ptid: Number(form.ptid),
        status: form.status,
        description: form.description,
        deposit: form.deposit ? Number(form.deposit) : 0,
        images: form.images,
      };
      const created = await propertyService.addProperty(payload);
      setForm(EMPTY_FORM);
      onAdded?.(created);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add property. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <h3>Add New Property</h3>
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
        <label>Image URLs (comma separated, optional)</label>
        <input name="images" value={form.images} onChange={handleChange} placeholder="img_url_1.jpg, img_url_2.jpg" />
      </div>

      <div className="form-row">
        <label>Description</label>
        <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
      </div>

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Property'}
      </button>
    </form>
  );
}