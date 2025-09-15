import React, { useState } from "react";
import { db, storage } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

// NEW: imports for codemirror + markdown
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import ReactMarkdown from "react-markdown";

function Post() {
  const [postType, setPostType] = useState("article");
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [text, setText] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  // NEW: state for code editor
  const [code, setCode] = useState("// write your code here");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `questions/${Date.now()}-${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "questions"), {
        type: postType,
        title,
        description: abstract,
        text,
        code, // NEW: save code to Firestore
        tag: tags,
        date: new Date().toISOString().split("T")[0],
        imageUrl,
      });

      alert("Post added successfully!");
      navigate("/find-questions");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    marginBottom: "20px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>New Post</h2>
      <form onSubmit={handleSubmit}>
        {/* Post Type */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="radio"
              value="question"
              checked={postType === "question"}
              onChange={(e) => setPostType(e.target.value)}
            />{" "}
            Question
          </label>
          <label style={{ marginLeft: "20px" }}>
            <input
              type="radio"
              value="article"
              checked={postType === "article"}
              onChange={(e) => setPostType(e.target.value)}
            />{" "}
            Article
          </label>
        </div>

        {/* Title */}
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Title
        </label>
        <input
          type="text"
          placeholder="Enter a descriptive title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />

        {/* Image Upload */}
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Add an image:
        </label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ marginBottom: "20px" }}
        />

        {/* Abstract (only for Article) */}
        {postType === "article" && (
          <>
            <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
              Abstract
            </label>
            <textarea
              placeholder="Enter a 1-paragraph abstract"
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
              required={postType === "article"}
              style={{ ...inputStyle, minHeight: "80px" }}
            />
          </>
        )}

        {/* Markdown Text */}
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          {postType === "article" ? "Article Text (Markdown supported)" : "Question Text (Markdown supported)"}
        </label>
        <textarea
          placeholder="Write your content in Markdown"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ ...inputStyle, minHeight: "120px" }}
        />

        {/* Code Editor */}
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Add Code Snippet
        </label>
        <CodeMirror
          value={code}
          height="200px"
          theme={oneDark}
          extensions={[javascript()]}
          onChange={(value) => setCode(value)}
        />

        {/* Tags */}
        <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold" }}>
          Tags
        </label>
        <input
          type="text"
          placeholder={
            postType === "article"
              ? "Please add up to 3 tags (e.g. Java)"
              : "Please add up to 3 tags (e.g. React)"
          }
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={inputStyle}
        />

        {/* Preview */}
        <h3 style={{ marginTop: "30px" }}>Live Preview</h3>
        <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "6px" }}>
          <ReactMarkdown>{text}</ReactMarkdown>
          <pre
            style={{
              background: "#1e1e1e",
              color: "#fff",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "15px",
            }}
          >
            {code}
          </pre>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: uploading ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: uploading ? "not-allowed" : "pointer",
          }}
        >
          {uploading ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
}

export default Post;
