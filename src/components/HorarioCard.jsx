export default function HorarioCard({ item }) {
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
  const tipo = item.Nombre.match(/^\[[^\]]+\]/)?.[0] || "default";
  const bordeColor = coloresPorTipo[tipo] || "border-l-white";

  return (
    <div className={`bg-white p-6 rounded-xl shadow-md border-l-8 ${bordeColor} transition duration-300`}>
      <p className="text-xl font-semibold text-gray-800 mb-2">{item.Nombre}</p>
      <p className="text-3xl font-bold text-gray-600">{item.Hora}</p>
    </div>
  );
}
