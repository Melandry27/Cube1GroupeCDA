import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://34.224.12.85:3000";

interface Category {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
}

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/categories`);
        if (!response.ok)
          throw new Error("Erreur lors de la récupération des catégories");
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleCreate = () => navigate("create");

  const handleEdit = (id: string) => navigate(`edit/${id}`);

  const handleDelete = async (id: string) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")
    ) {
      try {
        const response = await fetch(`${API_BASE}/api/categories/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast.success("Catégorie supprimée avec succès !");
          setCategories((prev) => prev.filter((c) => c._id !== id));
        } else {
          throw new Error("Erreur lors de la suppression de la catégorie");
        }
      } catch (error) {
        toast.error(
          "Impossible de supprimer la catégorie. Veuillez réessayer."
        );
      }
    }
  };

  return (
    <>
      <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
        <h2 className="fr-h3 fr-mr-auto">Gestion des Catégories</h2>
        <button
          className="fr-btn fr-btn--primary fr-ml-auto"
          onClick={handleCreate}
        >
          Ajouter une Catégorie
        </button>
      </div>

      <div className="fr-table fr-table--full fr-mt-2w">
        <table className="fr-table">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Nom</th>
              <th style={{ width: "30%" }}>Description</th>
              <th style={{ width: "20%" }}>Date de création</th>
              <th style={{ width: "25%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>{new Date(category.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="fr-btns-group fr-btns-group--inline">
                      <button
                        className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w"
                        onClick={() => handleEdit(category._id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="fr-btn fr-btn--tertiary fr-btn--sm"
                        onClick={() => handleDelete(category._id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="fr-text--lg">
                  Aucune catégorie trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Categories;
