const Roles = () => {
    return (
      <>
        <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
          <h2 className="fr-h3 fr-mr-auto">Gestion des Rôles</h2>
          <button className="fr-btn fr-btn--primary fr-ml-auto">Ajouter un Rôle</button>
        </div>
        
        <div className="fr-table fr-table--full fr-mt-2w">
          <table className="fr-table">
              <thead>
              <tr>
                  <th style={{ width: '1%' }}>Nom du Rôle</th>
                  <th style={{ width: '30%' }}>Description</th>
                  <th style={{ width: '15%' }}>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>Administrateur</td>
                  <td>Accès total à l'administration du site</td>
                  <td>
                    <div className="fr-btns-group fr-btns-group--inline">
                      <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w">Modifier</button>
                      <button className="fr-btn fr-btn--tertiary fr-btn--sm">Supprimer</button>
                    </div>
                  </td>
              </tr>
              <tr>
                    <td>Modérateur</td>
                    <td>Peut gérer les commentaires et les utilisateurs</td>
                    <td>
                        <div className="fr-btns-group fr-btns-group--inline">
                        <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w">Modifier</button>
                        <button className="fr-btn fr-btn--tertiary fr-btn--sm">Supprimer</button>
                        </div>
                    </td>
              </tr>
              <tr>
                  <td>Éditeur</td>
                  <td>Peut modifier et publier des articles</td>
                  <td>
                    <div className="fr-btns-group fr-btns-group--inline">
                      <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w">Modifier</button>
                      <button className="fr-btn fr-btn--tertiary fr-btn--sm">Supprimer</button>
                    </div>
                  </td>
              </tr>
              <tr>
                <td>Utilisateur</td>
                <td>Accès limité aux fonctionnalités de base</td>
                <td>
                  <div className="fr-btns-group fr-btns-group--inline">
                    <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w">Modifier</button>
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
  
  export default Roles;
  