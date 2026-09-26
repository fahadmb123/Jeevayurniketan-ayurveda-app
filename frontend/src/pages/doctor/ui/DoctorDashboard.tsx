import React from 'react';

export const DoctorDashboard: React.FC = () => {
  return (
    <div style={{ padding: '40px', fontFamily: 'Inter, sans-serif' }}>
      <h1>Doctor Dashboard</h1>
      <p>Welcome to the Doctor Portal. Here you can manage patients, appointments, and view clinical records.</p>
      
      {/* Placeholder for patient management */}
      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h2>Patient List</h2>
        <button style={{ 
          padding: '10px 20px', 
          backgroundColor: 'var(--primary-green)', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer' 
        }}>
          + Add New Patient
        </button>
        <p style={{ marginTop: '15px', color: 'gray' }}>No patients added yet.</p>
      </div>
    </div>
  );
};
