export default function CantidadServicios({ servicios }) {
  return (
    <div className="text-center text-xl font-semibold text-gray-800 my-4">
      Servicios: {servicios.length}
    </div>
  );
}
