import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import MapView from "./components/MapView";
import AlertLog from "./components/AlertLog";
import LineChart from "./components/LineChart"; 

const mockFloodData = {
  polygonCoordinates: [
    [53.4261, -7.9425],
    [53.4255, -7.9400],
    [53.4245, -7.9380],
    [53.4235, -7.9405],
    [53.4248, -7.9435],
  ],
  riskLevels: ["green", "orange", "red"],
};

const getFloodColor = (riskLevel) => {
  if (riskLevel === "green") return "green";
  if (riskLevel === "orange") return "orange";
  if (riskLevel === "red") return "red";
  return "blue";
};

const riskLevelToNumber = (level) => {
  if (level === "green") return 1;
  if (level === "orange") return 2;
  if (level === "red") return 3;
  return 0;
};

const App = () => {
  const [floodRisk, setFloodRisk] = useState(mockFloodData.riskLevels[0]);
  const [alertLog, setAlertLog] = useState([
    { time: "12:00", level: "green" },
    { time: "13:15", level: "orange" },
    { time: "14:30", level: "red" },
  ]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % mockFloodData.riskLevels.length;
      const newRisk = mockFloodData.riskLevels[index];

      setFloodRisk(newRisk);
      setAlertLog((prevLog) => [
        { time: new Date().toLocaleTimeString(), level: newRisk },
        ...prevLog,
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartData = [...alertLog]
  .slice()
  .reverse()
  .map((d) => ({ level: riskLevelToNumber(d.level) }));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px", padding: "20px" }}>
      <Dashboard floodRisk={floodRisk} getFloodColor={getFloodColor} />
      <MapView floodRisk={floodRisk} getFloodColor={getFloodColor} polygonCoordinates={mockFloodData.polygonCoordinates} />
      <AlertLog alertLog={alertLog} getFloodColor={getFloodColor} />
      <LineChart data={chartData} />
        </div>
  );
};

export default App;