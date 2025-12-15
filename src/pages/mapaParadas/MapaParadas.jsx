import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Tooltip } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Papa from "papaparse";
import { FaChevronDown, FaSync } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";

const busIcon = L.divIcon({
  html: `
    <div style="
      background:white;
      border:3px solid black;
      border-radius:50%;
      width:30px;
      height:30px;
      display:flex;
      align-items:center;
      justify-content:center;
      color:white;
      font-size:24px;
    ">
      🚍
    </div>
  `,
  className: "custom-bus-icon",
  iconSize: [30, 30],
  iconAnchor: [25, 30],
});

const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Componente auxiliar para centrar el mapa
function FlyToParada({ parada }) {
  const map = useMap();
  useEffect(() => {
    if (false) {
      map.flyTo([parseFloat(parada.latitud), parseFloat(parada.longitud)], 15);
    }
  }, [parada, map]);
  return null;
}

function FlyToHorario({ horario }) {
  const map = useMap();
  useEffect(() => {
    if (horario) {
      map.flyTo([parseFloat(horario.latitud), parseFloat(horario.longitud)], 13);
    }
  }, [horario, map]);
  return null;
}

export default function MapaParadas() {
  const [paradas, setParadas] = useState([]);
  const [selectedParada, setSelectedParada] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);
  const [nombresDisponibles, setNombresDisponibles] = useState([]);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const navigate = useNavigate();
  const [selectedHorario, setSelectedHorario] = useState(null);


  const apiUrl = "https://back-api-bondi.vercel.app/api/unionplatense?idParada=";

  // cargar CSV
  useEffect(() => {
    Papa.parse("/paradas.csv", {
      download: true,
      header: true,
      complete: (result) => setParadas(result.data),
    });
  }, []);

  // función fetch reutilizable
  const fetchHorarios = async () => {
    if (!selectedParada) return;
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}${selectedParada}`);
      const data = await res.json();
      const arribos = data.arribos || [];
      setHorarios(arribos);

    } catch (err) {
      console.error("Error al obtener horarios:", err);
    } finally {
      setLoading(false);
    }
  };

// cuando cambia la parada seleccionada → fetch automático y reset de selección
useEffect(() => {
  fetchHorarios();
  setSeleccionados([]); // vaciar selección al cambiar de parada
}, [selectedParada]);

// cuando llegan horarios nuevos
useEffect(() => {
  const nuevosNombres = [...new Set(
    horarios.map(h =>(/\[.*\]/.test(h.descripcionBandera) ? h.descripcionBandera : h.descripcionLinea).trim())
  )];
  setNombresDisponibles(nuevosNombres);

  // si la selección está vacía (porque venís de una parada nueva), inicializar con todos
  if (seleccionados.length === 0) {
    setSeleccionados(nuevosNombres);
  }
}, [horarios]);


  const nombresUnicos = [...new Set(horarios.map(
      h =>(/\[.*\]/.test(h.descripcionBandera)? h.descripcionBandera : h.descripcionLinea).trim()
    ))];
  const horariosFiltrados = horarios.filter(h =>
    seleccionados.includes(h.descripcionBandera?.trim()) ||
    seleccionados.includes(h.descripcionLinea?.trim())
  );


  const paradaSeleccionada = paradas.find(p => p.identificador === selectedParada);

  const truncate = (str, max = 20) =>
  str && str.length > max ? str.substring(0, max) + "..." : str;

  return (
    <div className="min-h-screen bg-[#FCE677]">
      {/* 🗺️ Mapa */}
      <MapContainer center={[-34.92, -57.95]} zoom={13} style={{ height: "80vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <MarkerClusterGroup chunkedLoading maxClusterRadius={50} disableClusteringAtZoom={15}>
          {paradas.map((p, i) => (
            <Marker
              key={i}
              position={[parseFloat(p.latitud), parseFloat(p.longitud)]}
              icon={blueIcon}
            >
              <Popup autoOpen={selectedParada === p.identificador}>
                <strong>{p.identificador.replaceAll("&idParada=", ", ")}</strong>
                <br />
                <div className="flex justify-center mt-2">
                  <button
                    className="bg-[#FFC421] hover:bg-[#FFD95E] text-white px-2 py-1 rounded"
                    onClick={() => setSelectedParada(p.identificador)}
                  >
                    Ver arribos
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {/* El marcador seleccionado, fuera del cluster */}
        {selectedParada && (
          <Marker
            position={[
              parseFloat(paradaSeleccionada.latitud),
              parseFloat(paradaSeleccionada.longitud),
            ]}
            icon={redIcon}
          >
            <Popup autoOpen>
              <strong>{paradaSeleccionada.identificador.replaceAll("&idParada=", ", ")}</strong>
              <br />
              <div className="flex justify-center mt-2">
                <button
                  className="bg-[#FFC421] hover:bg-[#FFD95E] text-white px-2 py-1 rounded"
                  onClick={() => setSelectedParada(paradaSeleccionada.identificador)}
                >
                  Ver arribos
                </button>
              </div>
            </Popup>
          </Marker>
        )}

        {horariosFiltrados.map((h, i) => (
          <Marker
            key={`arribo-${i}`}
            position={[parseFloat(h.latitud), parseFloat(h.longitud)]}
            icon={busIcon}
          >
          <Tooltip permanent direction="right">
            <div style={{ fontSize: "0.85rem", lineHeight: "1.2" }}>
              <strong>{h.descripcionLinea.replace("LINEA","").replace("(TALP)","")}</strong>{" "}
              {truncate(/\[.*\]/.test(h.descripcionBandera) ? h.descripcionBandera.replace(`[${h.descripcionLinea.replace("LINEA","").replace("(TALP)","")}]`) : h.descripcionCortaBandera, 25)}
              <br />
              <span style={{ fontWeight: "bold", color: "#d32f2f" }}>
                {h.tiempoRestanteArribo}
              </span><small>  Coche: {h.identificadorCoche}</small>
            </div>
          </Tooltip>
          </Marker>
        ))}

        <FlyToParada parada={paradaSeleccionada} />
        <FlyToHorario horario={selectedHorario} />
      </MapContainer>

      {/* 🚌 Arribos debajo del mapa */}
      {selectedParada && (
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Arribos</h1>

          <div className="flex justify-center gap-2 my-2">
            <button
              className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
              onClick={() => navigate('/')}
            >
              Inicio
            </button>

            <button
              className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center gap-2 transition duration-300"
              onClick={fetchHorarios}
            >
              <FaSync /> Actualizar
            </button>
          </div>

          {loading ? (
            <Spinner color="border-[#FFC421]" />
          ) : (
            <>
              {/* Filtro */}
              <div className="m-6">
                <button
                  onClick={() => setMostrarFiltro(prev => !prev)}
                  className="flex items-center justify-between w-full text-xl font-semibold text-gray-700 mb-2"
                >
                  Filtrar por ramal
                  <span className={`transform transition-transform duration-300 ${mostrarFiltro ? 'rotate-180' : 'rotate-0'}`}>
                    <FaChevronDown />
                  </span>
                </button>
                {mostrarFiltro && (
                  <>
                    <div className="flex gap-4 mb-4">
                      <button
                        onClick={() => setSeleccionados(nombresUnicos)}
                        className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center gap-2 transition duration-300"
                      >
                        Todos
                      </button>
                      <button
                        onClick={() => setSeleccionados([])}
                        className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center gap-2 transition duration-300"
                      >
                        Ninguno
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {nombresUnicos.map((bandera, i) => (
                        <label key={i} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-300">
                          <input
                            type="checkbox"
                            checked={seleccionados.includes(bandera)}
                            onChange={() =>
                              setSeleccionados(prev =>
                                prev.includes(bandera) ? prev.filter(n => n !== bandera) : [...prev, bandera]
                              )
                            }
                          />
                          <span className="text-gray-800">{bandera}</span>
                        </label>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Lista filtrada */}
              {horariosFiltrados.length === 0 ? (
                <div className="text-center text-gray-600 text-base mt-8">
                  🚫 No hay horarios que coincidan con los filtros seleccionados.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {horariosFiltrados.map((item, index) => (
                    <div key={index} className="relative bg-white p-3 rounded-md shadow border-l-8 border-l-blue-500">
                      <p className="text-sm font-semibold text-gray-800 mb-1 truncate">
                        {/\[.*\]/.test(item.descripcionBandera)? (
                          <p>{item.descripcionBandera} - ({item.descripcionCortaBandera})</p>
                        ) : (
                          <p>{item.descripcionLinea} {item.descripcionCortaBandera} - ({item.descripcionBandera})</p>
                        )}
                      </p>
                      <p className="text-lg font-bold text-gray-600">{item.tiempoRestanteArribo}</p>
                      <p className="text-xs text-gray-700 mt-1">
                        {item.desvioHorario.startsWith("-") ? `Atrasado: ${item.desvioHorario}` : `Adelantado: ${item.desvioHorario}`}
                      </p>
                      <p className="text-gray-500 mt-1 text-xs">
                        Coche: {item.identificadorCoche} | Chofer: {item.identificadorChofer}
                      </p>
                      <div className="absolute bottom-2 right-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded shadow"
                          onClick={() => setSelectedHorario(item)}
                        >
                          Ver en mapa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
