import { useState } from "react";
import { useNavigate } from "react-router";

const CreateRessource = () => {
  const [ressource, setRessource] = useState({
    title: "",
    author: "",
    content: "",
    category: "",
    status: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setRessource({ ...ressource, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //A remplacez par une vraie requête HTTP pour mettre à jour la ressource
    // await fetch(`/api/ressources/${id}`, {
    //   method: "POST",
    //   body: JSON.stringify(ressource),
    //   headers: { "Content-Type": "application/json" },
    // });

    navigate("/ressources");
  };

  const goBack = () => {
    window.history.back();
  }

  return (
    <>
      <h2 className="fr-h3">Créer une Ressource</h2>
      <form onSubmit={handleSubmit} className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="title">Titre</label>
          <input className="fr-input" id="title" name="title" value={ressource.title} onChange={handleChange} required />
        </div>
        
        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="author">Auteur</label>
          <input className="fr-input" id="author" name="author" value={ressource.author} onChange={handleChange} required />
        </div>
        
        <div className="fr-col-12">
          <label className="fr-label" htmlFor="content">Contenu</label>
          <textarea className="fr-input" id="content" name="content" value={ressource.content} onChange={handleChange} required style={{ resize: "vertical" }}/>
        </div>
        
        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="category">Catégorie</label>
          <select className="fr-select" id="category" name="category" value={ressource.category} onChange={handleChange}>
            <option value="">Sélectionnez une catégorie</option>
            <option value="politique">Politique</option>
            <option value="santé">Santé</option>
          </select>
        </div>
        
        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="status">Statut</label>
          <select className="fr-select" id="status" name="status" value={ressource.status} onChange={handleChange}>
            <option value="">Sélectionnez un statut</option>
            <option value="publié">Publié</option>
            <option value="brouillon">Brouillon</option>
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

export default CreateRessource;
