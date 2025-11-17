import React from 'react';
import {
  FaHome,
  FaMapMarkerAlt,
  FaFlagCheckered,
  FaCity,
  FaTree,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function HorariosArribos() {
  const navigate = useNavigate();

  const botones = [
    {
      label: 'Casa',
      icon: <FaHome className="text-4xl mb-2 text-white" />,
      path: '/arribos/casa',
    },
    {
      label: 'La Plata',
      icon: <FaMapMarkerAlt className="text-4xl mb-2 text-white" />,
      path: '/arribos/laplata',
    },
    {
      label: 'Llegada a casa',
      icon: <FaFlagCheckered className="text-4xl mb-2 text-white" />,
      path: '/arribos/llegadaCasa',
    },
    {
      label: 'Plaza Villa Elisa',
      icon: <FaTree className="text-4xl mb-2 text-white" />,
      path: '/arribos/plazave',
    },
    {
      label: 'Plaza Italia',
      icon: <FaCity className="text-4xl mb-2 text-white" />,
      path: '/arribos/italia',
    },
    {
      label: 'Axion',
      icon: <FaCity className="text-4xl mb-2 text-white" />,
      path: '/arribos/axion',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Próximos arribos
      </h1>
      <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
        {botones.map(({ label, icon, path }, index) => (
          <button
            key={index}
            onClick={() => navigate(path)}
            className="aspect-square w-full flex flex-col items-center justify-center bg-[#FFC421] hover:bg-[#FFD95E] text-white rounded-xl shadow-lg transition duration-300"
          >
            {icon}
            <span className="text-lg font-semibold text-center">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
