import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

export default function HorariosPzaVEReg() {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seleccionados, setSeleccionados] = useState([]);
  const [mostrarFiltro, setMostrarFiltro] = useState(true);
  const nombresUnicos = [...new Set(horarios.map(h => (h.nombre || "").trim()))];
  const horariosFiltrados = horarios.filter(h => seleccionados.includes((h.nombre || "").trim()));

  const navigate = useNavigate();


  useEffect(() => {

    async function fetchHorarios() {
      try {
        const res = await fetch("https://back-api-bondi.vercel.app/api/arribosPzaItalia");
        const data = await res.json();
        setHorarios(data);
        const nombresUnicos = [...new Set(data.map(h => h.nombre))];
        setSeleccionados(nombresUnicos);
      } catch (error) {
        console.error("Error al obtener los horarios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHorarios();
  }, []);

  const toggleNombre = (nombre) => {
    setSeleccionados((prev) =>
      prev.includes(nombre)
        ? prev.filter(n => n !== nombre)
        : [...prev, nombre]
    );
  };

  const toggleFiltro = () => setMostrarFiltro(prev => !prev);

  if (loading) return <p className="text-center text-gray-500">Cargando horarios...</p>;

  return (
    <div className="min-h-screen bg-[#FCE677]">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">🚌 Horarios desde Plaza Italia</h1>

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
            <span
              className={`transform transition-transform duration-300 ${mostrarFiltro ? 'rotate-180' : 'rotate-0'
                }`}
            >
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
                {nombresUnicos.map((nombre, i) => (
                  <label key={i} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-300">
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(nombre)}
                    onChange={() => toggleNombre(nombre)}
                  />
                  <span className="text-gray-800">{nombre}</span>
                </label>
              ))}
              </div>
            </>
          )}
        </div>


        {/* 🚌 Lista filtrada */}
      {horarios.filter(h => seleccionados.includes(h.nombre)).length === 0 ? (
        <div className="text-center text-gray-600 text-xl mt-12">
          🚫 No hay horarios que coincidan con los filtros seleccionados.
        </div>
      ) : (
          <>
            <div className="grid grid-cols-1 gap-6">
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
                const tipo = item.nombre.match(/^\[[^\]]+\]/)?.[0] || "default";
                const bordeColor = coloresPorTipo[tipo] || "border-l-white";

                return (
                  <div
                    key={index}
                    className={`bg-white p-6 rounded-xl shadow-md border-l-8 ${bordeColor} transition duration-300`}
                  >
                    <p className="text-xl font-semibold text-gray-800 mb-2">
                      {item.nombre} - ({item.DescripcionCortaBandera})
                    </p>
                    <p className="text-3xl font-bold text-gray-600">{item.hora}</p>
                    <p className="text-gray-700 mt-2">
                      Coche: {item.coche} | Chofer: {item.chofer}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.DesvioHorario.startsWith("-")
                        ? `Atrasado: ${item.DesvioHorario}`
                        : `Adelantado: ${item.DesvioHorario}`}
                    </p>
                  </div>
                );
            })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
