import ObtenerArribos from "./ObtenerArribos";

export default function ArribosLaPlata() {

  return (
    <ObtenerArribos
      apiUrl="https://back-api-bondi.vercel.app/api/unionplatense?idParada=LP2310"
      titulo="🚌 Horarios Plaza San Martín"
    />
  );
}