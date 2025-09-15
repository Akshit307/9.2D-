import React from "react";
import { useNavigate } from "react-router-dom";

export default function Plans() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Choose Your Plan</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          marginTop: "40px",
        }}
      >
        {/* Free Plan */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            width: "250px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Free Plan</h2>
          <p style={{ fontSize: "14px", color: "#555" }}>
            Access to basic features.
          </p>
          <h3>$0 / month</h3>
          <button
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#ddd",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => alert("You are already on the Free Plan!")}
          >
            Select Free
          </button>
        </div>

        {/* Premium Plan */}
        <div
          style={{
            border: "2px solid #0070f3",
            borderRadius: "10px",
            padding: "20px",
            width: "250px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h2>Premium Plan</h2>
          <p style={{ fontSize: "14px", color: "#555" }}>
            Unlock advanced features and support.
          </p>
          <h3>$9.99 / month</h3>
          <button
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/payment")}
          >
            Go Premium
          </button>
        </div>
      </div>
    </div>
  );
}
