import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://34.224.12.85:3000";

const EditCategory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/categories/${id}`);
        if (!response.ok)
          throw new Error("Erreur lors de la récupération de la catégorie");
        const data = await response.json();
        setCategory({
          name: data.name || "",
          description: data.description || "",
        });
      } catch (error) {
        toast.error("Impossible de charger la catégorie.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/api/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify(category),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Catégorie modifiée avec succès !");
        setTimeout(() => navigate("/categories"), 3000);
      } else {
        throw new Error("Erreur lors de la modification de la catégorie");
      }
    } catch (error) {
      toast.error("Impossible de modifier la catégorie. Veuillez réessayer.");
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <h2 className="fr-h3">Modifier une Catégorie</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : (
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
              Modifier
            </button>
          </div>
        </form>
      )}

      <ToastContainer />
    </>
  );
};

export default EditCategory;
