import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://34.224.12.85:3000";
interface Role {
  _id: string;
  name: string;
}

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    roleId: "",
    adress: "",
    password: "",
  });

  const [originalPassword, setOriginalPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/roles`);
        if (response.ok) {
          const data: Role[] = await response.json();
          setRoles(data);
        } else {
          throw new Error("Erreur lors de la récupération des rôles");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Impossible de récupérer les rôles. Veuillez réessayer.");
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser({
            name: data.name,
            email: data.email,
            phone: data.phone,
            roleId: data.roleId,
            adress: data.adress,
            password: "",
          });
          setOriginalPassword(data.password);
          setValidateEmail(data.validateEmail || false);
        } else {
          throw new Error("Erreur lors de la récupération de l'utilisateur");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error(
          "Impossible de récupérer les informations de l'utilisateur."
        );
      }
    };

    fetchRoles();
    fetchUser();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, [name]: value };
      return updatedUser;
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setValidatePassword(value === user.password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const passwordToSend = user.password || originalPassword;

    if (user.password && !validatePassword) {
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...user,
          password: passwordToSend,
          validateEmail,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        toast.success("Utilisateur modifié avec succès !");
        setTimeout(() => navigate("/users"), 5000);
      } else {
        throw new Error("Erreur lors de la modification de l'utilisateur");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(
        "Erreur lors de la modification de l'utilisateur. Veuillez réessayer."
      );
    }
  };

  const goBack = () => {
    window.history.back();
  };

  const filteredRoles = roles.filter((role) => {
    const currentRole = currentUser?.role;
    if (currentRole === "Super Admin") return true;
    if (currentRole === "Administrateur")
      return !["Administrateur", "Super Admin"].includes(role.name);
    if (currentRole === "Modérateur")
      return !["Administrateur", "Super Admin", "Modérateur"].includes(
        role.name
      );
    return false;
  });

  return (
    <>
      <h2 className="fr-h3">Modifier un Utilisateur</h2>
      <form
        onSubmit={handleSubmit}
        className="fr-grid-row fr-grid-row--gutters"
      >
        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="name">
            Nom d'utilisateur
          </label>
          <input
            className="fr-input"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="email">
            Email
          </label>
          <input
            className="fr-input"
            id="email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="validateEmail">
            Validation Email
          </label>
          <select
            className="fr-select"
            id="validateEmail"
            name="validateEmail"
            value={validateEmail ? "true" : "false"}
            onChange={(e) => setValidateEmail(e.target.value === "true")}
          >
            <option value="false">Non</option>
            <option value="true">Oui</option>
          </select>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="phone">
            Téléphone
          </label>
          <input
            className="fr-input"
            id="phone"
            name="phone"
            type="tel"
            value={user.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="adress">
            Adresse
          </label>
          <input
            className="fr-input"
            id="adress"
            name="adress"
            value={user.adress}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="roleId">
            Rôle
          </label>
          <select
            className="fr-select"
            id="roleId"
            name="roleId"
            value={user.roleId}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un rôle</option>
            {filteredRoles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="fr-input"
            id="password"
            name="password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>

        <div className="fr-col-12 fr-col-md-6">
          <label className="fr-label" htmlFor="confirmPassword">
            Confirmer le mot de passe
          </label>
          <input
            className="fr-input"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          {!validatePassword && confirmPassword && (
            <p style={{ color: "red" }}>
              Les mots de passe ne correspondent pas.
            </p>
          )}
        </div>

        <div
          className="fr-col-12 fr-grid-row fr-mt-4w"
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <button
            type="button"
            className="fr-btn fr-btn--secondary"
            onClick={goBack}
          >
            Annuler
          </button>
          <button type="submit" className="fr-btn fr-btn--primary">
            Modifier
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default EditUser;
