import { useState } from "react";
import BotonesDescarga from "../../components/BotonesDescarga";
import Loading from "../../components/Loading";
import FiltrosHoraOrden from "../../components/FiltrosHoraOrden";
import FiltroRamal from "../../components/FiltroRamal";
import ListaHorarios from "../../components/ListaHorarios";
import BotonesNavegacion from "../../components/BotonesNavegacion";
import { useHorariosApi } from "../../hooks/useHorariosApi";
import { dentroDelRango } from "../../utils/filtros";

export default function HorariosLaPlata() {
  const { horarios, loading, seleccionados, setSeleccionados } =
    useHorariosApi("https://back-api-bondi.vercel.app/api/segui");

  const [desde, setDesde] = useState("00:00");
  const [hasta, setHasta] = useState("23:59");
  const [orden, setOrden] = useState("hora");
  const [mostrarFiltro, setMostrarFiltro] = useState(true);

  const toggleNombre = (nombre) => {
    setSeleccionados((prev) =>
      prev.includes(nombre)
        ? prev.filter((n) => n !== nombre)
        : [...prev, nombre]
    );
  };

  const toggleFiltro = () => setMostrarFiltro((prev) => !prev);

  const horariosFiltrados = horarios
    .filter((h) => seleccionados.includes(h.Nombre) && dentroDelRango(h.Hora, desde, hasta))
    .sort((a, b) => {
      if (orden === "hora") return a.Hora.localeCompare(b.Hora);
      return a.Nombre.localeCompare(b.Nombre);
    });

  if (loading) return <Loading mensaje="Cargando horarios..." />;

  return (
    <div className="min-h-screen bg-[#FCE677]">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🚌 Horarios a Seguí
        </h1>

        <BotonesNavegacion rutaAtras="/programados" />

        <FiltrosHoraOrden
          desde={desde}
          hasta={hasta}
          orden={orden}
          setDesde={setDesde}
          setHasta={setHasta}
          setOrden={setOrden}
        />

        <FiltroRamal
          horarios={horarios}
          seleccionados={seleccionados}
          setSeleccionados={setSeleccionados}
          mostrarFiltro={mostrarFiltro}
          toggleFiltro={toggleFiltro}
          toggleNombre={toggleNombre}
        />

        <BotonesDescarga horarios={horariosFiltrados} nombre="Segui" />
        <ListaHorarios horarios={horariosFiltrados} />
      </div>
    </div>
  );
}
