import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [series, setSeries] = useState([]);
  const [winners, setWinners] = useState([]);
  const [users, setUsers] = useState([]);
  
  const [denomination, setDenomination] = useState(750);
  const [totalSeries, setTotalSeries] = useState(3);
  const [selectedSeriesId, setSelectedSeriesId] = useState("");
  const [totalBonds, setTotalBonds] = useState(100);
  
  const [winner, setWinner] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const loadSeries = async () => {
    try {
      const res = await axios.get(`${API_URL}/bond-series`);
      setSeries(res.data);
    } catch (err) { console.log(err); }
  };

  const loadWinners = async () => {
    try {
      const res = await axios.get(`${API_URL}/bonds/winners`);
      setWinners(res.data);
    } catch (err) { console.log(err); }
  };

  const loadUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (err) { console.log(err); }
  };

  useEffect(() => {
    loadSeries();
    if (activeTab === "history") loadWinners();
    if (activeTab === "admin") loadUsers();
  }, [activeTab]);

  const handleGenerateSeries = async () => {
    try {
      await axios.post(`${API_URL}/bond-series/generate`, { denomination, totalSeries });
      loadSeries();
      setMessage({ type: "success", text: "Series Generated!" });
    } catch (err) { setMessage({ type: "error", text: "Failed" }); }
  };

  const handleGenerateBonds = async () => {
    if (!selectedSeriesId) return alert("Enter Series ID");
    try {
      await axios.post(`${API_URL}/bonds/generate`, { seriesId: Number(selectedSeriesId), totalBonds: Number(totalBonds) });
      setMessage({ type: "success", text: "Bonds Generated!" });
    } catch (err) { setMessage({ type: "error", text: "Failed" }); }
  };

  const handleDrawWinner = async (seriesId) => {
    setIsDrawing(true);
    setWinner(null);
    try {
      const res = await axios.post(`${API_URL}/bonds/draw/${seriesId}`);
      setWinner(res.data.winner);
      setMessage({ type: "success", text: "Winner Drawn!" });
      loadWinners(); 
    } catch (err) {
      setMessage({ type: "error", text: "Draw failed" });
    } finally { setIsDrawing(false); }
  };

  const handleApproveUser = async (id) => {
    try {
      await axios.put(`${API_URL}/users/approve/${id}`);
      loadUsers();
      alert("User Approved!");
    } catch (err) { alert("Failed to approve"); }
  };

  const handleLogout = () => { sessionStorage.clear(); navigate("/"); };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: "#f4f7f6" }}>
      
      {/* SIDEBAR */}
      <div style={{ width: "250px", background: "#1e293b", color: "white", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #334155" }}>
          <h2 style={{ margin: 0, color: "#38bdf8" }}>🎰 Prize Bond</h2>
        </div>
        <div style={{ padding: "20px 10px", flex: 1 }}>
          <button onClick={() => setActiveTab("dashboard")} style={{ width: "100%", padding: "12px", background: activeTab === "dashboard" ? "#3b82f6" : "transparent", color: "white", border: "none", borderRadius: "8px", textAlign: "left", cursor: "pointer", marginBottom: "10px" }}>📊 Dashboard</button>
          <button onClick={() => setActiveTab("generate")} style={{ width: "100%", padding: "12px", background: activeTab === "generate" ? "#3b82f6" : "transparent", color: "white", border: "none", borderRadius: "8px", textAlign: "left", cursor: "pointer", marginBottom: "10px" }}>⚙️ Generate</button>
          <button onClick={() => setActiveTab("draw")} style={{ width: "100%", padding: "12px", background: activeTab === "draw" ? "#3b82f6" : "transparent", color: "white", border: "none", borderRadius: "8px", textAlign: "left", cursor: "pointer", marginBottom: "10px" }}>🏆 Lucky Draw</button>
          <button onClick={() => setActiveTab("history")} style={{ width: "100%", padding: "12px", background: activeTab === "history" ? "#3b82f6" : "transparent", color: "white", border: "none", borderRadius: "8px", textAlign: "left", cursor: "pointer", marginBottom: "10px" }}>📜 Winners History</button>
          <button onClick={() => setActiveTab("admin")} style={{ width: "100%", padding: "12px", background: activeTab === "admin" ? "#3b82f6" : "transparent", color: "white", border: "none", borderRadius: "8px", textAlign: "left", cursor: "pointer" }}>👑 Admin Panel</button>
        </div>
        <div style={{ padding: "20px", borderTop: "1px solid #334155" }}>
          <button onClick={handleLogout} style={{ width: "100%", padding: "10px", background: "#ef4444", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}>Logout</button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, padding: "30px", overflowY: "auto" }}>
        
        {message.text && <div style={{ padding: "15px", borderRadius: "8px", marginBottom: "20px", background: message.type === "error" ? "#fee2e2" : "#d1fae5", color: message.type === "error" ? "#991b1b" : "#065f46" }}>{message.text}</div>}

        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <div>
            <h1>Dashboard</h1>
            <div style={{ background: "white", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
              <h3>Total Series: {series.length}</h3>
            </div>
          </div>
        )}

        {/* GENERATE TAB */}
        {activeTab === "generate" && (
          <div>
            <h1>Generate Data</h1>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
                <h3>1. Generate Series</h3>
                <input type="number" value={denomination} onChange={(e) => setDenomination(e.target.value)} placeholder="Denomination" style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }} />
                <input type="number" value={totalSeries} onChange={(e) => setTotalSeries(e.target.value)} placeholder="Total Series" style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }} />
                <button onClick={handleGenerateSeries} style={{ background: "#10b981", color: "white", padding: "10px", border: "none", borderRadius: "5px", width: "100%" }}>Generate Series</button>
              </div>
              <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
                <h3>2. Generate Bonds</h3>
                <input type="number" value={selectedSeriesId} onChange={(e) => setSelectedSeriesId(e.target.value)} placeholder="Series ID" style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }} />
                <input type="number" value={totalBonds} onChange={(e) => setTotalBonds(e.target.value)} placeholder="Total Bonds" style={{ display: "block", width: "100%", padding: "10px", marginBottom: "10px" }} />
                <button onClick={handleGenerateBonds} style={{ background: "#3b82f6", color: "white", padding: "10px", border: "none", borderRadius: "5px", width: "100%" }}>Generate Bonds</button>
              </div>
            </div>
          </div>
        )}

        {/* LUCKY DRAW TAB */}
        {activeTab === "draw" && (
          <div>
            <h1>Lucky Draw</h1>
            {winner && (
              <div style={{ background: "linear-gradient(135deg, #10b981, #059669)", padding: "40px", borderRadius: "15px", textAlign: "center", color: "white", marginBottom: "20px" }}>
                <h2>🏆 WINNING BOND 🏆</h2>
                <h1 style={{ fontSize: "70px", margin: "10px 0" }}>{winner.serialNumber}</h1>
              </div>
            )}
            <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
              <h3>Select Series</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ background: "#f8fafc" }}><th>ID</th><th>Name</th><th>Action</th></tr></thead>
                <tbody>
                  {series.map(s => (
                    <tr key={s.id}>
                      <td>{s.id}</td><td>{s.seriesName}</td>
                      <td><button onClick={() => handleDrawWinner(s.id)} style={{ background: "#f59e0b", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px" }}>Draw</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* WINNERS HISTORY TAB */}
        {activeTab === "history" && (
          <div>
            <h1>Winners History</h1>
            <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ background: "#f8fafc" }}><th>ID</th><th>Bond Number</th><th>Series ID</th><th>Date</th></tr></thead>
                <tbody>
                  {winners.map(w => (
                    <tr key={w.id}>
                      <td>{w.id}</td><td><strong>{w.bondNumber}</strong></td><td>{w.seriesId}</td><td>{new Date(w.drawDate).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ADMIN PANEL TAB */}
        {activeTab === "admin" && (
          <div>
            <h1>Admin Panel (Users)</h1>
            <div style={{ background: "white", padding: "20px", borderRadius: "10px" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr style={{ background: "#f8fafc" }}><th>Name</th><th>Email</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td>{u.name}</td><td>{u.email}</td><td>{u.approved ? "Approved" : "Pending"}</td>
                      <td>
                        {!u.approved && <button onClick={() => handleApproveUser(u.id)} style={{ background: "#10b981", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px" }}>Approve</button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}