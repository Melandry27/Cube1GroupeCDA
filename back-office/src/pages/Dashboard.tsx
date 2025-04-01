import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="fr-container-fluid">
      <Header handleLogout={handleLogout} />
      <div className="fr-grid-row">
        <Sidebar />
        <main className="fr-col fr-py-4w">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
