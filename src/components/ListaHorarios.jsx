import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import HorarioCard from "./HorarioCard";
import BotonesScroll from "./BotonesScroll";

export default function ListaHorarios({ horarios }) {
  const [mostrarLista, setMostrarLista] = useState(true);

  if (horarios.length === 0) {
    return (
      <div className="text-center text-gray-600 text-xl mt-12">
        🚫 No hay horarios que coincidan con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setMostrarLista((prev) => !prev)}
        className="flex items-center justify-between w-full text-xl font-semibold text-gray-700 mb-4"
      >
        Lista de horarios
        <span
          className={`transform transition-transform duration-300 ${
            mostrarLista ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaChevronDown />
        </span>
      </button>

      {mostrarLista && (
        <>
          <BotonesScroll />
          <div className="grid grid-cols-1 gap-6">
            {horarios.map((item, index) => (
              <HorarioCard key={index} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
