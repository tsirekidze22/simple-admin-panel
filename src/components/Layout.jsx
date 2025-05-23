import { useNavigate, Link } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
        <span className="navbar-brand mx-auto">Admin Panel</span>
        <div className="mt-4 mt-md-0 mx-auto ms-md-auto d-flex align-items-center gap-3">
          <Link to="/captions" className="btn btn-outline-primary btn-sm">
            Captions
          </Link>
          <Link to="/countries" className="btn btn-outline-primary btn-sm">
            Countries
          </Link>
          {user && <span className="me-2 fw-bold">{user.name}</span>}
          <button className="btn btn-primary btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="container py-4">{children}</div>
    </div>
  );
}

export default Layout;
