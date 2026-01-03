import { useState, useEffect } from "react";
import Papa from "papaparse";
import { obtenerNombreCSV } from "../utils/fecha";

export function useHorarios(modoDia, prefijo) {
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    const sufijo = obtenerNombreCSV(modoDia);
    const nombreCSV = `${prefijo}${sufijo}`;

    Papa.parse(import.meta.env.BASE_URL + `csv/${nombreCSV}.csv`, {
      download: true,
      header: true,
      complete: (result) => {
        setHorarios(result.data);
        setSeleccionados([...new Set(result.data.map(h => h.Nombre))]);
        setLoading(false);
      },
    });
  }, [modoDia, prefijo]);

  return { horarios, loading, seleccionados, setSeleccionados };
}
