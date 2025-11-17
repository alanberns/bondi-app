import { useState } from 'react';
import {
  FaHome,
  FaShoppingBag,
  FaRoad,
  FaCity,
  FaTree,
  FaTrain,
  FaPagelines,
  FaIndustry,
  FaBus, 
  FaMapMarkerAlt
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function ArribosMoqsa() {
  const [idParada, setIdParada] = useState("");
  const navigate = useNavigate();

  const botones = [
    { label: 'Debenedetti a Capital', icon: <FaHome className="text-2xl text-white" />, path: '/arribosmoqsa/debenedetti' },
    { label: 'Walmart a Capital', icon: <FaShoppingBag className="text-2xl text-white" />, path: '/arribosmoqsa/walmart' },
    { label: 'Capital (casa rosada)', icon: <FaCity className="text-2xl text-white" />, path: '/arribosmoqsa/capital' },
    { label: 'Acceso y Debenedetti (1-2-BG)', icon: <FaRoad className="text-2xl text-white" />, path: '/arribosmoqsa/acceso' },
    { label: 'Plaza Jaramillo (L azul/roja)', icon: <FaTree className="text-2xl text-white" />, path: '/arribosmoqsa/jaramillo' },
    { label: 'Estación Sarandí', icon: <FaTrain className="text-2xl text-white" />, path: '/arribosmoqsa/sarandi' },
    { label: 'Las Flores a Capital', icon: <FaPagelines className="text-2xl text-white" />, path: '/arribosmoqsa/lasflores' },
    { label: 'Estación Berazategui', icon: <FaTrain className="text-2xl text-white" />, path: '/arribosmoqsa/bera' },
    { label: 'Alpargatas', icon: <FaBus className="text-2xl text-white" />, path: '/arribosmoqsa/alpargatas' },
    { label: 'Ducilo a Capital', icon: <FaMapMarkerAlt className="text-2xl text-white" />, path: '/arribosmoqsa/ducilocap' },
    { label: 'Ducilo a Bera', icon: <FaIndustry className="text-2xl text-white" />, path: '/arribosmoqsa/ducilobera' },
  ];

    const handleEnviar = () => {
      if (idParada.trim() !== "") {
        navigate(`/arribosmoqsa/parada/${idParada}`);
      }
    };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Próximos arribos (MOQSA)
      </h1>
      {/* Input para idParada */}
      <div className="flex gap-2 mb-6 w-full max-w-md">
        <input
          type="text"
          value={idParada}
          onChange={(e) => setIdParada(e.target.value)}
          placeholder="Ingresá ID de parada"
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleEnviar}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {botones.map(({ label, icon, path }, index) => (
          <button
            key={index}
            onClick={() => navigate(path)}
            className="w-full flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition duration-300 px-4 py-3"
          >
            {icon}
            <span className="text-base font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
