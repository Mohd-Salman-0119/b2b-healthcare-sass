export const Analytics = () => {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Analytics & Reports</h1>
        <p style={{ color: 'var(--text-light)' }}>Visualize patient data and facility performance.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '1.5rem', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Patient Recovery Rates</h3>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
            {/* Simple CSS Bar Chart representation */}
            {[45, 60, 35, 70, 55, 80].map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', gap: '0.5rem' }}>
                <div style={{ height: `${h}%`, background: 'var(--primary-color)', borderRadius: '4px 4px 0 0', width: '100%', transition: 'var(--transition)' }} className="bar"></div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', color: 'var(--text-light)', fontSize: '0.75rem' }}>
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem' }}>Cases by Department</h3>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Simple CSS Donut representation */}
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', background: 'conic-gradient(var(--primary-color) 0% 40%, var(--success-color) 40% 70%, var(--warning-color) 70% 90%, var(--danger-color) 90% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: 'var(--card-bg)' }}></div>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}><span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary-color)' }}></span> Cardiology</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}><span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--success-color)' }}></span> Neurology</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}><span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--warning-color)' }}></span> Orthopedics</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}><span style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--danger-color)' }}></span> Emergency</div>
          </div>
        </div>
      </div>
    </div>
  );
};
