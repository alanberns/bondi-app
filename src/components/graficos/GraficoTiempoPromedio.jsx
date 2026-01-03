import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function GraficoTiempoPromedio({ servicios }) {
  const [dataChart, setDataChart] = useState(null);

  useEffect(() => {
    if (!servicios || servicios.length === 0) return;

    const serviciosProcesados = servicios.map(s => ({
      ...s,
      Hora: new Date(`1970-01-01T${s.Hora}`)
    }));

    const grupos = {};
    serviciosProcesados.forEach(s => {
      if (!grupos[s.Nombre]) grupos[s.Nombre] = [];
      grupos[s.Nombre].push(s.Hora);
    });

    const promedios = {};
    Object.keys(grupos).forEach(nombre => {
      const horasOrdenadas = grupos[nombre].sort((a, b) => a - b);
      const diffs = [];
      for (let i = 1; i < horasOrdenadas.length; i++) {
        const diffMin = (horasOrdenadas[i] - horasOrdenadas[i - 1]) / 60000;
        diffs.push(diffMin);
      }
      promedios[nombre] = diffs.length > 0 ? diffs.reduce((a, b) => a + b, 0) / diffs.length : 0;
    });

    const ordenados = Object.entries(promedios).sort((a, b) => a[1] - b[1]);
    const labels = ordenados.map(([nombre]) => nombre);
    const valores = ordenados.map(([_, promedio]) => promedio);

    setDataChart({
      labels,
      datasets: [
        {
          label: "Tiempo promedio (minutos)",
          data: valores,
          backgroundColor: "skyblue",
        },
      ],
    });
  }, [servicios]);

  if (!dataChart) return <p>No hay datos para mostrar</p>;

  return (
    <div className="flex justify-center my-8">
      <div className="w-full max-w-3xl bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-4">
          Tiempo promedio de espera por ramal
        </h2>
        <div style={{ minHeight: "400px", maxHeight: "500px" }}>
          <Bar
            data={dataChart}
            options={{
              indexAxis: "y",
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.raw.toFixed(2)} minutos`,
                  },
                  bodyFont: { size: 12 },
                  titleFont: { size: 12 },
                },
              },
              scales: {
                x: {
                  title: { display: true, text: "Tiempo promedio (minutos)" },
                },
                y: {
                  title: { display: true, text: "Ramal" },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
