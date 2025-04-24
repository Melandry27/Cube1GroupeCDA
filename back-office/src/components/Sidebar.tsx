import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role;

  const menuItems = [
    { path: "dashboard", label: "Tableau de bord" },
    { path: "ressources", label: "Ressources" },
    { path: "categories", label: "Catégories" },
    { path: "comments", label: "Commentaires" },
    { path: "users", label: "Utilisateurs" },
    { path: "roles", label: "Rôles", hideFor: ["Modérateur"] },
    { path: "statistics", label: "Statistiques avancées", hideFor: ["Modérateur"] },
  ];

  const visibleItems = menuItems.filter(
    (item) => !item.hideFor || !item.hideFor.includes(role)
  );

  return (
    <nav className="fr-sidemenu fr-col-2">
      <ul className="fr-sidemenu__list">
        {visibleItems.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `fr-sidemenu__link ${isActive ? "fr-sidemenu__link--active" : ""}`
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;