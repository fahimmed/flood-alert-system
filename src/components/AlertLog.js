import React, { useState } from "react";

const AlertLog = ({ alertLog, getFloodColor }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;
  const totalPages = Math.ceil(alertLog.length / logsPerPage);

  const currentLogs = alertLog.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage);

  return (
    <div style={{ gridColumn: "span 2", border: "1px solid #ccc", padding: "20px", borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
      <h2>📜 Alert Log</h2>
      <ul>
        {currentLogs.map((log, index) => (
          <li key={index}>Flood risk changed to <strong style={{ color: getFloodColor(log.level) }}>{log.level.toUpperCase()}</strong> at {log.time}</li>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>◀ Prev</button>
        <span> Page {currentPage} of {totalPages} </span>
        <button onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>Next ▶</button>
      </div>
    </div>
  );
};

export default AlertLog;