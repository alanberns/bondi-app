import ObtenerArribos from "./ObtenerArribos";

export default function ArribosPzaItalia() {
  return (
    <ObtenerArribos
      apiUrl="https://back-api-bondi.vercel.app/api/unionplatense?idParada=TALP%201009&idParada=LP5005"
      titulo="🚌 Horarios plaza Italia"
    />
  );
}