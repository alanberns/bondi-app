import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function GraficoServiciosPorHora({ servicios }) {
  const [dataChart, setDataChart] = useState(null);

  useEffect(() => {
    if (!servicios || servicios.length === 0) return;

    // Convertir Hora a número de hora (0-23)
    const serviciosProcesados = servicios.map(s => ({
      ...s,
      Hora: new Date(`1970-01-01T${s.Hora}`).getHours(),
    }));

    // Agrupar por ramal y hora
    const grupos = {};
    serviciosProcesados.forEach(s => {
      if (!grupos[s.Nombre]) grupos[s.Nombre] = {};
      grupos[s.Nombre][s.Hora] = (grupos[s.Nombre][s.Hora] || 0) + 1;
    });

    // Labels: todas las horas del día
    const labels = Array.from({ length: 24 }, (_, i) => i);

    // Colores para cada ramal
    const colores = [
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 99, 132, 0.8)",
      "rgba(255, 206, 86, 0.8)",
      "rgba(75, 192, 192, 0.8)",
      "rgba(153, 102, 255, 0.8)",
      "rgba(255, 159, 64, 0.8)",
    ];

    // Crear datasets
    const datasets = Object.keys(grupos).map((nombre, idx) => {
      const valores = labels.map(hora => grupos[nombre][hora] || 0);
      return {
        label: nombre,
        data: valores,
        borderColor: colores[idx % colores.length],
        backgroundColor: colores[idx % colores.length],
        fill: false,
        tension: 0.3,
      };
    });

    setDataChart({ labels, datasets });
  }, [servicios]);

  if (!dataChart) return <p>No hay datos para mostrar</p>;

  return (
    <div className="flex justify-center my-8">
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-4">
          Cantidad de servicios por hora y ramal
        </h2>
        <div style={{ minHeight: "400px", maxHeight: "500px" }}>
          <Line
            data={dataChart}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "right" },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.raw} servicios`,
                  },
                },
              },
              scales: {
                x: {
                  title: { display: true, text: "Hora del día" },
                  ticks: { stepSize: 1 },
                },
                y: {
                  title: { display: true, text: "Cantidad de servicios" },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
