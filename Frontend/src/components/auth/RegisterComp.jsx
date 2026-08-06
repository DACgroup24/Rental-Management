import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import propertyService from '../../services/propertyService';

export default function RegisterForm() {
  const navigate = useNavigate();
  
  // The state keys now EXACTLY match your Spring Boot backend variables!
  const [form, setForm] = useState({ 
    uname: '', 
    email: '', 
    phone: '',
    adharno: '',
    address: '',
    cid: '', // populated once /api/cities has loaded, see below
    password: '', 
    confirmPassword: '',
    rid: '2'  // Matches 'rid' in Spring Boot (2 = Tenant, 3 = Landlord)
  });

  // Loaded from GET /api/cities (Gateway -> Microservice 2, port 8082)
  // instead of a hardcoded list, so this always matches whatever is
  // actually in the `city` table.
  const [cities, setCities] = useState([]);

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await propertyService.getCities();
        setCities(data);
        if (data.length > 0) {
          setForm((prev) => ({ ...prev, cid: String(data[0].cid) }));
        }
      } catch (err) {
        // Dropdown just stays empty; the user can still submit once
        // the property service is reachable and they refresh.
        setCities([]);
      }
    })();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setSubmitting(false);
      return;
    }

    try {
      await authService.register(form);
      navigate('/login');
    } catch (err) {
      console.error("Full Backend Error:", err.response?.data);

      let errMsg = 'Registration failed. Please try again.';
      
      if (err.response && err.response.data) {
        if (typeof err.response.data === 'string') {
          errMsg = err.response.data;
        } else if (err.response.data.message) {
          errMsg = err.response.data.message;
        } else {
          errMsg = "Server error occurred. Check the console for details.";
        }
      }
      
      setError(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-header" style={{ backgroundColor: '#0d47a1', color: 'white', padding: '1rem', textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2>Create Your Account</h2>
      </div>
      
      {error && <p className="status-msg error" style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div className="form-row-group" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div className="form-col" style={{ flex: 1 }}>
          <label>Username</label>
          <input name="uname" value={form.uname} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div className="form-col" style={{ flex: 1 }}>
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
      </div>

      <div className="form-row-group" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div className="form-col" style={{ flex: 1 }}>
          <label>Phone Number</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
        <div className="form-col" style={{ flex: 1 }}>
          <label>Aadhaar Number</label>
          <input type="text" name="adharno" value={form.adharno} onChange={handleChange} required style={{ width: '100%' }} />
        </div>
      </div>

      <div className="form-row" style={{ marginBottom: '1rem' }}>
        <label>Address</label>
        <textarea name="address" value={form.address} onChange={handleChange} required style={{ width: '100%', minHeight: '60px' }}></textarea>
      </div>

      <div className="form-row" style={{ marginBottom: '1rem' }}>
        <label>City</label>
        {/* Changed name to 'cid' to match backend */}
        <select name="cid" value={form.cid} onChange={handleChange} style={{ width: '100%' }}>
          <option value="1">Pune</option>
          <option value="2">Mumbai</option>
          <option value="3">Bengaluru</option>
          <option value="4">New Delhi</option>
          <option value="5">Chennai</option>
        </select>
      </div>

      <div className="form-row-group" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <div className="form-col" style={{ flex: 1 }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div className="form-col" style={{ flex: 1 }}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <div className="form-row" style={{ marginBottom: '1.5rem' }}>
        <label>Register As</label>
        {/* Changed name to 'rid' and values to integers to match backend */}
        <select name="rid" value={form.rid} onChange={handleChange} style={{ width: '100%' }}>
          <option value="2">Tenant</option>
          <option value="3">Landlord</option>
        </select>
      </div>

      <button type="submit" className="btn-primary" disabled={submitting} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0d47a1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '1rem' }}>
        {submitting ? 'Creating account...' : 'Register'}
      </button>

      <div className="form-footer" style={{ textAlign: 'center' }}>
        <span>Already have an account? </span>
        <Link to="/login" style={{ color: '#0d47a1', textDecoration: 'none' }}>Login</Link>
      </div>
    </form>
  );
}