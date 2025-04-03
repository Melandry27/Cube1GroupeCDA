import { useState } from "react";
import { useNavigate } from "react-router";

const CreateUser = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    role: "",
    status: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Utilisateur créé :", user);

    // Remplacer par une requête API pour créer l'utilisateur
    // await fetch("/api/users", {
    //   method: "POST",
    //   body: JSON.stringify(user),
    //   headers: { "Content-Type": "application/json" },
    // });

    navigate("/users");
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <h2 className="fr-h3">Créer un Utilisateur</h2>
      <form onSubmit={handleSubmit} className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="username">Nom d'utilisateur</label>
          <input
            className="fr-input"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="email">Email</label>
          <input
            className="fr-input"
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="role">Rôle</label>
          <select
            className="fr-select"
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un rôle</option>
            <option value="admin">Administrateur</option>
            <option value="editor">Éditeur</option>
            <option value="viewer">Lecteur</option>
          </select>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="status">Statut</label>
          <select
            className="fr-select"
            id="status"
            name="status"
            value={user.status}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un statut</option>
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>

        <div className="fr-col-12 fr-grid-row fr-mt-4w" style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button type="button" className="fr-btn fr-btn--secondary" onClick={goBack}>Annuler</button>
          <button type="submit" className="fr-btn fr-btn--primary">Créer</button>
        </div>
      </form>
    </>
  );
};

export default CreateUser;
