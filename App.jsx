import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Header from "./components/Header.jsx";
import FindQuestions from "./pages/FindQuestions";
import Post from "./pages/Post.jsx";
import Plans from "./pages/Plans.jsx";   // ✅ new import
import Payment from "./pages/Payment.jsx";


export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/post" element={<Post />} />
        <Route path="/find-questions" element={<FindQuestions />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plans" element={<Plans />} />   {/* ✅ new route */}
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}
