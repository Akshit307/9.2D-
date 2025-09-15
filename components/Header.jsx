import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header() {
  const [user, setUser] = useState(null);
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand">DEV@Deakin</Link>

        <input
          className="search"
          type="text"
          placeholder="Search..."
          aria-label="Search"
        />

        <nav className="nav">
          <Link to="/post" className="nav-link">Post</Link>
          <Link to="/find-questions" className="nav-link">Find Questions</Link>
          <Link to="/plans" className="nav-link">Plans</Link> {/* ✅ new link */}
          {user ? (
            <button className="nav-link btnlink" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`nav-link ${loc.pathname === "/login" ? "active" : ""}`}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

