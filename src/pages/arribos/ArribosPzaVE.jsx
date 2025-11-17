import ObtenerArribos from "./ObtenerArribos";

export default function ArribosPzaVE() {
  return (
    <ObtenerArribos
      apiUrl="https://back-api-bondi.vercel.app/api/unionplatense?idParada=TALP%201608&idParada=LP10858"
      titulo="🚌 Horarios desde Plaza Villa Elisa"
    />
  );
}