const Comments = () => {
    return (
      <>
        <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
          <h2 className="fr-h3 fr-mr-auto">Gestion des Commentaires</h2>
        </div>
        
        <div className="fr-table fr-table--full fr-mt-2w" style={{ width: '100%' }}>
          <table className="fr-table" style={{ width: '100%' }}>
              <thead>
              <tr>
                  <th>Auteur</th>
                  <th>Commentaire</th>
                  <th>Article associé</th>
                  <th>Date</th>
                  <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td>Jean Dupont</td>
                  <td>Très bon article, merci pour les infos !</td>
                  <td>Réforme de la Santé</td>
                  <td>02/04/2024</td>
                  <td>
                    <div className="fr-btns-group fr-btns-group--inline">
                      <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w">Modifier</button>
                      <button className="fr-btn fr-btn--tertiary fr-btn--sm">Supprimer</button>
                    </div>
                  </td>
              </tr>
              <tr>
                  <td>Marie Curie</td>
                  <td>Je ne suis pas d'accord avec certains points...</td>
                  <td>Vaccination 2024</td>
                  <td>01/04/2024</td>
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
  
  export default Comments;