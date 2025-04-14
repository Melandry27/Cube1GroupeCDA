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
import StatsAvancees from "./pages/Statistics";
import CreateRessource from "./pages/CreateRessource";
import EditRessource from "./pages/EditRessource";
import CreateCategory from "./pages/CreateCategory";
import EditCategory from "./pages/EditCategory";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ressources" element={<Ressources/>} />
              <Route path="/ressources/create" element={<CreateRessource />} />
              <Route path="/ressources/edit/:id" element={<EditRessource />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/create" element={<CreateCategory />} />
              <Route path="/categories/edit/:id" element={<EditCategory />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/create" element={<CreateUser />} />
              <Route path="/users/edit/:id" element={<EditUser />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/statistics" element={<StatsAvancees />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </AuthProvider>
  );
};

export default App;