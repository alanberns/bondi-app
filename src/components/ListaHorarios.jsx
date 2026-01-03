import HorarioCard from "./HorarioCard";

export default function ListaHorarios({ horarios }) {
  if (horarios.length === 0) {
    return (
      <div className="text-center text-gray-600 text-xl mt-12">
        🚫 No hay horarios que coincidan con los filtros seleccionados.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {horarios.map((item, index) => (
        <HorarioCard key={index} item={item} />
      ))}
    </div>
  );
}
