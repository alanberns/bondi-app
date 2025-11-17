import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ObtenerArribos({ apiUrl, titulo }) {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seleccionados, setSeleccionados] = useState([]);
  const [mostrarFiltro, setMostrarFiltro] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHorarios() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        const arribos = data.arribos || [];
        setHorarios(arribos);
        const nombresUnicos = [...new Set(arribos.map(h => (h.descripcionBandera || "").trim()))];
        setSeleccionados(nombresUnicos);
      } catch (error) {
        console.error("Error al obtener los horarios:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHorarios();
  }, [apiUrl]);

  const nombresUnicos = [...new Set(horarios.map(h => (h.descripcionBandera || "").trim()))];
  const horariosFiltrados = horarios.filter(h => seleccionados.includes((h.descripcionBandera || "").trim()));

  const toggleNombre = (bandera) => {
    setSeleccionados(prev =>
      prev.includes(bandera) ? prev.filter(n => n !== bandera) : [...prev, bandera]
    );
  };

  const toggleFiltro = () => setMostrarFiltro(prev => !prev);

  if (loading) return <p className="text-center text-gray-500">Cargando horarios...</p>;

  return (
    <div className="min-h-screen bg-[#FCE677]">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{titulo}</h1>

        <div className="flex justify-center gap-8 my-8">
          <button
            className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
            onClick={() => navigate('/arribos')}
          >
            Atrás
          </button>

          <button
            className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
            onClick={() => navigate('/')}
          >
            Inicio
          </button>
        </div>

        {/* ✅ Filtro por ramal */}
        <div className="mb-6">
          <button
            onClick={toggleFiltro}
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
                  className="px-4 py-2 text-white rounded bg-[#FFC421] hover:bg-[#FFD95E]"
                >
                  Seleccionar todos
                </button>
                <button
                  onClick={() => setSeleccionados([])}
                  className="px-4 py-2 text-white rounded bg-[#FFC421] hover:bg-[#FFD95E]"
                >
                  Deseleccionar todos
                </button>
              </div>

              <div className="flex flex-wrap gap-4">
                {nombresUnicos.map((bandera, i) => (
                  <label key={i} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-300">
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(bandera)}
                      onChange={() => toggleNombre(bandera)}
                    />
                    <span className="text-gray-800">{bandera}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* 🚌 Lista filtrada */}
        {horariosFiltrados.length === 0 ? (
          <div className="text-center text-gray-600 text-base mt-8">
            🚫 No hay horarios que coincidan con los filtros seleccionados.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {horariosFiltrados.map((item, index) => {
              const coloresPorTipo = {
                "[G]": "border-l-green-500",
                "[D]": "border-l-red-500",
                "[4]": "border-l-gray-800",
                "[HX28]": "border-l-gray-800",
                "[BG]": "border-l-gray-800",
                "[TOP]": "border-l-blue-500",
                "[418]": "border-l-blue-500",
                "[338]": "border-l-cyan-500",
              };
              const tipo = item.descripcionBandera.match(/^\[[^\]]+\]/)?.[0] || "default";
              const bordeColor = coloresPorTipo[tipo] || "border-l-white";

              return (
                <div
                  key={index}
                  className={`bg-white p-3 rounded-md shadow border-l-8 ${bordeColor} transition duration-300 w-full`}
                >
                  <p className="text-sm font-semibold text-gray-800 mb-1 truncate">
                    {item.descripcionBandera} - ({item.descripcionCortaBandera})
                  </p>
                  <p className="text-lg font-bold text-gray-600">{item.tiempoRestanteArribo}</p>
                  <p className="text-xs text-gray-700 mt-1">
                    {item.desvioHorario.startsWith("-")
                      ? `Atrasado: ${item.desvioHorario}`
                      : `Adelantado: ${item.desvioHorario}`}
                  </p>
                  <p className="text-gray-500 mt-1 text-xs">
                    Coche: {item.identificadorCoche} | Chofer: {item.identificadorChofer}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
