import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const FitToPolygon = ({ polygonCoords }) => {
  const map = useMap();
  useEffect(() => {
    if (polygonCoords.length) {
      map.fitBounds(polygonCoords);
    }
  }, [map, polygonCoords]);
  return null;
};

const MapView = ({ floodRisk, getFloodColor, polygonCoordinates }) => {
  return (
    <div style={{ height: "400px", border: "1px solid #ccc", borderRadius: "10px", overflow: "hidden" }}>
      <h2 style={{ textAlign: "center", padding: "10px", margin: "0", backgroundColor: "#f1f1f1" }}>🌍 Map View</h2>
      <MapContainer center={[53.4239, -7.9407]} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
        <Polygon positions={polygonCoordinates} pathOptions={{ color: getFloodColor(floodRisk) }} />
        <FitToPolygon polygonCoords={polygonCoordinates} />
      </MapContainer>
    </div>
  );
};

export default MapView;