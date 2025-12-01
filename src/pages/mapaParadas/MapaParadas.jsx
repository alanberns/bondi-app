import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Papa from "papaparse";
import { FaChevronDown, FaSync } from "react-icons/fa";
import Spinner from "../../components/Spinner";
import "leaflet/dist/leaflet.css";

export default function MapaParadas() {
  const [paradas, setParadas] = useState([]);
  const [selectedParada, setSelectedParada] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);

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

      const nombresUnicos = [...new Set(arribos.map(h => (h.descripcionBandera || "").trim()))];
      if (seleccionados.length === 0) {
        setSeleccionados(nombresUnicos);
      }
    } catch (err) {
      console.error("Error al obtener horarios:", err);
    } finally {
      setLoading(false);
    }
  };

  // cuando cambia la parada seleccionada → fetch automático
  useEffect(() => {
    fetchHorarios();
  }, [selectedParada]);

  const nombresUnicos = [...new Set(horarios.map(h => (h.descripcionBandera || "").trim()))];
  const horariosFiltrados = horarios.filter(h => seleccionados.includes((h.descripcionBandera || "").trim()));

  return (
    <div className="min-h-screen bg-[#FCE677]">
      {/* 🗺️ Mapa */}
      <MapContainer center={[-34.92, -57.95]} zoom={13} style={{ height: "50vh", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <MarkerClusterGroup chunkedLoading>
          {paradas.map((p, i) => (
            <Marker key={i} position={[parseFloat(p.latitud), parseFloat(p.longitud)]}>
              <Popup>
                <strong>{p.identificador}</strong>
                <br />
                <button
                  className="bg-[#FFC421] hover:bg-[#FFD95E] text-white px-2 py-1 rounded mt-2"
                  onClick={() => setSelectedParada(p.identificador)}
                >
                  Ver arribos
                </button>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* 🚌 Arribos debajo del mapa */}
      {selectedParada && (
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Arribos</h1>

          <div className="flex justify-center gap-2 my-2">
            <button
              className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
              onClick={() => setSelectedParada(null)}
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
                    <div key={index} className="bg-white p-3 rounded-md shadow border-l-8 border-l-blue-500">
                      <p className="text-sm font-semibold text-gray-800 mb-1 truncate">
                        {item.descripcionBandera} - ({item.descripcionCortaBandera})
                      </p>
                      <p className="text-lg font-bold text-gray-600">{item.tiempoRestanteArribo}</p>
                      <p className="text-xs text-gray-700 mt-1">
                        {item.desvioHorario.startsWith("-") ? `Atrasado: ${item.desvioHorario}` : `Adelantado: ${item.desvioHorario}`}
                      </p>
                      <p className="text-gray-500 mt-1 text-xs">
                        Coche: {item.identificadorCoche} | Chofer: {item.identificadorChofer}
                      </p>
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
