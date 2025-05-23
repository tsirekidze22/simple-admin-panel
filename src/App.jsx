import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CaptionsPage from "./pages/CaptionsPage";
import CountriesPage from "./pages/CountriesPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";

function App() {
  // This will check if the use is authenticated or not
  const isLoggedIn = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/captions"
          element={
            isLoggedIn ? (
              <Layout>
                <CaptionsPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/countries"
          element={
            isLoggedIn ? (
              <Layout>
                <CountriesPage />
              </Layout>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/captions" />} />
      </Routes>
    </Router>
  );
}

export default App;
