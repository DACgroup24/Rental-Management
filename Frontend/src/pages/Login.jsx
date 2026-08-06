import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginoutComp';

export default function Login() {
  return (
    <div className="auth-page">
      <LoginForm />
      <p className="auth-switch">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}
