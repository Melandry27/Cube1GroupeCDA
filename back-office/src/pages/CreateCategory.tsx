import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://34.224.12.85:3000";

const CreateCategory = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const categoryResponse = await fetch(`${API_BASE}/api/categories`, {
        method: "POST",
        body: JSON.stringify(category),
        headers: { "Content-Type": "application/json" },
      });

      if (categoryResponse.ok) {
        toast.success("Catégorie créée avec succès !");
        setTimeout(() => navigate("/categories"), 5000);
      } else {
        throw new Error("Erreurs lors de la création de la catégorie");
      }
    } catch (error) {
      toast.error("La catégorie n'a pas pu être créée. Veuillez réessayer.");
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <h2 className="fr-h3">Créer une Catégorie</h2>
      <form
        onSubmit={handleSubmit}
        className="fr-grid-row fr-grid-row--gutters"
      >
        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="name">
            Nom de la catégorie
          </label>
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
          <label className="fr-label" htmlFor="description">
            Description
          </label>
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

        <div
          className="fr-col-12 fr-grid-row fr-mt-4w"
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <button
            type="button"
            className="fr-btn fr-btn--secondary"
            onClick={goBack}
          >
            Annuler
          </button>
          <button type="submit" className="fr-btn fr-btn--primary">
            Créer
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default CreateCategory;
