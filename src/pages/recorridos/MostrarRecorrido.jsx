import { MapContainer, TileLayer, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MostrarRecorrido({ recorridos }) {
  return (
    <MapContainer center={[-34.92, -57.95]} zoom={13} style={{ height: "60vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {recorridos.map((rec, i) => (
        <Polyline
          key={i}
          positions={rec.puntos.map(p => [p.latitud, p.longitud])}
          color={i % 2 === 0 ? "blue" : "red"}
        >
          <Popup>
            <strong>{rec.linea}</strong><br />
            {rec.ramal}
          </Popup>
        </Polyline>
      ))}
    </MapContainer>
  );
}

export default MostrarRecorrido;
