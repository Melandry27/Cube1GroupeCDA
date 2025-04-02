import React from "react";

interface HeaderProps {
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleLogout }) => {
  return (
    <header className="fr-header">
      <div className="fr-container fr-py-2w fr-grid-row fr-grid-row--middle">
        <img
          src="/src/assets/Ministère_des_Solidarités_et_de_la_Santé.svg"
          alt="Ministère"
          className="fr-mr-2w"
          style={{ height: 50 }}
        />
        <h1 className="fr-h4"> Interface d'administration</h1>
        <button className="fr-btn fr-btn--secondary fr-ml-auto" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </header>
  );
};

export default Header;