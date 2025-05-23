import { useEffect, useState } from "react";
import {
  getAllWords,
  addWord,
  deleteWord,
  updateWord,
} from "../services/captionsService";
import { getUsername, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./CaptionsPage.scss";

function CaptionsPage() {
  const [key, setKey] = useState("");
  const [property, setProperty] = useState("");
  const [words, setWords] = useState([]);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  // Fetchs all key/value pairs
  const loadWords = async () => {
    try {
      const data = await getAllWords();
      console.log("words:", data);
      setWords(data.words);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await addWord(key, property);
      setKey("");
      setProperty("");
      loadWords();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this word?")) return;
    try {
      await deleteWord(id);
      loadWords();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await updateWord(editing._id, editing.key, editing.property);
      setEditing(null);
      loadWords();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    loadWords();
  }, []);

  return (
    <div className="container mt-5 captions-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Captions</h2>
        <div>
          <span className="me-3">
            Logged in as: <strong>{getUsername()}</strong>
          </span>
          <button className="btn btn-outline-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <form className="mb-4" onSubmit={handleAdd}>
        <div className="row g-2">
          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              required
            />
          </div>
          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Property"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              required
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" type="submit">
              Add
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Key</th>
            <th>Property</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word._id}>
              {console.log(word, "word")}
              <td>{word.national}</td>
              <td>{word.foreign}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => setEditing({ ...word })}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(word._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editing && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          onClick={() => setEditing(null)}
        >
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Word</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditing(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control mb-2"
                  value={editing.key}
                  onChange={(e) =>
                    setEditing({ ...editing, key: e.target.value })
                  }
                />
                <input
                  className="form-control"
                  value={editing.property}
                  onChange={(e) =>
                    setEditing({ ...editing, property: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditing(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleEditSubmit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaptionsPage;
