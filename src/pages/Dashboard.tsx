import { useAppStore } from '../store/useAppStore';
import { Users, Activity, HeartPulse, Clock } from 'lucide-react';

export const Dashboard = () => {
  const patients = useAppStore(state => state.patients);
  const criticalCount = patients.filter(p => p.status === 'Critical').length;
  const stableCount = patients.filter(p => p.status === 'Stable').length;

  const stats = [
    { label: 'Total Patients', value: patients.length, icon: <Users size={24} color="#0ea5e9" />, bg: 'rgba(14, 165, 233, 0.1)' },
    { label: 'Critical Cases', value: criticalCount, icon: <Activity size={24} color="#ef4444" />, bg: 'rgba(239, 68, 68, 0.1)' },
    { label: 'Stable', value: stableCount, icon: <HeartPulse size={24} color="#10b981" />, bg: 'rgba(16, 185, 129, 0.1)' },
    { label: 'Pending Visits', value: 12, icon: <Clock size={24} color="#f59e0b" />, bg: 'rgba(245, 158, 11, 0.1)' }
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
        <p style={{ color: 'var(--text-light)' }}>Welcome back! Here's what's happening in your facility today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {stats.map((stat, idx) => (
          <div key={idx} className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {stat.icon}
            </div>
            <div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>{stat.label}</p>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ padding: '1.5rem' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Recent Critical Alerts</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {patients.filter(p => p.status === 'Critical').map(patient => (
            <div key={patient.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', background: 'var(--bg-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={patient.avatarUrl} alt={patient.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div>
                  <h4 style={{ fontWeight: 600 }}>{patient.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>{patient.condition}</p>
                </div>
              </div>
              <span className="badge badge-danger">Needs Attention</span>
            </div>
          ))}
          {criticalCount === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>
              No critical patients at the moment.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
