import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Une erreur est survenue");
      }

      toast.success(
        "Si ce compte existe, un email de réinitialisation a été envoyé."
      );
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(
        "Impossible d'envoyer la demande. Vérifiez l'email et réessayez."
      );
    }
  };

  return (
    <div className="fr-container fr-my-10v">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body">
              <h1 className="fr-h2 fr-mt-2w">Mot de passe oublié</h1>
              <p>
                Entrez votre adresse email pour recevoir un lien de
                réinitialisation.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="fr-input-group">
                  <label className="fr-label" htmlFor="email">
                    Adresse email
                  </label>
                  <input
                    className="fr-input"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@domaine.fr"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="fr-btn fr-btn--primary fr-mt-4w"
                >
                  Envoyer
                </button>

                <p className="fr-mt-2w">
                  <Link to="/login" className="fr-link">
                    Connexion
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
