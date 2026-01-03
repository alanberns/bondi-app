import { FaChevronDown } from 'react-icons/fa';

export default function FiltroRamal({ horarios, seleccionados, setSeleccionados, mostrarFiltro, toggleFiltro, toggleNombre }) {
  return (
    <div className="mb-6">
      <button
        onClick={toggleFiltro}
        className="flex items-center justify-between w-full text-xl font-semibold text-gray-700 mb-2"
      >
        Filtrar por ramal
        <span
          className={`transform transition-transform duration-300 ${mostrarFiltro ? 'rotate-180' : 'rotate-0'}`}
        >
          <FaChevronDown />
        </span>
      </button>

      {mostrarFiltro && (
        <>
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSeleccionados([...new Set(horarios.map(h => h.Nombre))])}
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
            {[...new Set(horarios.map(h => h.Nombre))].map((nombre, i) => (
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
  );
}
