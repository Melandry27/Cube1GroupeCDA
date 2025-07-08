import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://34.224.12.85:3000";

interface User {
  createdAt: string;
}

interface Ressource {
  createdAt: string;
  category: string;
}

interface Comment {
  createdAt: string;
}

interface MonthlyStat {
  name: string;
  utilisateurs: number;
  articles: number;
  commentaires: number;
}
const StatsAvancees = () => {
  const [userStats, setUserStats] = useState<MonthlyStat[]>([]);
  const [commentStats, setCommentStats] = useState<MonthlyStat[]>([]);
  const [engagementStats, setEngagementStats] = useState<MonthlyStat[]>([]);

  const [kpis, setKpis] = useState({
    users: 0,
    ressources: 0,
    comments: 0,
    roles: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, rolesRes, commentsRes, ressourcesRes, categoriesRes] =
          await Promise.all([
            fetch(`${API_BASE}/api/users`),
            fetch(`${API_BASE}/api/roles`),
            fetch(`${API_BASE}/api/comments`),
            fetch(`${API_BASE}/api/ressources`),
            fetch(`${API_BASE}/api/categories`),
          ]);

        if (
          !usersRes.ok ||
          !rolesRes.ok ||
          !commentsRes.ok ||
          !ressourcesRes.ok ||
          !categoriesRes.ok
        ) {
          throw new Error("Une des requêtes a échoué");
        }

        const users: User[] = await usersRes.json();
        const roles = await rolesRes.json();
        const comments: Comment[] = await commentsRes.json();
        const ressources: Ressource[] = await ressourcesRes.json();
        const categories = await categoriesRes.json();

        setKpis({
          users: users.length,
          ressources: ressources.length,
          comments: comments.length,
          roles: roles.length,
          categories: categories.length,
        });

        const monthlyStats: Record<string, MonthlyStat> = {};

        const getMonthKey = (dateStr: string) => {
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return null;
          const month = date.toLocaleString("fr-FR", { month: "long" });
          return `${month}-${date.getFullYear()}`;
        };

        users.forEach((user: User) => {
          const key = getMonthKey(user.createdAt);
          if (!key) return;
          if (!monthlyStats[key])
            monthlyStats[key] = {
              name: key,
              utilisateurs: 0,
              articles: 0,
              commentaires: 0,
            };
          monthlyStats[key].utilisateurs++;
        });

        ressources.forEach((ressource: Ressource) => {
          const key = getMonthKey(ressource.createdAt);
          if (!key) return;
          if (!monthlyStats[key])
            monthlyStats[key] = {
              name: key,
              utilisateurs: 0,
              articles: 0,
              commentaires: 0,
            };
          monthlyStats[key].articles++;
        });

        comments.forEach((comment: Comment) => {
          const key = getMonthKey(comment.createdAt);
          if (!key) return;
          if (!monthlyStats[key])
            monthlyStats[key] = {
              name: key,
              utilisateurs: 0,
              articles: 0,
              commentaires: 0,
            };
          monthlyStats[key].commentaires++;
        });

        const monthMap: Record<string, string> = {
          janvier: "January",
          février: "February",
          mars: "March",
          avril: "April",
          mai: "May",
          juin: "June",
          juillet: "July",
          août: "August",
          septembre: "September",
          octobre: "October",
          novembre: "November",
          décembre: "December",
        };

        const sortedMonthly = Object.values(monthlyStats).sort((a, b) => {
          const [monthA, yearA] = a.name.split("-");
          const [monthB, yearB] = b.name.split("-");
          const dateA = new Date(
            `${monthMap[monthA.toLowerCase()]} 1, ${yearA}`
          );
          const dateB = new Date(
            `${monthMap[monthB.toLowerCase()]} 1, ${yearB}`
          );
          return dateA.getTime() - dateB.getTime();
        });

        setUserStats(sortedMonthly);
        setCommentStats(sortedMonthly);
        setEngagementStats(sortedMonthly);

        const catCount: Record<string, number> = {};
        ressources.forEach((r: Ressource) => {
          catCount[r.category] = (catCount[r.category] || 0) + 1;
        });
      } catch (error) {
        toast.error("Erreur lors du chargement des statistiques");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
        <h2 className="fr-h3 fr-mr-auto">Statistiques Avancées</h2>
      </div>

      <div className="fr-grid-row fr-grid-row--gutters fr-mb-4w">
        {[
          { label: "Utilisateurs", value: kpis.users },
          { label: "Ressources", value: kpis.ressources },
          { label: "Commentaires", value: kpis.comments },
          { label: "Rôles", value: kpis.roles },
          { label: "Catégories", value: kpis.categories },
        ].map((kpi, index) => (
          <div key={index} className="fr-col-6 fr-col-md-2">
            <div className="fr-card fr-p-2w fr-card--no-border">
              <div className="fr-text--sm">{kpi.label}</div>
              <div className="fr-text--xl fr-text--bold">{kpi.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <h3 className="fr-h5">Évolution des utilisateurs et articles</h3>
          <LineChart width={500} height={300} data={userStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="utilisateurs" stroke="#8884d8" />
            <Line type="monotone" dataKey="articles" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <h3 className="fr-h5">Nombre de commentaires par mois</h3>
          <BarChart width={500} height={300} data={commentStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="commentaires" fill="#ffc658" />
          </BarChart>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <h3 className="fr-h5">Évolution du taux d'engagement</h3>
          <LineChart width={500} height={300} data={engagementStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="commentaires" stroke="#FF5733" />
          </LineChart>
        </div>
      </div>
    </>
  );
};

export default StatsAvancees;
