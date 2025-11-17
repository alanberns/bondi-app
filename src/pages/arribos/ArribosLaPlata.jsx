import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function ArribosLaPlata() {
const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  

  useEffect(() => {
    async function fetchHorarios() {
      try {
        const res = await fetch("https://back-api-bondi.vercel.app/api/unionplatense?idParada=LP2310");
        const data = await res.json();
        setHorarios(data);
      } catch (error) {
        console.error("Error al obtener los horarios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHorarios();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Cargando horarios...</p>;

return (
  <div className="min-h-screen bg-[#FCE677]">
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        🚌 Horarios desde Plaza San Martín
      </h1>

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

      {/* 🚌 Lista de arribos */}
      {horarios.length === 0 ? (
        <div className="text-center text-gray-600 text-xl mt-12">
          🚫 No hay arribos disponibles en este momento.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {horarios.map((item, index) => {
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
