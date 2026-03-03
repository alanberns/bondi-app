import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "chartjs-adapter-date-fns";

export default function GraficoDiferenciaMinutos({ servicios }) {
  const [dataChart, setDataChart] = useState(null);

  useEffect(() => {
    if (!servicios || servicios.length === 0) return;

    // Convertir Hora a objeto Date
    const procesados = servicios.map(s => {
      const horaStr = s.Hora.length === 5 ? s.Hora + ":00" : s.Hora;
      return {
        ...s,
        Hora: new Date(`1970-01-01T${horaStr}`),
      };
    });

    // Agrupar por ramal
    const grupos = {};
    procesados.forEach(s => {
      if (!grupos[s.Nombre]) grupos[s.Nombre] = [];
      grupos[s.Nombre].push(s);
    });

    // Colores para cada ramal
    const colores = [
      "rgba(54, 162, 235, 0.8)",
      "rgba(255, 99, 132, 0.8)",
      "rgba(255, 206, 86, 0.8)",
      "rgba(75, 192, 192, 0.8)",
      "rgba(153, 102, 255, 0.8)",
      "rgba(255, 159, 64, 0.8)",
      "rgba(100, 200, 100, 0.8)",
    ];

    // Calcular diferencias de minutos dentro de cada grupo
    const datasets = Object.keys(grupos).map((nombre, idx) => {
      const serviciosGrupo = grupos[nombre].sort((a, b) => a.Hora - b.Hora);

      const puntos = [];
      for (let i = 1; i < serviciosGrupo.length; i++) {
        const anterior = serviciosGrupo[i - 1].Hora;
        const actual = serviciosGrupo[i].Hora;
        const diferenciaMin = (actual - anterior) / (1000 * 60); // minutos
        puntos.push({
          x: actual,
          y: diferenciaMin,
        });
      }

      return {
        label: nombre,
        data: puntos,
        borderColor: colores[idx % colores.length],
        backgroundColor: colores[idx % colores.length],
        fill: false,
        tension: 0.3,
        pointRadius: 4,
      };
    });

    setDataChart({ datasets });
  }, [servicios]);

  if (!dataChart) return <p>No hay datos para mostrar</p>;

  return (
    <div className="flex justify-center my-8">
      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-center text-2xl font-bold mb-4">
          Comparación de Hora de Aparición con Diferencia de Minutos
        </h2>
        <div style={{ minHeight: "400px", maxHeight: "500px" }}>
          <Line
            key={dataChart.datasets.map(d => d.label).join(",")}
            data={dataChart}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { position: "right" },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.raw.y.toFixed(1)} min`, 
                  },
                },
              },
              scales: {
                x: {
                  type: "time",
                  time: {
                    unit: "minute",
                    parser: "HH:mm:ss",
                    tooltipFormat: "HH:mm:ss",
                    displayFormats: {
                      minute: "HH:mm",
                    },
                  },
                  title: { display: true, text: "Hora de aparición" },
                  ticks: {
                    source: "data",
                  },
                },
                y: {
                  title: { display: true, text: "Diferencia de minutos" },
                  beginAtZero: true,
                  reverse: true, 
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
