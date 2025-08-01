import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';

export default function HorariosCasaReg() {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [seleccionados, setSeleccionados] = useState([]);
    const [desde, setDesde] = useState("00:00");
    const [hasta, setHasta] = useState("23:59");
    const [orden, setOrden] = useState("hora");

    const navigate = useNavigate();


    useEffect(() => {
        async function fetchHorarios() {
            try {
                Papa.parse('csv/cementSAB.csv', {
                    download: true,
                    header: true,
                    complete: (result) => {
                      setHorarios(result.data);
                    },
                  });
                const nombresUnicos = [...new Set(horarios.map(h => h.nombre))];
                setSeleccionados(nombresUnicos);
            } catch (error) {
                console.error("Error al obtener los horarios:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchHorarios();
    }, []);
    const toggleNombre = (nombre) => {
        setSeleccionados((prev) =>
            prev.includes(nombre)
                ? prev.filter(n => n !== nombre)
                : [...prev, nombre]
        );
    };

    const dentroDelRango = (hora) => {
        return hora >= desde && hora <= hasta;
    };

    const horariosFiltrados = horarios
        .filter(h => seleccionados.includes(h.nombre) && dentroDelRango(h.hora))
        .sort((a, b) => {
            if (orden === "hora") return a.hora.localeCompare(b.hora);
            return a.nombre.localeCompare(b.nombre);
        });

    if (loading) return <p>Cargando horarios...</p>;
    return (
        <div className="min-h-screen bg-[#FCE677]">
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Horarios desde Casa 🏠</h1>

                <div className="flex justify-center gap-8 my-8">
                    <button
                        className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
                        onClick={() => navigate('/registrados')}
                    >
                        Atrás
                    </button>

                    <button
                        className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-300"
                        onClick={() => navigate('/')}
                    >
                        Inicio
                    </button>
                </div>
                
                {/* 🕒 Filtros de hora y orden */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Desde:</label>
                        <input
                            type="time"
                            value={desde}
                            onChange={(e) => setDesde(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Hasta:</label>
                        <input
                            type="time"
                            value={hasta}
                            onChange={(e) => setHasta(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Ordenar por:</label>
                        <select
                            value={orden}
                            onChange={(e) => setOrden(e.target.value)}
                            className="w-full px-3 py-2 border rounded-lg shadow-sm"
                        >
                            <option value="hora">Hora</option>
                            <option value="nombre">Ramal</option>
                        </select>
                    </div>
                </div>

                {/* ✅ Filtro por ramal */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Filtrar por ramal:</h2>
                    <div className="flex flex-wrap gap-4">
                        {[...new Set(horarios.map(h => h.nombre))].map((nombre, i) => (
                            <label key={i} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border border-gray-300">
                                <input
                                    type="checkbox"
                                    checked={seleccionados.includes(nombre)}
                                    onChange={() => toggleNombre(nombre)}
                                />
                                <span className="text-gray-800">{nombre}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* 🚌 Horarios filtrados */}
                {horariosFiltrados.length === 0 ? (
                    <div className="text-center text-gray-600 text-xl mt-12">
                        🚫 No hay horarios que coincidan con los filtros seleccionados.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {horariosFiltrados.map((item, index) => {
                            const tipo = item.nombre.startsWith("[G]") ? "green" : "red";
                            const bordeColor = tipo === "green" ? "border-l-green-500" : "border-l-red-500";

                            return (
                                <div
                                    key={index}
                                    className={`bg-white p-6 rounded-xl shadow-md border-l-8 ${bordeColor} transition duration-300`}
                                >
                                    <p className="text-xl font-semibold text-gray-800 mb-2">{item.nombre}</p>
                                    <p className="text-3xl font-bold text-gray-600">{item.hora}</p>
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
}
