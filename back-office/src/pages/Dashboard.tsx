import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  interface User {
    _id: string;
    name: string;
    createdAt: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  interface Comment {
    _id: string;
    content: string;
    userId: string;
  }
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [usersMap, setUsersMap] = useState<Record<string, User>>({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersRes, commentsRes, articlesRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/comments"),
          fetch("/api/ressources"),
        ]);

        if (!usersRes.ok || !commentsRes.ok || !articlesRes.ok) {
          throw new Error("Erreur lors de la récupération des données du dashboard");
        }
        const usersData = await usersRes.json();
        const commentsData = await commentsRes.json();
        const articlesData = await articlesRes.json();

        const usersByIdMap: { [key: string]: any } = {};
        usersData.forEach((user: User) => {
          usersByIdMap[user._id] = user;
        });
        console.log(usersByIdMap);
        setUsersMap(usersByIdMap);

        setUsers(usersData.slice(-3).reverse()); 
        setUsersCount(usersData.length);

        setComments(commentsData.slice(-3).reverse()); 
        setCommentsCount(commentsData.length);

        setArticlesCount(articlesData.length);
      } catch (error) {
        toast.error("Erreur de chargement du tableau de bord.");
        console.error(error);
      }
    };

    fetchDashboardData();
  }, []);

  const getUserName = (userId: string) => {
    if (!userId) return "Anonyme";
    return usersMap[userId]?.name || "Utilisateur inconnu";
  };

  return (
    <>
      <h2 className="fr-h3">Tableau de Bord</h2>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body fr-py-2w">
              <h3 className="fr-h5">Statistiques</h3>
              <ul>
                <li>Articles publiés : {articlesCount}</li>
                <li>Utilisateurs enregistrés : {usersCount}</li>
                <li>Commentaires publiés : {commentsCount}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body fr-py-2w">
              <h3 className="fr-h5">Derniers Utilisateurs</h3>
              <ul>
                {users.map((user) => (
                  <li key={user._id}>
                    {user.name} - Inscrit le {new Date(user.createdAt).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <div className="fr-card">
            <div className="fr-card__body fr-py-2w">
              <h3 className="fr-h5">Derniers Commentaires</h3>
              <ul>
                {comments.map((comment) => (
                  <li key={comment._id}>
                    "{comment.content}" - par {getUserName(comment.userId) || "Anonyme"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
