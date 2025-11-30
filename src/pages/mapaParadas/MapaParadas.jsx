import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Papa from "papaparse";
import "leaflet/dist/leaflet.css";

function MapaParadas() {
  const [paradas, setParadas] = useState([]);

  useEffect(() => {
    Papa.parse("/paradas.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setParadas(result.data);
      },
    });
  }, []);

  return (
    <MapContainer
      center={[-34.92, -57.95]}
      zoom={13}
      style={{ height: "70vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Agrupador de marcadores */}
      <MarkerClusterGroup chunkedLoading>
        {paradas.map((p, i) => (
          <Marker
            key={i}
            position={[parseFloat(p.latitud), parseFloat(p.longitud)]}
          >
            <Popup>
              <strong>{p.identificador}</strong>
              <br />
              <button className="bg-[#FFC421] hover:bg-[#FFD95E] text-white px-2 py-1 rounded mt-2">
                Ver arribos
              </button>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default MapaParadas;
