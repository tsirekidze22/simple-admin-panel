import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/authService";
import "./LoginPage.scss";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //  Submits information that is based on if the user Logs in or Registers
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = isRegistering
        ? await register(username, password)
        : await login(username, password);

      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.username);
      navigate("/captions");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5 login-page">
      <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="mb-3 text-center">
          {isRegistering ? "Register" : "Login"}
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100" type="submit">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
