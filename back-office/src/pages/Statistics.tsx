import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import { toast } from "react-toastify";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA66CC'];

const StatsAvancees = () => {
  const [userStats, setUserStats] = useState([]);
  const [commentStats, setCommentStats] = useState([]);
  const [roleStats, setRoleStats] = useState([]);
  const [resourceStats, setResourceStats] = useState([]);
  const [engagementStats, setEngagementStats] = useState([]);

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
        const [usersRes, rolesRes, commentsRes, ressourcesRes, categoriesRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/roles"),
          fetch("/api/comments"),
          fetch("/api/ressources"),
          fetch("/api/categories"),
        ]);

        if (
          !usersRes.ok || !rolesRes.ok || !commentsRes.ok ||
          !ressourcesRes.ok || !categoriesRes.ok
        ) {
          throw new Error("Une des requêtes a échoué");
        }

        const users = await usersRes.json();
        const roles = await rolesRes.json();
        const comments = await commentsRes.json();
        const ressources = await ressourcesRes.json();
        const categories = await categoriesRes.json();

        setKpis({
          users: users.length,
          ressources: ressources.length,
          comments: comments.length,
          roles: roles.length,
          categories: categories.length,
        });

        const roleCount = roles.map(role => ({
          name: role.name,
          value: users.filter(user => user.role === role._id).length,
        }));

        const monthlyStats: Record<string, any> = {};

        [...users, ...ressources, ...comments].forEach((item) => {
          const date = new Date(item.createdAt);
          if (isNaN(date.getTime())) return;
        
          const month = date.toLocaleString("fr-FR", { month: "long" });
          const key = `${month}-${date.getFullYear()}`;
        
          if (!monthlyStats[key]) {
            monthlyStats[key] = { name: key, utilisateurs: 0, articles: 0, commentaires: 0 };
          }
        
          if ("email" in item) monthlyStats[key].utilisateurs++;
          else if ("content" in item && item.ressource) monthlyStats[key].commentaires++;
          else monthlyStats[key].articles++;
        });

        const monthMap = {
          "janvier": "January",
          "février": "February",
          "mars": "March",
          "avril": "April",
          "mai": "May",
          "juin": "June",
          "juillet": "July",
          "août": "August",
          "septembre": "September",
          "octobre": "October",
          "novembre": "November",
          "décembre": "December",
        };
        
        const sortedMonthly = Object.values(monthlyStats).sort((a: any, b: any) => {
          const [monthA, yearA] = a.name.split("-");
          const [monthB, yearB] = b.name.split("-");
          const dateA = new Date(`${monthMap[monthA.toLowerCase()]} 1, ${yearA}`);
          const dateB = new Date(`${monthMap[monthB.toLowerCase()]} 1, ${yearB}`);
          return dateA.getTime() - dateB.getTime();
        });

        setUserStats(sortedMonthly);
        setCommentStats(sortedMonthly);
        setEngagementStats(sortedMonthly);
        setRoleStats(roleCount);

        const catCount = {};
        ressources.forEach((r) => {
          catCount[r.category] = (catCount[r.category] || 0) + 1;
        });
        setResourceStats(Object.entries(catCount).map(([cat, val]) => ({ name: cat, value: val })));

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

      {/* ✅ Bloc KPI */}
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

      {/* 📊 Graphiques */}
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
          <h3 className="fr-h5">Répartition des rôles</h3>
          <PieChart width={400} height={300}>
            <Pie data={roleStats} cx={200} cy={150} outerRadius={80} fill="#8884d8" dataKey="value" label>
              {roleStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
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
