import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <nav className="fr-sidemenu fr-col-2">
      <ul className="fr-sidemenu__list">
        {[
          { path: "dashboard", label: "Tableau de bord" },
          { path: "ressources", label: "Ressources" },
          { path: "categories", label: "Catégories" },
          { path: "comments", label: "Commentaires" },
          { path: "users", label: "Utilisateurs" },
          { path: "roles", label: "Rôles" },
          { path: "statistiques", label: "Statistiques avancées" },
        ].map(({ path, label }) => (
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
