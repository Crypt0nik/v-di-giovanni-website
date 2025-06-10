// Composant de test simple pour vérifier que React fonctionne
import React from 'react';

const SimpleTest: React.FC = () => {
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', fontSize: '24px' }}>
        🎉 React fonctionne !
      </h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginTop: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#d4af37', marginBottom: '10px' }}>
          V. Di Giovanni - Configurateur
        </h2>
        <p>L'application React est chargée correctement.</p>
        <p>Serveurs actifs :</p>
        <ul>
          <li>Frontend React: Port 5174 ✅</li>
          <li>Backend Laravel: Port 8002 ✅</li>
        </ul>
        
        <div style={{ marginTop: '20px' }}>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              backgroundColor: '#10B981',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            App Principale
          </button>
          
          <button 
            onClick={() => window.location.href = '/?integration=true'}
            style={{
              backgroundColor: '#d4af37',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Interface de Test
          </button>
          
          <button 
            onClick={() => window.open('http://127.0.0.1:8002/api/documentation', '_blank')}
            style={{
              backgroundColor: '#2c2c2c',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            API Documentation
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleTest;
