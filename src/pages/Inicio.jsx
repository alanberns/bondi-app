import React from 'react';
import { FaClock, FaRegEdit, FaBus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
        <div className="flex flex-col items-center text-center gap-6">
          
          <h1 className="text-5xl font-extrabold text-gray-900">
            Cuando viene
          </h1>
          <h1 className="text-2xl font-bold text-gray-800">
            Horarios de colectivos
          </h1>

          <div className="grid grid-cols-2 gap-6 w-full max-w-3xl">
            {[
              {
                label: 'Próximos arribos',
                icon: <FaBus className="text-4xl mb-2 text-white" />,
                path: '/arribos',
              },
              {
                label: 'Arribos MOQSA',
                icon: <FaBus className="text-4xl mb-2 text-white" />,
                path: '/arribosmoqsa',
              },
              {
                label: 'Horarios registrados',
                icon: <FaRegEdit className="text-4xl mb-2 text-white" />,
                path: '/registrados',
              },
              {
                label: 'Horarios programados',
                icon: <FaClock className="text-4xl mb-2 text-white" />,
                path: '/programados',
              },
            ].map(({ label, icon, path }, index) => {
              // 🎨 Si el label es "Arribos MOQSA", usamos verde
              const baseClasses =
                "aspect-square flex flex-col items-center justify-center text-white rounded-xl shadow-lg transition duration-300 w-full";
              const colorClasses =
                label === "Arribos MOQSA"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-[#FFC421] hover:bg-[#FFD95E]";

              return (
                <button
                  key={index}
                  onClick={() => navigate(path)}
                  className={`${baseClasses} ${colorClasses}`}
                >
                  {icon}
                  <span className="text-lg font-semibold text-center">{label}</span>
                </button>
              );
            })}
          </div>
          <p className="text-sm text-gray-600 max-w-md">
            App de uso personal. Datos de <a href="https://cuandollega.smartmovepro.net/" className="underline text-blue-600">cuandollega.smartmovepro.net/</a>
          </p>
        </div>
      </div>

    </div>
  );

};
