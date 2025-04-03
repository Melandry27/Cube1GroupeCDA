import { useState } from "react";
import { useNavigate } from "react-router";

const CreateCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Catégorie créée :", category);

    // A remplacez par une vraie requête HTTP pour créer la catégorie
    // await fetch("/api/categories", {
    //   method: "POST",
    //   body: JSON.stringify(category),
    //   headers: { "Content-Type": "application/json" },
    // });

    navigate("/categories");
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <h2 className="fr-h3">Créer une Catégorie</h2>
      <form onSubmit={handleSubmit} className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="name">Nom de la catégorie</label>
          <input
            className="fr-input"
            id="name"
            name="name"
            value={category.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fr-col-12">
          <label className="fr-label" htmlFor="description">Description</label>
          <textarea
            className="fr-input"
            id="description"
            name="description"
            value={category.description}
            onChange={handleChange}
            required
            style={{ resize: "vertical" }}
          />
        </div>

        <div className="fr-col-12 fr-grid-row fr-mt-4w" style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button type="button" className="fr-btn fr-btn--secondary" onClick={goBack}>Annuler</button>
          <button type="submit" className="fr-btn fr-btn--primary">Créer</button>
        </div>
      </form>
    </>
  );
};

export default CreateCategory;
