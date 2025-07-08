import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Category, Ressource } from "../utils/interface";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://34.224.12.85:3000";

const Ressources = () => {
  const navigate = useNavigate();

  const [ressources, setRessources] = useState<Ressource[]>([]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRessources = async () => {
      try {
        const ressourcesResponse = await fetch(`${API_BASE}/api/ressources`);
        if (!ressourcesResponse.ok)
          throw new Error("Erreur lors de la récupération des ressources");
        const ressourcesData = await ressourcesResponse.json();

        const categoriesResponse = await fetch(`${API_BASE}/api/categories`);
        if (!categoriesResponse.ok)
          throw new Error("Erreur lors de la récupération des catégories");
        const categoriesData = await categoriesResponse.json();

        setRessources(ressourcesData);
        setCategories(categoriesData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Impossible de récupérer les données. Veuillez réessayer.");
      }
    };
    fetchRessources();
  }, []);

  const resourceTypeLabels: { [key: string]: string } = {
    "In Progress": "En cours",
    Completed: "Terminé",
    "Not Started": "Non commencé",
  };

  const handleCreate = () => navigate("create");
  const handleEdit = (id: string) => () => navigate(`edit/${id}`);

  const handleDelete = async (id: string) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette ressource ?")
    ) {
      try {
        const response = await fetch(`${API_BASE}/api/ressources/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setRessources((prev) => prev.filter((r) => r._id !== id));
        } else {
          throw new Error("Erreur lors de la suppression de la ressource");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c._id === categoryId);
    return category ? category.name : "Catégorie inconnue";
  };

  const filteredRessources = ressources.filter(
    (ressource) =>
      ressource.title.toLowerCase().includes(search.toLowerCase()) ||
      ressource.createdBy?._id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
        <h2 className="fr-h3 fr-mr-auto">Gestion des Ressources</h2>
        <button
          className="fr-btn fr-btn--primary fr-ml-auto"
          onClick={handleCreate}
        >
          Ajouter une Ressource
        </button>
      </div>

      <div className="fr-input-group fr-mb-4w">
        <input
          type="text"
          className="fr-input"
          placeholder="Rechercher par titre ou auteur"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="fr-table fr-table--full fr-mt-2w">
        <table className="fr-table">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Titre</th>
              <th style={{ width: "15%" }}>Auteur</th>
              <th style={{ width: "15%" }}>Description</th>
              <th style={{ width: "15%" }}>Catégorie</th>
              <th style={{ width: "10%" }}>Vues</th>
              <th style={{ width: "10%" }}>Statut</th>
              <th style={{ width: "10%" }}>Date de publication</th>
              <th style={{ width: "15%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRessources.length > 0 ? (
              filteredRessources.map((ressource) => (
                <tr key={ressource._id}>
                  <td>{ressource.title}</td>
                  <td>{ressource.createdBy?.name || "Auteur inconnu"}</td>
                  <td>{ressource.content.slice(0, 60)}...</td>
                  <td>{getCategoryName(ressource.categoryId)}</td>
                  <td>{ressource.views || 0}</td>
                  <td>
                    {resourceTypeLabels[
                      ressource.status || ressource.type || ""
                    ] ||
                      ressource.status ||
                      ressource.type}
                  </td>
                  <td>
                    {ressource.createdAt
                      ? new Date(ressource.createdAt).toLocaleDateString()
                      : ""}
                  </td>
                  <td>
                    <div className="fr-btns-group fr-btns-group--inline">
                      <button
                        className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w"
                        onClick={handleEdit(ressource._id)}
                      >
                        Modifier
                      </button>
                      <button
                        className="fr-btn fr-btn--tertiary fr-btn--sm"
                        onClick={() => handleDelete(ressource._id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>Aucune ressource trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Ressources;
