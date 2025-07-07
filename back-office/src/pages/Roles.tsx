import { useEffect, useState } from "react";

interface Role {
  _id: string;
  name: string;
}

const Roles = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("/api/roles");
        if (!response.ok) throw new Error("Erreur lors de la récupération des rôles");
        const data: Role[] = await response.json();
        setRoles(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoles();
  }, []);
  return (
    <>
      <div className="fr-grid-row fr-grid-row--middle fr-grid-row--between fr-mb-4w">
        <h2 className="fr-h3 fr-mr-auto">Liste des Rôles</h2>
      </div>

      <div className="fr-table fr-table--full fr-mt-2w">
        <table className="fr-table">
          <thead>
          <tr>
            <th style={{ width: '1%' }}>Nom du Rôle</th>
          </tr>
          </thead>
          <tbody>
          {roles.map((role: Role) => (
            <tr key={role._id}>
              <td>{role.name}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Roles;