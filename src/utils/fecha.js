export function obtenerDiaActual() {
  const dia = new Date().getDay();
  if (dia === 0) return "domingo";
  if (dia === 6) return "sabado";
  return "habil";
}

export function obtenerNombreCSV(modoManual) {
  if (modoManual === "domingo") return "DOM";
  if (modoManual === "sabado") return "SAB";
  return ""; // habil
}
