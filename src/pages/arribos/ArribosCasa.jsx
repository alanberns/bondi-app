import ObtenerArribos from "./ObtenerArribos";

export default function HorariosCasa() {

  return (
    <ObtenerArribos
      apiUrl="https://back-api-bondi.vercel.app/api/unionplatense?idParada=LP10485"
      titulo="🚌 Horarios desde casa"
    />
  );
}