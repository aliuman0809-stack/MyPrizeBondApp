import { useState } from "react";
import axios from "axios";

const API_URL = "https://myprizebondapp.onrender.com/api"; // Render ka URL

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", pin: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (isLoginView) {
        const res = await axios.post(`${API_URL}/auth/login`, {
          email: formData.email,
          pin: formData.pin,
        });
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        setIsLoggedIn(true);
      } else {
        await axios.post(`${API_URL}/auth/register`, formData);
        setMessage("Registration successful! Wait for admin approval.");
        setIsLoginView(true);
      }
    } catch (err) {
      setMessage(err.response?.data?.error || "Something went wrong");
    }
  };

  if (isLoggedIn) {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    return (
      <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
        <h1>Welcome, {user.name}!</h1>
        <h2>You are logged in.</h2>
        <button onClick={() => { sessionStorage.clear(); setIsLoggedIn(false); }} style={{ padding: "10px 20px", background: "red", color: "white", border: "none", borderRadius: "5px", marginTop: "20px" }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "350px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{isLoginView ? "Login" : "Register"}</h2>
        
        {message && <p style={{ color: "blue", textAlign: "center", fontSize: "14px" }}>{message}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {!isLoginView && (
            <input type="text" placeholder="Full Name" required
              style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          )}
          <input type="email" placeholder="Email" required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input type="password" placeholder="4-Digit PIN" maxLength="4" required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
          />
          <button type="submit" style={{ padding: "10px", background: "#4f46e5", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}>
            {isLoginView ? "Login" : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px", cursor: "pointer", color: "#4f46e5" }} onClick={() => setIsLoginView(!isLoginView)}>
          {isLoginView ? "Create an account" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}