import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function GraficoServiciosPorRamal({ servicios }) {
  const [dataChart, setDataChart] = useState(null);

  useEffect(() => {
    if (!servicios || servicios.length === 0) return;

    // Contar cantidad de servicios por ramal (Nombre)
    const conteo = {};
    servicios.forEach(s => {
      conteo[s.Nombre] = (conteo[s.Nombre] || 0) + 1;
    });

    // Ordenar por cantidad descendente
    const ordenados = Object.entries(conteo).sort((a, b) => b[1] - a[1]);
    const labels = ordenados.map(([nombre]) => nombre);
    const valores = ordenados.map(([_, cantidad]) => cantidad);

    setDataChart({
      labels,
      datasets: [
        {
          label: "Cantidad de servicios",
          data: valores,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [servicios]);

  if (!dataChart) return <p>No hay datos para mostrar</p>;

  return (
    <div className="flex justify-center my-8">
      <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-4">
          Servicios por ramal
        </h2>
        <div style={{ minHeight: "400px", maxHeight: "500px" }}>
          <Bar
            data={dataChart}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.raw} servicios`,
                  },
                },
              },
              scales: {
                x: {
                  title: { display: true, text: "Ramal" },
                  ticks: { autoSkip: false, maxRotation: 45, minRotation: 30 },
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
