import ObtenerArribos from "./ObtenerArribos";

export default function ArribosLlegada() {
  return (
    <ObtenerArribos
      apiUrl="https://back-api-bondi.vercel.app/api/unionplatense?idParada=LP10481"
      titulo="🚌 Horarios llegada a casa"
    />
  );
}