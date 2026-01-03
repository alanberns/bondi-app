// components/Loading.js
export default function Loading({ mensaje = "Cargando..." }) {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <p className="text-center text-gray-500 text-lg animate-pulse">
        {mensaje}
      </p>
    </div>
  );
}
