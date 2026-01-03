import { useNavigate } from "react-router-dom";

export default function BotonesNavegacion({ rutaAtras }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center gap-8 my-8">
      <button
        className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center gap-2 transition duration-300"
        onClick={() => navigate(rutaAtras)}
      >
        Atrás
      </button>
      <button
        className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center gap-2 transition duration-300"
        onClick={() => navigate("/")}
      >
        Inicio
      </button>
    </div>
  );
}
