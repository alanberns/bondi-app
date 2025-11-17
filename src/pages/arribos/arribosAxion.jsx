import ObtenerArribos from "./ObtenerArribos";

export default function ArribosAxion() {
  return (
    <ObtenerArribos
        apiUrl="https://back-api-bondi.vercel.app/api/unionplatense?idParada=LP10774"
        titulo="🚌 Horarios 419 y Belgrano a Villa Elisa"
    />
  );
}
