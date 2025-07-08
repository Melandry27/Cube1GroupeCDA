import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Ressource } from "../utils/interface";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://34.224.12.85:3000";

const EditRessource = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ressource, setRessource] = useState<Ressource>({
    _id: "",
    title: "",
    createdBy: {
      _id: "",
      name: "",
      email: "",
    },
    content: "",
    categoryId: "",
    type: "",
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [resourceTypes, setResourceTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRessource = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/ressources/${id}`);
        if (!res.ok)
          throw new Error("Erreur lors de la récupération de la ressource");
        const data = await res.json();
        setRessource(data);
      } catch {
        toast.error("Impossible de charger la ressource.");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/categories`);
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des catégories");
        const data = await res.json();
        setCategories(data);
      } catch {
        toast.error("Erreur lors du chargement des catégories.");
      }
    };

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/users`);
        if (!res.ok)
          throw new Error("Erreur lors de la récupération des utilisateurs");
        const data = await res.json();
        setUsers(data);
      } catch {
        toast.error("Erreur lors du chargement des utilisateurs.");
      }
    };

    const fetchTypes = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/ressources/types`);
        if (!res.ok) throw new Error();
        const types = await res.json();
        setResourceTypes(types);
      } catch {
        toast.error("Échec du chargement des types de ressources.");
      }
    };

    if (id) {
      Promise.all([
        fetchRessource(),
        fetchCategories(),
        fetchUsers(),
        fetchTypes(),
      ]).finally(() => setLoading(false));
    }
  }, [id]);

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
    const { name, value } = e.target;

    if (name === "createdBy") {
      setRessource((prev) => ({
        ...prev,
        createdBy: {
          ...(prev.createdBy ?? { _id: "", name: "", email: "" }),
          _id: value,
        },
      }));
    } else {
      setRessource((prev) => ({ ...prev, [name]: value }));
    }
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
      const body = {
        ...ressource,
        createdBy: ressource.createdBy?.["_id"] ?? "",
      };

      const response = await fetch(`${API_BASE}/api/ressources/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Ressource modifiée avec succès !");
        setTimeout(() => navigate("/ressources"), 3000);
      } else {
        throw new Error();
      }
    } catch {
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
              value={ressource.createdBy?.["_id"] ?? ""}
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
              id="image"
              accept="image/*"
              className="fr-input"
              onChange={handleImageChange}
            />
            {ressource.image && (
              <div className="fr-mt-2w">
                <img
                  src={ressource.image}
                  alt="Aperçu de l'image"
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
