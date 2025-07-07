import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const CreateRessource = () => {
  const navigate = useNavigate();

  const [ressource, setRessource] = useState({
    title: "",
    createdBy: "",
    content: "",
    categoryId: "",
    type: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [resourceTypes, setResourceTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const token = (user as { token?: string })?.token;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des catégories");
        const categories = await response.json();
        setCategories(categories);
      } catch (error) {
        toast.error("Erreur lors du chargement des catégories.");
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des utilisateurs");
        const users = await response.json();
        setUsers(users);
      } catch (error) {
        toast.error("Erreur lors du chargement des utilisateurs.");
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

    Promise.all([
      fetchCategories(),
      fetchUsers(),
      fetchResourceTypes(),
    ]).finally(() => setLoading(false));
  }, []);

  const resourceTypeLabels: { [key: string]: string } = {
    "In Progress": "En cours",
    Completed: "Terminé",
    "Not Started": "Non commencé",
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setRessource({ ...ressource, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setRessource((prev) => ({
        ...prev,
        image: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/ressources`, {
        method: "POST",
        body: JSON.stringify(ressource),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
        <form
          onSubmit={handleSubmit}
          className="fr-grid-row fr-grid-row--gutters"
        >
          <div className="fr-col-12 fr-col-md-6">
            <label className="fr-label" htmlFor="title">
              Titre
            </label>
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
            <label className="fr-label" htmlFor="createdBy">
              Auteur
            </label>
            <select
              className="fr-select"
              id="createdBy"
              name="createdBy"
              value={ressource.createdBy}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionnez un utilisateur</option>
              {users.map((user: any) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          <div className="fr-col-12">
            <label className="fr-label" htmlFor="content">
              Contenu
            </label>
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
            <label className="fr-label" htmlFor="categoryId">
              Catégorie
            </label>
            <select
              className="fr-select"
              id="categoryId"
              name="categoryId"
              value={ressource.categoryId}
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
            <label className="fr-label" htmlFor="type">
              Type
            </label>
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

          <div className="fr-col-12 fr-col-md-6">
            <label className="fr-label" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              className="fr-input"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {ressource.image && (
              <div className="fr-mt-2w">
                <img
                  src={ressource.image}
                  alt="Aperçu"
                  style={{
                    maxHeight: "150px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </div>
            )}
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
      )}

      <ToastContainer />
    </>
  );
};

export default CreateRessource;
