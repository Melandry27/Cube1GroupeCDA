import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Home from "./pages/Home"; 
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Ressources from "./pages/Ressources";
import Categories from "./pages/Categories";
import Comments from "./pages/Comments";
import Users from "./pages/Users";
import Roles from "./pages/Roles";

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ressources" element={<Ressources/>} />
              <Route path="/ressources/:id" element={<div>Ressource</div>} />
              <Route path="/ressources/create" element={<div>Créer une ressource</div>} />
              <Route path="/ressources/edit/:id" element={<div>Modifier une ressource</div>} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<div>Utilisateur</div>} />
              <Route path="/users/create" element={<div>Créer un utilisateur</div>} />
              <Route path="/users/edit/:id" element={<div>Modifier un utilisateur</div>} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/statistics" element={<div>Statistiques avancées</div>} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </AuthProvider>
  );
};

export default App;