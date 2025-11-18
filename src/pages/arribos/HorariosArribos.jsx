import { useState } from 'react';
import {
  FaHome,
  FaMapMarkerAlt,
  FaFlagCheckered,
  FaCity,
  FaTree,
  FaGasPump,
  FaBus,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function HorariosArribos() {
  const [idParada, setIdParada] = useState("");
  const navigate = useNavigate();

  const botones = [
    { label: 'Casa', icon: <FaHome className="text-2xl text-white" />, path: '/arribos/casa' },
    { label: 'La Plata', icon: <FaMapMarkerAlt className="text-2xl text-white" />, path: '/arribos/laplata' },
    { label: 'Llegada a casa', icon: <FaFlagCheckered className="text-2xl text-white" />, path: '/arribos/llegadaCasa' },
    { label: 'Plaza Villa Elisa', icon: <FaTree className="text-2xl text-white" />, path: '/arribos/plazave' },
    { label: 'Plaza Italia', icon: <FaCity className="text-2xl text-white" />, path: '/arribos/italia' },
    { label: 'Axion', icon: <FaGasPump className="text-2xl text-white" />, path: '/arribos/axion' },
    { label: 'Alpargatas', icon: <FaBus className="text-2xl text-white" />, path: '/arribos/alpargatas' },
    { label: '195 Pereyra', icon: <FaBus className="text-2xl text-white" />, path: '/arribos/pereyra' },
    { label: '195 Av. Brasil', icon: <FaBus className="text-2xl text-white" />, path: '/arribos/avbrasil' },
    { label: '195 Retiro', icon: <FaBus className="text-2xl text-white" />, path: '/arribos/retiro' },
    { label: '195 Llegada Retiro', icon: <FaBus className="text-2xl text-white" />, path: '/arribos/retirollegada' },
    { label: '195 Llegada La Plata', icon: <FaBus className="text-2xl text-white" />, path: '/arribos/laplatacos' },
  ];

  const handleEnviar = () => {
      if (idParada.trim() !== "") {
        navigate(`/arribos/parada/${idParada}`);
      }
    };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Próximos arribos
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
          className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Enviar
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
        {botones.map(({ label, icon, path }, index) => (
          <button
            key={index}
            onClick={() => navigate(path)}
            className="w-full flex items-center gap-3 bg-[#FFC421] hover:bg-[#FFD95E] text-white rounded-lg shadow-md transition duration-300 px-4 py-3"
          >
            {icon}
            <span className="text-base font-semibold">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
