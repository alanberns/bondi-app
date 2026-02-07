import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import busIcon from "./busIcon";

function UnidadesMapa() {
  const [data, setData] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);
  const [mostrarLineas, setMostrarLineas] = useState(true);
  const [lineaAbierta, setLineaAbierta] = useState(null);
  const [paradasUnicas, setParadasUnicas] = useState([]);
  const [colectivos, setColectivos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostrarMapa, setMostrarMapa] = useState(false);
  const navigate = useNavigate();

  // 1. Cargar unidades.json: INFORMACION DE LINEAS, RAMALES Y PARADAS
  useEffect(() => {
    fetch("/unidades.json")
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  // 2. Agrupar ramales por línea
  const lineas = data.reduce((acc, rec) => {
    if (!acc[rec.linea]) acc[rec.linea] = [];
    acc[rec.linea].push(rec);
    return acc;
  }, {});

  // 3. Al seleccionar ramales, obtener paradas únicas -> EVITAR DUPLICADOS
  useEffect(() => {
    console.log("Ramales seleccionados:", seleccionados);
    if (seleccionados.length === 0) {
      setParadasUnicas([]);
      return;
    }
    // Si las paradas son strings, filtrar duplicados
    const todasParadas = seleccionados.flatMap(ramal => ramal.paradas || []);
    console.log("Todas las paradas de seleccionados:", todasParadas);
    const unicas = Array.from(new Set(todasParadas));
    console.log("Paradas únicas:", unicas);
    setParadasUnicas(unicas);
  }, [seleccionados]);

  // 4. Consultar API con todas las paradas únicas
  useEffect(() => {
    if (!mostrarMapa) return;
    if (paradasUnicas.length === 0) {
      setColectivos([]);
      return;
    }
    setLoading(true);
    const ids = paradasUnicas.join("&idParada=");
    const url = `https://back-api-bondi.vercel.app/api/unionplatense?idParada=${ids}`;
    console.log("Consulta API:", url);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("Respuesta API:", data);
        // 5. Filtrar por ramal -> QUITAR LOS QUE NO FUERON SELECCIONADOS
        // y eliminar coches duplicados por identificadorCoche
        const ramalDescs = seleccionados.map(r => r.ramal);
        const filtrados = (data.arribos || []).filter(a =>
          ramalDescs.some(desc => a.descripcionBandera?.includes(desc) || a.descripcionLinea?.includes(desc))
        );
        console.log("Colectivos filtrados:", filtrados);
        // Eliminar duplicados por identificadorCoche
        const unicos = Array.from(
          new Map(filtrados.map(c => [c.identificadorCoche, c])).values()
        );
        console.log("Colectivos únicos:", unicos);
        // 6. Consultar parada filtro y comparar colectivos
        // Obtener paradaFiltro de los ramales seleccionados
        const paradaFiltro = seleccionados.find(r => r.paradaFiltro)?.paradaFiltro;
        if (paradaFiltro) {
          console.log("ParadaFiltro:", paradaFiltro);
          const url = `https://back-api-bondi.vercel.app/api/unionplatense?idParada=${paradaFiltro}`;
          fetch(url)
            .then(res => res.json())
            .then(data => {
              const colectivosEnFiltro = (data.arribos || []).map(c => c.identificadorCoche);
              console.log("Colectivos en paradaFiltro:", colectivosEnFiltro);
              //aca vamos a matchear "colectivosEnFiltro" con "unicos" y los que coincidan les añadimos la propiedad "sinComienzo: true"
              const unicosConFiltro = unicos.map(c => ({
                ...c,
                sinComienzo: !colectivosEnFiltro.includes(c.identificadorCoche)
              }));
              setColectivos(unicosConFiltro);
            })
        } else {
          setColectivos(unicos);
        }
      })
      .finally(() => setLoading(false));
  }, [paradasUnicas, seleccionados, mostrarMapa]);


  const toggleSeleccion = (ramal) => {
    setSeleccionados(prev =>
      prev.includes(ramal) ? prev.filter(r => r !== ramal) : [...prev, ramal]
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Unidades en Mapa
      </h1>
      <div className="flex justify-center gap-2 my-2">
        <button
          className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300 mb-2"
          onClick={() => navigate('/')}
        >
          Inicio
        </button>
      </div>
      <div className="w-full max-w-md relative">
        <div className="sticky top-0 z-10 bg-[#F5F5F5] pt-2">
          <button
            onClick={() => setMostrarLineas(prev => !prev)}
            className="mx-auto flex items-center justify-between text-xl font-semibold text-gray-700 bg-white rounded-full px-6 py-3 hover:bg-gray-100 transition duration-300"
            style={{ minWidth: '220px' }}
          >
            {mostrarLineas ? 'Ocultar lista de líneas' : 'Mostrar lista de líneas'}
            <span className={`transform transition-transform duration-300 ${mostrarLineas ? 'rotate-180' : 'rotate-0'}`}>
              <FaChevronDown />
            </span>
          </button>
        </div>
        <div className="pt-4">
          {mostrarLineas && (
            <div className="space-y-4">
              {Object.entries(lineas).map(([linea, ramales]) => (
                <div key={linea} className="bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => setLineaAbierta(lineaAbierta === linea ? null : linea)}
                    className="w-full flex items-center justify-between bg-[#FFC421] hover:bg-[#FFD95E] text-white rounded-lg shadow-md transition duration-300 px-4 py-3"
                  >
                    <span className="text-base font-semibold">Línea {linea}</span>
                    <FaChevronDown
                      className={`transform transition-transform duration-300 ${lineaAbierta === linea ? "rotate-180" : "rotate-0"}`}
                    />
                  </button>
                  {lineaAbierta === linea && (
                    <div className="p-4 space-y-2">
                      {ramales.map((r, i) => (
                        <label
                          key={i}
                          className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-300"
                        >
                          <input
                            type="checkbox"
                            checked={seleccionados.includes(r)}
                            onChange={() => toggleSeleccion(r)}
                          />
                          <span className="text-gray-800">{r.descripcion}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Botón para mostrar unidades en el mapa */}
      <button
        onClick={() => setMostrarMapa(true)}
        disabled={seleccionados.length === 0}
        className={`mt-6 bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-md ${seleccionados.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Mostrar unidades en el mapa
      </button>

      {/* Mapa de colectivos */}
      {mostrarMapa && (
        <div className="w-full max-w-4xl mt-8">
          <MapContainer center={[-34.92, -57.95]} zoom={12} style={{ height: "60vh", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {colectivos.map((c, i) => (
              <Marker
                key={c.identificadorCoche || i}
                position={[parseFloat(c.latitud), parseFloat(c.longitud)]}
                icon={busIcon}
              >
                <Tooltip 
                  direction="top" 
                  offset={[0, -20]} 
                  permanent 
                  className="bus-tooltip"
                >
                  <div 
                    style={{ 
                      minWidth: 90, 
                      fontSize: 10, 
                      textAlign: 'center',
                      backgroundColor: '#fff',
                      padding: '4px',
                      borderRadius: '4px',
                      fontWeight: 'normal'
                    }}
                  >
                    <strong style={{
                      display: 'inline-block',
                      maxWidth: 180,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      verticalAlign: 'bottom'
                    }}
                    title={`${c.descripcionLinea} ${c.descripcionBandera}`}
                    >
                      {c.descripcionLinea.replace("LINEA", "")} {c.descripcionBandera}
                    </strong><br />
                    <span style={{ color: '#555' }}>
                      {c.desvioHorario.startsWith("-") ? `Atrasado: ${c.desvioHorario}` : `Adelantado: ${c.desvioHorario}`}
                    </span><br />
                    <span style={{ color: '#888' }}>
                      Coche: {c.identificadorCoche}
                    </span>
                    {c.sinComienzo && (
                      <>
                        <br />
                        <span style={{ color: '#FF0000', fontWeight: 'bold' }}>
                          Sin comienzo
                        </span>
                      </>
                    )}
                  </div>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
          {loading && <div className="text-center mt-4">Cargando unidades...</div>}
        </div>
      )}
    </div>
  );
}

export default UnidadesMapa;