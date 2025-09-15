import React, { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import ReactMarkdown from "react-markdown";

function FindQuestions() {
  const [questions, setQuestions] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  // Filters
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTag, setSearchTag] = useState("");
  const [searchDate, setSearchDate] = useState("");

  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const qList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(qList);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "questions", id));
      setQuestions(questions.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  // Apply filters
  const filteredQuestions = questions.filter((q) => {
    const matchesTitle = q.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesTag = searchTag ? q.tag.toLowerCase() === searchTag.toLowerCase() : true;
    const matchesDate = searchDate ? q.date === searchDate : true;
    return matchesTitle && matchesTag && matchesDate;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Find Questions Page</h1>

      {/* Filter Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />

        <input
          type="text"
          placeholder="Filter by tag..."
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />

        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={{ padding: "5px" }}
        />
      </div>

      {/* Question List */}
      {filteredQuestions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        filteredQuestions.map((q) => (
          <div
            key={q.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "15px",
              background: "#fafafa",
            }}
          >
            <h3>{q.title}</h3>
            <small>
              {q.tag} | {q.date}
            </small>

            <button
              onClick={() => toggleExpand(q.id)}
              style={{
                display: "block",
                marginTop: "10px",
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              {expandedId === q.id ? "Hide Details" : "View Details"}
            </button>

            {expandedId === q.id && (
              <div style={{ marginTop: "10px" }}>
                <p>
                  <strong>Abstract:</strong>{" "}
                  {q.description || "No description available"}
                </p>

                <h4>Content</h4>
                <ReactMarkdown>{q.text}</ReactMarkdown>

                {q.code && (
                  <div style={{ marginTop: "10px" }}>
                    <h4>Code Snippet</h4>
                    <pre
                      style={{
                        background: "#1e1e1e",
                        color: "#f8f8f2",
                        padding: "10px",
                        borderRadius: "5px",
                        overflowX: "auto",
                      }}
                    >
                      <code>{q.code}</code>
                    </pre>
                  </div>
                )}

                {q.imageUrl && (
                  <img
                    src={q.imageUrl}
                    alt="Question"
                    style={{
                      maxWidth: "300px",
                      marginTop: "10px",
                      display: "block",
                    }}
                  />
                )}

                {/* ✅ Delete button properly aligned */}
                <div style={{ marginTop: "15px", textAlign: "left" }}>
                  <button
                    onClick={() => handleDelete(q.id)}
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default FindQuestions;
