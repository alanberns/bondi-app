import { useState } from "react";
import BotonesDescarga from "../../components/BotonesDescarga";
import Loading from "../../components/Loading";
import SelectorDia from "../../components/SelectorDia";
import FiltrosHoraOrden from "../../components/FiltrosHoraOrden";
import FiltroRamal from "../../components/FiltroRamal";
import ListaHorarios from "../../components/ListaHorarios";
import BotonesNavegacion from "../../components/BotonesNavegacion";
import { useHorarios } from "../../hooks/useHorarios";
import { dentroDelRango } from "../../utils/filtros";
import { obtenerDiaActual } from "../../utils/fecha";
import GraficoTiempoPromedio from "../../components/graficos/GraficoTiempoPromedio";
import CantidadServicios from "../../components/CantidadServicios";
        

export default function HorariosPzaVEReg() {
  const [modoDia, setModoDia] = useState(obtenerDiaActual());
  const { horarios, loading, seleccionados, setSeleccionados } = useHorarios(modoDia, "pzave");

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
          🚌 Horarios desde Plaza Villa Elisa
        </h1>

        <BotonesNavegacion rutaAtras="/registrados" />

        <SelectorDia modoDia={modoDia} setModoDia={setModoDia} />
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

        <BotonesDescarga horarios={horariosFiltrados} nombre="PzaVillaElisa" />
        <CantidadServicios servicios={horariosFiltrados}></CantidadServicios>
        <ListaHorarios horarios={horariosFiltrados} />
        <GraficoTiempoPromedio servicios={horariosFiltrados} />
      </div>
    </div>
  );
}
