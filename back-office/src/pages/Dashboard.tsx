const Dashboard = () => {
  return (
    <>
      <h2 className="fr-h3">Tableau de Bord</h2>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body fr-py-2w">
              <h3 className="fr-h5">Dernières Activités</h3>
              <ul>
                <li>Nouvel article publié : "Réforme de la Santé"</li>
                <li>Utilisateur "Jean Dupont" s'est inscrit</li>
                <li>Nouveau commentaire sur "Vaccination 2024"</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body fr-py-2w">
              <h3 className="fr-h5">Statistiques</h3>
              <ul>
                <li>Articles publiés : 120</li>
                <li>Utilisateurs enregistrés : 450</li>
                <li>Commentaires en attente : 10</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body fr-py-2w">
              <h3 className="fr-h5">Derniers Utilisateurs</h3>
              <ul>
                <li>Jean Dupont - Inscrit le 01/04/2024</li>
                <li>Marie Curie - Inscrite le 31/03/2024</li>
                <li>Albert Einstein - Inscrit le 30/03/2024</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body fr-py-2w">
              <h3 className="fr-h5">Derniers Commentaires</h3>
              <ul>
                <li>"Très bon article !" - par Sophie</li>
                <li>"Besoin de plus d'infos sur ce sujet." - par Paul</li>
                <li>"Merci pour ces précisions." - par Léa</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
