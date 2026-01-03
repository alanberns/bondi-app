import React from "react";
import { jsPDF } from "jspdf";
import { autoTable } from "jspdf-autotable";

export default function BotonesDescarga({ horarios, nombre }) { 

  const normalizarHorarios = horarios.map(h => ({
    Servicio: h.nombre || h.Nombre || "Sin nombre",
    Horario: h.hora || h.Hora || "Sin hora"
  }));

  const descargarCSV = () => {
    const encabezado = "Servicio,Horario\n";
    const filas = normalizarHorarios
      .map(h => `${h.Servicio},${h.Horario}`)
      .join("\n");
    const csv = encabezado + filas;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "horarios_" + nombre + ".csv";
    link.click();
  };

  const descargarPDF = () => {
    const doc = new jsPDF();
    doc.text("Horarios de Servicio", 14, 20);
    autoTable(doc, {
      head: [["Servicio", "Horario"]],
      body: normalizarHorarios.map(h => [h.Servicio, h.Horario]),
      startY: 30,
    });
    doc.save("horarios_" + nombre + ".pdf");
  };

  return (
    <div className="flex justify-center gap-8 my-8">
      <button onClick={descargarCSV} className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center gap-2 transition duration-300">
        Descargar CSV
      </button>
      <button onClick={descargarPDF} className="bg-[#FFC421] hover:bg-[#FFD95E] text-white font-semibold py-2 px-6 rounded-lg shadow flex items-center gap-2 transition duration-300">
        Descargar PDF
      </button>
    </div>
  );
};