export default function SelectorDia({ modoDia, setModoDia }) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-semibold mb-2">Día:</label>
      <select
        value={modoDia}
        onChange={(e) => setModoDia(e.target.value)}
        className="w-full px-3 py-2 border rounded-lg shadow-sm"
      >
        <option value="habil">Lunes a Viernes</option>
        <option value="sabado">Sábado</option>
        <option value="domingo">Domingo / Feriado</option>
      </select>
    </div>
  );
}
