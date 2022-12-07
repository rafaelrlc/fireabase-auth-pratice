import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import { useContext, useSyncExternalStore } from "react";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { Navigate } from "react-router-dom";
import InvalidPage from "./pages/InvalidPage";

const App = () => {
  const { JWT } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute JWT={JWT}>
              <UserProfile></UserProfile>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<InvalidPage></InvalidPage>}></Route>
      </Routes>
    </Layout>
  );
};

export default App;
