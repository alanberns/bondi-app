import { useState } from "react";
import BotonesDescarga from "../../components/BotonesDescarga";
import Loading from "../../components/Loading";
import FiltrosHoraOrden from "../../components/FiltrosHoraOrden";
import FiltroRamal from "../../components/FiltroRamal";
import ListaHorarios from "../../components/ListaHorarios";
import BotonesNavegacion from "../../components/BotonesNavegacion";
import { useHorariosApi } from "../../hooks/useHorariosApi";
import { dentroDelRango } from "../../utils/filtros";
import CantidadServicios from "../../components/CantidadServicios";
import GraficoTiempoPromedio from "../../components/graficos/GraficoTiempoPromedio";
import GraficoServiciosPorHora from "../../components/graficos/GraficoServiciosPorHora";
import GraficoServiciosPorRamal from "../../components/graficos/GraficoServiciosPorRamal";
import GraficoDiferenciaMinutos from "../../components/graficos/GraficoDiferenciaMinutos";

export default function HorariosParada() {
  const [idParada, setIdParada] = useState("");
  const [idLinea, setidLinea] = useState("");
  const [url, setUrl] = useState(null);

  const { horarios, loading, seleccionados, setSeleccionados } =
    useHorariosApi(url);

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
    .filter(
      (h) =>
        seleccionados.includes(h.Nombre) &&
        dentroDelRango(h.Hora, desde, hasta)
    )
    .sort((a, b) => {
      if (orden === "hora") return a.Hora.localeCompare(b.Hora);
      return a.Nombre.localeCompare(b.Nombre);
    });

  const handleBuscar = () => {
    if (idParada.trim() !== "" && idLinea.trim() !== "") {
      setUrl(
        `https://back-api-bondi.vercel.app/api/parada?idParada=${idParada}&idLinea=${idLinea}`
      );
    }
  };

  if (loading) return <Loading mensaje="Cargando horarios..." />;

  return (
    <div className="min-h-screen bg-[#FCE677]">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🚌 Horarios desde {idParada || "..."} 
        </h1>
        <BotonesNavegacion rutaAtras={'/programados'}/>

        <div className="flex flex-col sm:flex-row gap-2 mb-6 w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Ingrese código de parada"
            value={idParada}
            onChange={(e) => setIdParada(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <select
            value={idLinea}
            onChange={(e) => setidLinea(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Seleccione línea</option>
            <option value="281">273</option>
            <option value="290">273 TOP</option>
            <option value="1028">338</option>
            <option value="282">418</option>
          </select>

          <button
            onClick={handleBuscar}
            className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center gap-2 transition duration-300"
          >
            Buscar
          </button>
        </div>

        {url && (
          <>
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

            <BotonesDescarga horarios={horariosFiltrados} nombre="PzaItalia" />
            <CantidadServicios servicios={horariosFiltrados} />
            <ListaHorarios horarios={horariosFiltrados} />
            <GraficoTiempoPromedio servicios={horariosFiltrados} />
            <GraficoServiciosPorHora servicios={horariosFiltrados} />
            <GraficoServiciosPorRamal servicios={horariosFiltrados} />
            <GraficoDiferenciaMinutos servicios={horariosFiltrados} />
          </>
        )}
      </div>
    </div>
  );
}
