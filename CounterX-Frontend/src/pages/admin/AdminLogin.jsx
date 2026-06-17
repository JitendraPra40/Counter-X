import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';
import { loginAdmin } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

export default function AdminLogin() {
  const [form, setForm]     = useState({ username: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await loginAdmin(form);
      login(res.data, { username: form.username });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err?.response?.data || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__bg">
        <div className="admin-login__blob admin-login__blob--1" />
        <div className="admin-login__blob admin-login__blob--2" />
        <div className="admin-login__grid" />
      </div>

      <div className="admin-login__card animate-slideUp">
        {/* Logo */}
        <div className="admin-login__logo">
          <div className="admin-login__logo-icon"><Utensils size={22} /></div>
          <span className="admin-login__logo-text">Counter<span>X</span></span>
        </div>

        <div className="admin-login__header">
          <h1 className="admin-login__title">Admin Portal</h1>
          <p className="admin-login__subtitle">Sign in to manage your restaurant</p>
        </div>

        <form className="admin-login__form" onSubmit={handleSubmit} id="admin-login-form">
          {/* Username */}
          <div className="form-group">
            <label className="form-label" htmlFor="admin-username">Username</label>
            <div className="admin-login__input-wrap">
              <User size={16} className="admin-login__input-icon" />
              <input
                id="admin-username"
                type="text"
                className="form-control admin-login__input"
                placeholder="Enter username"
                value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                required autoFocus
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <div className="admin-login__input-wrap">
              <Lock size={16} className="admin-login__input-icon" />
              <input
                id="admin-password"
                type={showPw ? 'text' : 'password'}
                className="form-control admin-login__input admin-login__input--pw"
                placeholder="Enter password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                required
              />
              <button type="button" className="admin-login__pw-toggle" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-error">
              <AlertCircle size={16} />
              {typeof error === 'string' ? error : 'Login failed.'}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-lg admin-login__submit"
            disabled={loading}
            id="admin-login-submit"
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <div className="admin-login__footer">
          <a href="/" className="admin-login__back">← Back to Restaurant</a>
        </div>
      </div>
    </div>
  );
}
