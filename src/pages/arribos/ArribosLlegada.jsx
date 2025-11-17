import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function ArribosLlegada() {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  

  useEffect(() => {
    async function fetchHorarios() {
      try {
        const res = await fetch("https://back-api-bondi.vercel.app/api/unionplatense?idParada=LP10481");
        const data = await res.json();
        const adaptados = (data.arribos || []).map(a => ({
          nombre: a.descripcionBandera, 
          hora: a.tiempoRestanteArribo, 
          coche: a.identificadorCoche,
          chofer: a.identificadorChofer,
          DescripcionCortaBandera: a.descripcionCortaBandera,
          DesvioHorario: a.desvioHorario,
        }));

      setHorarios(adaptados);
      } catch (error) {
        console.error("Error al obtener los horarios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHorarios();
  }, []);

if (loading) return <p>Cargando horarios...</p>;

return (
  <div className="min-h-screen bg-[#FCE677]">
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Arribos a Casa 🏠
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
              const tipo = item.nombre.startsWith("[G]") ? "green" : "red";
              const bordeColor =
                tipo === "green" ? "border-l-green-500" : "border-l-red-500";

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