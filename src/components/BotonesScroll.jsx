import React, { useState, useEffect } from "react";

export default function BotonesScroll() {
  const [mostrarArriba, setMostrarArriba] = useState(false);
  const [mostrarAbajo, setMostrarAbajo] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;

      // Mostrar botón "Arriba" si el usuario bajó más de 200px
      setMostrarArriba(scrollTop > 200);

      // Mostrar botón "Abajo" solo si no está cerca del final
      setMostrarAbajo(scrollTop + windowHeight < scrollHeight - 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollArriba = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollAbajo = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {mostrarArriba && (
        <button
          onClick={scrollArriba}
          className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center gap-2 transition duration-300"
        >
          ⬆️ 
        </button>
      )}
      {mostrarAbajo && (
        <button
          onClick={scrollAbajo}
          className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center gap-2 transition duration-300"
        >
          ⬇️ 
        </button>
      )}
    </div>
  );
}
