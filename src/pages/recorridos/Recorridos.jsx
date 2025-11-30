import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import MostrarRecorrido from "./MostrarRecorrido";

function Recorridos() {
  const [data, setData] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [mostrarRecorridos, setMostrarRecorridos] = useState(false);
  const [lineaAbierta, setLineaAbierta] = useState(null);

  useEffect(() => {
    fetch("/recorridos.json")
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  // Agrupar ramales por línea
  const lineas = data.reduce((acc, rec) => {
    if (!acc[rec.linea]) acc[rec.linea] = [];
    acc[rec.linea].push(rec);
    return acc;
  }, {});

  const toggleSeleccion = (ramal) => {
    setSeleccionados(prev =>
      prev.includes(ramal) ? prev.filter(r => r !== ramal) : [...prev, ramal]
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Recorridos
      </h1>

      <div className="w-full max-w-md space-y-4">
        {Object.entries(lineas).map(([linea, ramales]) => (
          <div key={linea} className="bg-white rounded-lg shadow-md">
            {/* Botón horizontal estilo arribos */}
            <button
              onClick={() => setLineaAbierta(lineaAbierta === linea ? null : linea)}
              className="w-full flex items-center justify-between bg-[#FFC421] hover:bg-[#FFD95E] text-white rounded-lg shadow-md transition duration-300 px-4 py-3"
            >
              <span className="text-base font-semibold">Línea {linea}</span>
              <FaChevronDown
                className={`transform transition-transform duration-300 ${lineaAbierta === linea ? "rotate-180" : "rotate-0"}`}
              />
            </button>

            {/* Dropdown de ramales */}
            {lineaAbierta === linea && (
              <div className="p-4 space-y-2">
                <div className="flex gap-4 mb-2">
                  <button
                    onClick={() => setSeleccionados([...ramales])}
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

                {ramales.map((r, i) => (
                  <label
                    key={i}
                    className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-300"
                  >
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(r)}
                      onChange={() => toggleSeleccion(r)}
                    />
                    <span className="text-gray-800">{r.ramal}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botón mostrar recorridos */}
      <button
        onClick={() => setMostrarRecorridos(true)}
        className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md"
      >
        Mostrar recorridos seleccionados
      </button>

      {mostrarRecorridos && (
        <div className="mt-6 w-full max-w-4xl">
          <MostrarRecorrido recorridos={seleccionados} />
        </div>
      )}
    </div>
  );
}

export default Recorridos;
