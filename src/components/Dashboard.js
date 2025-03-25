import React from "react";

const Dashboard = ({ floodRisk, getFloodColor }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px", backgroundColor: "#f9f9f9", textAlign: "center" }}>
      <h2>📊 Dashboard</h2>
      <p><strong>Current Flood Risk: </strong><span style={{ color: getFloodColor(floodRisk), fontSize: "20px", fontWeight: "bold" }}>{floodRisk.toUpperCase()}</span></p>
      <p style={{ marginTop: "10px", fontSize: "16px" }}>
        {floodRisk === "green" && "✅ No flooding expected in the next 24 hours."}
        {floodRisk === "orange" && "⚠️ Possible flooding risk within the next X hours!"}
        {floodRisk === "red" && "🚨 Flooded region! Immediate action required!"}
      </p>
      <p style={{ fontSize: "14px", color: "#666" }}>Last Updated: {new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default Dashboard;