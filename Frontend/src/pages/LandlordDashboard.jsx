import { Link } from 'react-router-dom';
import MyProperties from '../components/landlord/MyProperties';

export default function LandlordDashboard() {
  return (
    <div>
      <div className="dashboard-header" style={{ padding: '16px 24px 0' }}>
        <span />
        <Link to="/landlord/requests" className="btn-primary">
          📋 My Requests
        </Link>
      </div>
      <MyProperties />
    </div>
  );
}
