import { useNavigate, Link } from "react-router";

const Users = () => {

    const navigate = useNavigate();

    const handleCreate = () => {
      navigate("create");
    };

    const handleEdit = () => {
      navigate("edit/${id}");
    };

    return (
      <>
        <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
          <h2 className="fr-h3 fr-mr-auto">Gestion des Utilisateurs</h2>
          <button className="fr-btn fr-btn--primary fr-ml-auto" onClick={handleCreate}>Ajouter un Utilisateur</button>
        </div>
        
        <div className="fr-table fr-table--full fr-mt-2w">
          <table className="fr-table">
              <thead>
              <tr>
                  <th style={{ width: '15%' }}>Nom</th>
                  <th style={{ width: '15%' }}>Email</th>
                  <th style={{ width: '15%' }}>Rôle</th>
                  <th style={{ width: '15%' }}>Date d'inscription</th>
                  <th style={{ width: '25%' }}>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>Jean Dupont</td>
                  <td>jean.dupont@email.com</td>
                  <td>Administrateur</td>
                  <td>15/03/2024</td>
                  <td>
                    <div className="fr-btns-group fr-btns-group--inline">
                      <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w" onClick={handleEdit}>Modifier</button>
                      <button className="fr-btn fr-btn--tertiary fr-btn--sm">Supprimer</button>
                    </div>
                  </td>
              </tr>
              <tr>
                  <td>Marie Curie</td>
                  <td>marie.curie@email.com</td>
                  <td>Éditeur</td>
                  <td>10/02/2024</td>
                  <td>
                    <div className="fr-btns-group fr-btns-group--inline">
                      <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w" onClick={handleEdit}>Modifier</button>
                      <button className="fr-btn fr-btn--tertiary fr-btn--sm">Supprimer</button>
                    </div>
                  </td>
              </tr>
              </tbody>
          </table>
        </div>
      </>
    );
  };
  
  export default Users;