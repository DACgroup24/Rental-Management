import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterComp';

export default function Register() {
  return (
    <div className="auth-page">
      <RegisterForm />
      <p className="auth-switch">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
