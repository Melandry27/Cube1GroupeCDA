import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateRessource = () => {
  const navigate = useNavigate();

  const [ressource, setRessource] = useState({
    title: "",
    createdBy: "",
    content: "",
    category: "",
    type: "",
  });

  const [categories, setCategories] = useState([]);
  const [resourceTypes, setResourceTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Erreur lors de la récupération des catégories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        toast.error("Erreur lors du chargement des catégories.");
      }
    };

    const fetchResourceTypes = async () => {
      try {
        const response = await fetch("/api/ressources/types");
        if (response.ok) {
          const types = await response.json();
          setResourceTypes(types);
        }
      } catch (error) {
        toast.error("Échec du chargement des types de ressources");
      }
    };

    Promise.all([fetchCategories(), fetchResourceTypes()]).finally(() => setLoading(false));
  }, []);

  const resourceTypeLabels: { [key: string]: string } = {
    "In Progress": "En cours",
    "Completed": "Terminé",
    "Not Started": "Non commencé",
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setRessource({ ...ressource, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/ressources`, {
        method: "POST",
        body: JSON.stringify(ressource),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Ressource créée avec succès !");
        setTimeout(() => navigate("/ressources"), 3000);
      } else {
        throw new Error("Erreur lors de la création de la ressource");
      }
    } catch (error) {
      toast.error("La ressource n'a pas pu être créée. Veuillez réessayer.");
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <>
      <h2 className="fr-h3">Créer une Ressource</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <form onSubmit={handleSubmit} className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-6">
            <label className="fr-label" htmlFor="title">Titre</label>
            <input
              className="fr-input"
              id="title"
              name="title"
              value={ressource.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fr-col-12 fr-col-md-6">
            <label className="fr-label" htmlFor="createdBy">Auteur</label>
            <input
              className="fr-input"
              id="createdBy"
              name="createdBy"
              value={ressource.createdBy}
              onChange={handleChange}
              required
            />
          </div>

          <div className="fr-col-12">
            <label className="fr-label" htmlFor="content">Contenu</label>
            <textarea
              className="fr-input"
              id="content"
              name="content"
              value={ressource.content}
              onChange={handleChange}
              required
              style={{ resize: "vertical" }}
            />
          </div>

          <div className="fr-col-12 fr-col-md-6">
            <label className="fr-label" htmlFor="category">Catégorie</label>
            <select
              className="fr-select"
              id="category"
              name="category"
              value={ressource.category}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories.map((cat: any) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="fr-col-12 fr-col-md-6">
            <label className="fr-label" htmlFor="type">Type</label>
            <select
              className="fr-select"
              id="type"
              name="type"
              value={ressource.type}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez un type</option>
              {resourceTypes.map((type) => (
                <option key={type} value={type}>
                  {resourceTypeLabels[type] || type}
                </option>
              ))}
            </select>
          </div>

          <div
            className="fr-col-12 fr-grid-row fr-mt-4w"
            style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
          >
            <button type="button" className="fr-btn fr-btn--secondary" onClick={goBack}>
              Annuler
            </button>
            <button type="submit" className="fr-btn fr-btn--primary">
              Créer
            </button>
          </div>
        </form>
      )}

      <ToastContainer />
    </>
  );
};

export default CreateRessource;
