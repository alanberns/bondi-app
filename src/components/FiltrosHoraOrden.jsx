export default function FiltrosHoraOrden({ desde, hasta, orden, setDesde, setHasta, setOrden }) {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Desde:</label>
        <input
          type="time"
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Hasta:</label>
        <input
          type="time"
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Ordenar por:</label>
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg shadow-sm"
        >
          <option value="hora">Hora</option>
          <option value="nombre">Ramal</option>
        </select>
      </div>
    </div>
  );
}
