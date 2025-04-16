import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [ressources, setRessources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [commentsRes, usersRes, ressourcesRes] = await Promise.all([
          fetch("/api/comments"),
          fetch("/api/users"),
          fetch("/api/ressources"),
        ]);

        if (!commentsRes.ok || !usersRes.ok || !ressourcesRes.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        const commentsData = await commentsRes.json();
        const usersData = await usersRes.json();
        const ressourcesData = await ressourcesRes.json();

        setComments(commentsData);
        setUsers(usersData);
        setRessources(ressourcesData);
      } catch (error) {
        toast.error("Impossible de charger les commentaires.");
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getUserName = (userId: string) => {
    const user = users.find((u) => u._id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Utilisateur inconnu";
  };

  const getRessourceTitle = (ressourceId: string) => {
    const ressource = ressources.find((r) => r._id === ressourceId);
    return ressource ? ressource.title : "Article inconnu";
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
      try {
        const response = await fetch(`/api/comments/${id}`, { method: "DELETE" });
        if (response.ok) {
          setComments((prev) => prev.filter((c) => c._id !== id));
          toast.success("Commentaire supprimé avec succès.");
        } else {
          throw new Error("Erreur lors de la suppression");
        }
      } catch (error) {
        toast.error("Impossible de supprimer le commentaire.");
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
        <h2 className="fr-h3 fr-mr-auto">Gestion des Commentaires</h2>
      </div>

      <div className="fr-table fr-table--full fr-mt-2w">
        <table className="fr-table">
          <thead>
            <tr>
              <th style={{ width: '20%' }}>Auteur</th>
              <th style={{ width: '40%' }}>Commentaire</th>
              <th style={{ width: '20%' }}>Article associé</th>
              <th style={{ width: '20%' }}>Date</th>
              <th style={{ width: '20%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <tr key={comment._id}>
                  <td>{getUserName(comment.user)}</td>
                  <td>{comment.content}</td>
                  <td>{getRessourceTitle(comment.ressource)}</td>
                  <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="fr-btns-group fr-btns-group--inline">
                      {/* <button className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w">Voir</button> */}
                      <button
                        className="fr-btn fr-btn--tertiary fr-btn--sm"
                        onClick={() => handleDelete(comment._id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Aucun commentaire disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Comments;