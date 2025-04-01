import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <div className="fr-container fr-my-10v">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body">
              <h1 className="fr-h2 fr-mt-2w">Connexion</h1>
              <p>Connectez-vous pour accéder l'espace d'administration</p>
              
              <div className="fr-input-group">
                <label className="fr-label" htmlFor="email">Email</label>
                <input className="fr-input" type="email" id="email" placeholder="exemple@domaine.fr" />
              </div>

              <div className="fr-input-group">
                <label className="fr-label" htmlFor="password">Mot de passe</label>
                <input className="fr-input" type="password" id="password" />
              </div>

              <button className="fr-btn fr-btn--blue-france fr-mt-4w" onClick={handleLogin}>
                Se connecter
              </button>

              <p className="fr-mt-2w">
                <a href="#" className="fr-link">Mot de passe oublié ?</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;