import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Signup() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (pw !== pw2) {
      setMsg({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (pw.length < 6) {
      setMsg({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim().toLowerCase(),
        pw
      );

      await updateProfile(cred.user, { displayName: `${first} ${last}` });

      await setDoc(doc(db, "users", cred.user.uid), {
        firstName: first,
        lastName: last,
        email: email.trim().toLowerCase(),
        createdAt: serverTimestamp(),
      });

      setMsg({ type: "success", text: "Account created! Redirecting..." });
      setTimeout(() => navigate("/login"), 900);
    } catch (err) {
      console.error("Signup failed:", err);
      const friendly = ({
        "auth/email-already-in-use": "Email already in use.",
        "auth/invalid-email": "Invalid email address.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/network-request-failed": "Network error. Disable VPN/adblock.",
        "auth/operation-not-allowed": "Enable Email/Password in Firebase → Authentication → Sign-in method.",
      })[err.code] || `Could not create account (${err.code || "unknown"}).`;
      setMsg({ type: "error", text: friendly });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="auth-row">
        <div className="card">
          <h2>Create a DEV@Deakin Account</h2>
          <form onSubmit={handleCreate}>
            <div className="field">
              <label className="label">Name*</label>
              <input className="input" value={first} onChange={(e)=>setFirst(e.target.value)} required />
            </div>
            <div className="field">
              <label className="label">Last name*</label>
              <input className="input" value={last} onChange={(e)=>setLast(e.target.value)} required />
            </div>
            <div className="field">
              <label className="label">Email*</label>
              <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label className="label">Password*</label>
              <input className="input" type="password" value={pw} onChange={(e)=>setPw(e.target.value)} required />
            </div>
            <div className="field">
              <label className="label">Confirm password*</label>
              <input className="input" type="password" value={pw2} onChange={(e)=>setPw2(e.target.value)} required />
            </div>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
            {msg.text && (
              <div className={msg.type === "error" ? "error" : "success"}>{msg.text}</div>
            )}
          </form>
          <p className="muted" style={{ marginTop: 12 }}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
