import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "https://myprizebondapp.onrender.com/api/auth";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", pin: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          pin: formData.pin,
        });
        
        // User data save karein
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        
        // Navigate use karein taake page reload na ho
        navigate("/dashboard"); 
      } else {
        await axios.post(`${API_URL}/register`, formData);
        alert("Registration successful! Wait for admin approval.");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f0f2f5" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", width: "350px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>{isLogin ? "Login" : "Register"}</h2>
        
        {error && <p style={{ color: "red", textAlign: "center", fontSize: "14px" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {!isLogin && (
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
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "15px", cursor: "pointer", color: "#4f46e5" }} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}