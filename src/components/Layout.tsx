import type { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, PieChart, LogOut, Moon, Sun, Bell } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useAppStore } from '../store/useAppStore';
import { logout } from '../services/authService';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const { user, logout: clearUser } = useAuthStore();
  const { theme, toggleTheme } = useAppStore();

  const handleLogout = async () => {
    await logout();
    clearUser();
    navigate('/login');
  };

  const notify = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('HealthSaaS Alert', {
        body: 'New patient assigned to your ward.',
        icon: '/pwa-192x192.png'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('HealthSaaS Alert', {
            body: 'Notifications enabled successfully!',
          });
        }
      });
    }
  };

  return (
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
      <aside className="sidebar glass-panel" style={{ width: '250px', padding: '1.5rem', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-color)' }}>
        <div className="logo" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            H
          </div>
          HealthSaaS
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <NavLink to="/" style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius)',
            background: isActive ? 'var(--primary-color)' : 'transparent',
            color: isActive ? 'white' : 'var(--text-color)',
            transition: 'var(--transition)',
            fontWeight: 500
          })}>
            <LayoutDashboard size={20} /> Dashboard
          </NavLink>
          <NavLink to="/patients" style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius)',
            background: isActive ? 'var(--primary-color)' : 'transparent',
            color: isActive ? 'white' : 'var(--text-color)',
            transition: 'var(--transition)',
            fontWeight: 500
          })}>
            <Users size={20} /> Patients
          </NavLink>
          <NavLink to="/analytics" style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: 'var(--radius)',
            background: isActive ? 'var(--primary-color)' : 'transparent',
            color: isActive ? 'white' : 'var(--text-color)',
            transition: 'var(--transition)',
            fontWeight: 500
          })}>
            <PieChart size={20} /> Analytics
          </NavLink>
        </nav>

        <div className="sidebar-footer" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {user?.email?.[0].toUpperCase() || 'A'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.displayName || 'Admin User'}</p>
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-light)', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger-color)', padding: '0.5rem', width: '100%', borderRadius: 'var(--radius)', transition: 'var(--transition)' }} className="btn-logout">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <header className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', zIndex: 10 }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Workspace</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={notify} style={{ padding: '0.5rem', color: 'var(--text-color)', borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={20} />
            </button>
            <button onClick={toggleTheme} style={{ padding: '0.5rem', color: 'var(--text-color)', borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </header>
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: 'var(--bg-color)' }}>
          {children}
        </div>
      </main>
    </div>
  );
};
