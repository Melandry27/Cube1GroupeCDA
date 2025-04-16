import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditRessource = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ressource, setRessource] = useState({
    title: "",
    createdBy: "",
    content: "",
    category: "",
    type: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resourceTypes, setResourceTypes] = useState([]);

  useEffect(() => {
    const fetchRessource = async () => {
      try {
        const ressourceResponse = await fetch(`/api/ressources/${id}`);
        if (!ressourceResponse.ok) throw new Error("Erreur lors de la récupération de la ressource");
        const ressourceData = await ressourceResponse.json();

        setRessource({
          title: ressourceData.title || "",
          createdBy: ressourceData.createdBy || "",
          content: ressourceData.content || "",
          category: ressourceData.category || "",
          type: ressourceData.type || "",
        });
      } catch (error) {
        toast.error("Impossible de charger la ressource.");
      }
    };

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
        toast.error("Failed to fetch resource types");
      }
    };
    
    fetchResourceTypes();

    if (id) {
      Promise.all([fetchRessource(), fetchCategories()]).finally(() => setLoading(false));
    }
  }, [id]);

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
      const response = await fetch(`/api/ressources/${id}`, {
        method: "PUT",
        body: JSON.stringify(ressource),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Ressource modifiée avec succès !");
        setTimeout(() => navigate("/ressources"), 3000);
      } else {
        throw new Error("Erreur lors de la modification de la ressource");
      }
    } catch (error) {
      toast.error("Impossible de modifier la ressource. Veuillez réessayer.");
    }
  };

  const goBack = () => window.history.back();

  return (
    <>
      <h2 className="fr-h3">Modifier une Ressource</h2>

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

          <div className="fr-col-12 fr-grid-row fr-mt-4w" style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            <button type="button" className="fr-btn fr-btn--secondary" onClick={goBack}>
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

export default EditRessource;
