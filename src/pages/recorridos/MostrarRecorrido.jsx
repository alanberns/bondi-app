
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";


function MostrarRecorrido({ recorridos }) {
  const [selectedParada, setSelectedParada] = useState(null);
  const [arribos, setArribos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostrarArribos, setMostrarArribos] = useState(true);
  const [mostrarParadas, setMostrarParadas] = useState(true);

  const apiUrl = "https://back-api-bondi.vercel.app/api/unionplatense?idParada=";

  const fetchArribos = async (identificador) => {
    setSelectedParada(identificador);
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}${identificador}`);
      const data = await res.json();
      setArribos(data.arribos || []);
    } catch (err) {
      setArribos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-2">
        <label className="flex items-center cursor-pointer select-none">
          <input
            type="checkbox"
            checked={mostrarParadas}
            onChange={() => setMostrarParadas(v => !v)}
            className="form-checkbox h-5 w-5 text-yellow-500"
          />
          <span className="ml-2 text-gray-800 text-base">Mostrar paradas</span>
        </label>
      </div>
      <MapContainer center={[-34.92, -57.95]} zoom={13} style={{ height: "60vh", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {recorridos.map((rec, i) => (
          <>
            <Polyline
              key={"poly-" + i}
              positions={rec.puntos.map(p => [parseFloat(p.latitud), parseFloat(p.longitud)])}
              color={i % 2 === 0 ? "blue" : "red"}
            >
              <Popup>
                <strong>{rec.linea}</strong><br />
                {rec.ramal}
              </Popup>
            </Polyline>
            {mostrarParadas && rec.paradas && rec.paradas.map((parada, j) => (
              <Marker
                key={"parada-" + i + "-" + j}
                position={[parseFloat(parada.latitud), parseFloat(parada.longitud)]}
              >
                <Popup>
                  <strong>Parada:</strong> {parada.identificador}<br />
                  <div className="flex justify-center mt-2">
                    <button
                      className="bg-[#FFC421] hover:bg-[#FFD95E] text-white px-2 py-1 rounded"
                      onClick={() => fetchArribos(parada.identificador)}
                    >
                      Ver arribos
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </>
        ))}
      </MapContainer>
      {/* Mostrar arribos debajo del mapa si hay una parada seleccionada */}
      {selectedParada && (
        <div className="max-w-4xl mx-auto p-8">
          <button
            onClick={() => setMostrarArribos(prev => !prev)}
            className="flex items-center justify-between w-full text-xl font-semibold text-gray-700 mb-6"
          >
            Arribos
            <span className={`transform transition-transform duration-300 ${mostrarArribos ? 'rotate-180' : 'rotate-0'}`}>
              <FaChevronDown />
            </span>
          </button>
          {mostrarArribos && (
            <>
              {loading ? (
                <div className="text-center text-lg">Cargando...</div>
              ) : (
                <>
                  {arribos.length === 0 ? (
                    <div className="text-center text-gray-600 text-base mt-8">
                      🚫 No hay horarios que coincidan con los filtros seleccionados.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {arribos.map((item, index) => (
                        <div key={index} className="relative bg-white p-3 rounded-md shadow border-l-8 border-l-blue-500">
                          <p className="text-sm font-semibold text-gray-800 mb-1 truncate">
                            {/\[.*\]/.test(item.descripcionBandera)? (
                              <span>{item.descripcionBandera} - ({item.descripcionCortaBandera})</span>
                            ) : (
                              <span>{item.descripcionLinea} {item.descripcionCortaBandera} - ({item.descripcionBandera})</span>
                            )}
                          </p>
                          <p className="text-lg font-bold text-gray-600">{item.tiempoRestanteArribo}</p>
                          <p className="text-xs text-gray-700 mt-1">
                            {item.desvioHorario && (item.desvioHorario.startsWith("-") ? `Atrasado: ${item.desvioHorario}` : `Adelantado: ${item.desvioHorario}`)}
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
            </>
          )}
        </div>
      )}
    </>
  );
}

export default MostrarRecorrido;
