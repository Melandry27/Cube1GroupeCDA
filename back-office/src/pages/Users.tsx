import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");
  const { user: currentUser } = useAuth();
  const currentRole = currentUser?.role;

  useEffect(() => {
    const fetchUsersAndRoles = async () => {
      try {
        const usersResponse = await fetch("/api/users");
        if (!usersResponse.ok) throw new Error();
        const usersData = await usersResponse.json();

        const rolesResponse = await fetch("/api/roles");
        if (!rolesResponse.ok) throw new Error();
        const rolesData = await rolesResponse.json();

        setUsers(usersData);
        setRoles(rolesData);
      } catch (error) {
        toast.error("Impossible de récupérer les données. Veuillez réessayer.");
      }
    };

    fetchUsersAndRoles();
  }, []);

  const handleCreate = () => navigate("create");
  const handleEdit = (id: string) => navigate(`edit/${id}`);

  const handleDelete = async (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
        if (response.ok) {
          toast.success("Utilisateur supprimé avec succès !");
          setUsers((prev) => prev.filter((u) => u._id !== id));
        } else {
          throw new Error();
        }
      } catch {
        toast.error("Impossible de supprimer l'utilisateur. Veuillez réessayer.");
      }
    }
  };

  const getRoleName = (roleId: string) => {
    const role = roles.find((r) => r._id === roleId);
    return role ? role.name : "Rôle inconnu";
  };

  const filteredUsers = users.filter((user) => {
    const userRoleName = getRoleName(user.roleId);
  
    if (currentRole === "Modérateur" && ["Modérateur", "Administrateur", "Super Admin"].includes(userRoleName)) {
      return false;
    }
  
    if (currentRole === "Administrateur" && ["Administrateur", "Super Admin"].includes(userRoleName)) {
      return false;
    }
  
    return (
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const canManage = (targetRoleName: string) => {
    if (!currentRole) return false;

    if (currentRole === "Super Admin") return true;
    if ((currentRole === "Modérateur" && !["Administrateur", "Super Admin"].includes(targetRoleName)) || (currentRole === "Administrateur" && !["Administrateur", "Super Admin"].includes(targetRoleName))) return true;

    return false;
  };

  return (
    <>
      <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
        <h2 className="fr-h3 fr-mr-auto">Gestion des Utilisateurs</h2>
        <button className="fr-btn fr-btn--primary fr-ml-auto" onClick={handleCreate}>
          Ajouter un Utilisateur
        </button>
      </div>

      <div className="fr-input-group fr-mb-4w">
        <label className="fr-label" htmlFor="search">
          Rechercher un utilisateur
        </label>
        <input
          className="fr-input"
          placeholder="Nom ou email"
          type="search"
          id="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="fr-table fr-table--full fr-mt-2w">
        <table className="fr-table">
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Nom</th>
              <th style={{ width: "15%" }}>Email</th>
              <th style={{ width: "15%" }}>Rôle</th>
              <th style={{ width: "15%" }}>Date d'inscription</th>
              <th style={{ width: "25%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{getRoleName(user.roleId)}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="fr-btns-group fr-btns-group--inline">
                      {canManage(getRoleName(user.roleId)) && (
                        <>
                          <button
                            className="fr-btn fr-btn--secondary fr-btn--sm fr-mr-2w"
                            onClick={() => handleEdit(user._id)}
                          >
                            Modifier
                          </button>
                          <button
                            className="fr-btn fr-btn--tertiary fr-btn--sm"
                            onClick={() => handleDelete(user._id)}
                          >
                            Supprimer
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;
