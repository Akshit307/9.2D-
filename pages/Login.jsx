import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMsg({ type: "success", text: "Login successful! Redirecting..." });
      setTimeout(() => navigate("/"), 600);
    } catch (err) {
      setMsg({ type: "error", text: "Invalid email or password." });
    }
  };

  return (
    <div className="page">
      <div className="auth-row">
        <div className="card">
          <Link to="/signup" className="smalltoplink">Sign up</Link>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Your email</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label className="label">Your password</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn" type="submit">Login</button>
            {msg.text && (
              <div className={msg.type === "error" ? "error" : "success"}>
                {msg.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
