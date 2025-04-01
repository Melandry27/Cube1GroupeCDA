import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="fr-container fr-my-10v">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body">
              <h1 className="fr-h2 fr-mt-2w fr-text--error">Page introuvable</h1>
              <p>La page que vous recherchez n'existe pas ou a été déplacée.</p>
              <Link to="/" className="fr-btn fr-btn--blue-france fr-mt-4w fr-mb-2w">
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
