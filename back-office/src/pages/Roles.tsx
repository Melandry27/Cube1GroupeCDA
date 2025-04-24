import { useEffect, useState } from "react";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/roles");
        if (!response.ok) throw new Error("Erreur lors de la récupération des rôles");
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoles();
  }, []);
    return (
      <>
        <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
          <h2 className="fr-h3 fr-mr-auto">Liste des Rôles</h2>
          {/* <button className="fr-btn fr-btn--primary fr-ml-auto">Ajouter un Rôle</button> */}
        </div>
        
        <div className="fr-table fr-table--full fr-mt-2w">
          <table className="fr-table">
              <thead>
              <tr>
                  <th style={{ width: '1%' }}>Nom du Rôle</th>
                  {/* <th style={{ width: '15%' }}>Actions</th> */}
              </tr>
              </thead>
              <tbody>
              {roles.map((role) => (
                <tr key={role._id}>
                  <td>{role.name}</td>
                  {/* <td>
                    <div className="fr-btns-group fr-btns-group--inline">
                      <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w">Modifier</button>
                      <button className="fr-btn fr-btn--tertiary fr-btn--sm">Supprimer</button>
                    </div>
                  </td> */}
                </tr>
              ))}
              </tbody>
          </table>
        </div>
      </>
    );
  };
  
  export default Roles;
  