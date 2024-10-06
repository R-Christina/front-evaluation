import React, { useEffect } from "react";

// Composant Loading
const Loading = () => {
  // Keyframes pour l'animation (tu peux aussi les mettre dans un fichier CSS séparé)
  const styleTag = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  `;

  // Ajouter les styles dynamiques au montage du composant
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styleTag;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet); // Nettoyer lors du démontage
    };
  }, []);

  return (
    <div style={loadingContainerStyle}>
      <div style={spinnerStyle}></div>
      <p style={loadingTextStyle}>Loading...</p>
    </div>
  );
};

// Styles du composant
const loadingContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f4f8', // Couleur de fond douce
};

const spinnerStyle = {
  width: '50px',
  height: '50px',
  border: '6px solid rgba(0, 0, 0, 0.1)', // Bordures subtiles
  borderTop: '6px solid #3498db', // Bordure supérieure animée (couleur principale)
  borderRadius: '50%',
  animation: 'spin 1s linear infinite', // Animation du spinner
};

const loadingTextStyle = {
  marginTop: '20px',
  fontSize: '18px',
  fontWeight: '600',
  color: '#2c3e50', // Couleur du texte
  letterSpacing: '1.2px',
  animation: 'fadeIn 1.5s ease-in-out infinite', // Animation du texte
};

export default Loading;
