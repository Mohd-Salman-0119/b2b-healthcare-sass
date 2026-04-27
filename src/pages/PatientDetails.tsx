import { useAppStore } from '../store/useAppStore';
import { LayoutGrid, List } from 'lucide-react';

export const PatientDetails = () => {
  const { patients, viewMode, setViewMode } = useAppStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Critical': return <span className="badge badge-danger">Critical</span>;
      case 'Stable': return <span className="badge badge-success">Stable</span>;
      case 'Recovering': return <span className="badge badge-warning">Recovering</span>;
      default: return <span className="badge" style={{ background: 'var(--border-color)' }}>{status}</span>;
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Patient Directory</h1>
          <p style={{ color: 'var(--text-light)' }}>Manage and view all your active patients.</p>
        </div>
        
        <div style={{ display: 'flex', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius)', padding: '0.25rem' }}>
          <button 
            onClick={() => setViewMode('grid')}
            style={{ 
              padding: '0.5rem', 
              borderRadius: '8px',
              background: viewMode === 'grid' ? 'var(--primary-color)' : 'transparent',
              color: viewMode === 'grid' ? 'white' : 'var(--text-light)',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            <LayoutGrid size={18} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            style={{ 
              padding: '0.5rem', 
              borderRadius: '8px',
              background: viewMode === 'list' ? 'var(--primary-color)' : 'transparent',
              color: viewMode === 'list' ? 'white' : 'var(--text-light)',
              display: 'flex', alignItems: 'center', gap: '0.5rem'
            }}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {patients.map(patient => (
            <div key={patient.id} className="card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <img src={patient.avatarUrl} alt={patient.name} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid var(--border-color)' }} />
                {getStatusBadge(patient.status)}
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{patient.name}</h3>
              <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '1rem' }}>{patient.age} years old</p>
              
              <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Condition</p>
                <p style={{ fontWeight: 500 }}>{patient.condition}</p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>Last Visit: {patient.lastVisit}</span>
                <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Details</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-light)' }}>Patient</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-light)' }}>Age</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-light)' }}>Condition</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-light)' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-light)' }}>Last Visit</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-light)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, idx) => (
                <tr key={patient.id} style={{ borderBottom: idx !== patients.length - 1 ? '1px solid var(--border-color)' : 'none', transition: 'var(--transition)' }}>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={patient.avatarUrl} alt={patient.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                      <span style={{ fontWeight: 500 }}>{patient.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-light)' }}>{patient.age}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{patient.condition}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{getStatusBadge(patient.status)}</td>
                  <td style={{ padding: '1rem 1.5rem', color: 'var(--text-light)' }}>{patient.lastVisit}</td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
