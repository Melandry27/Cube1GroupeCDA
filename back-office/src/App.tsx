import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, Navigate } from "react-router";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Categories from "./pages/Categories";
import Comments from "./pages/Comments";
import CreateCategory from "./pages/CreateCategory";
import CreateRessource from "./pages/CreateRessource";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import EditCategory from "./pages/EditCategory";
import EditRessource from "./pages/EditRessource";
import EditUser from "./pages/EditUser";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Ressources from "./pages/Ressources";
import Roles from "./pages/Roles";
import StatsAvancees from "./pages/Statistics";
import Users from "./pages/Users";

const queryClient = new QueryClient();

import "./App.css";

console.log("Backoffice is running....");

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ressources" element={<Ressources />} />
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
    </QueryClientProvider>
  );
};

export default App;
