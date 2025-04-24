import { Outlet, useNavigate } from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="fr-container-fluid">
      <Header handleLogout={handleLogout} />
      <div className="fr-container fr-grid-row fr-py-4w">
        <Sidebar />
        <main className="fr-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
