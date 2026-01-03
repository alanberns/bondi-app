// hooks/useHorariosApi.js
import { useState, useEffect } from "react";

export function useHorariosApi(endpoint) {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    async function fetchHorarios() {
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        setHorarios(data);
        setSeleccionados([...new Set(data.map(h => h.Nombre))]);
      } catch (error) {
        console.error("Error al obtener los horarios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHorarios();
  }, [endpoint]);

  return { horarios, loading, seleccionados, setSeleccionados };
}
