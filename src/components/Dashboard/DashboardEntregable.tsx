import React from 'react';

interface Product {
  estado: string;
  trader: string;
  id: string;
  sdc: string;
  cliente: string;
  anunciante: string;
  campana: string;
  categoria: string;
  formato: string;
  fechaInicio: string;
  fechaFin: string;
  diasRestantes: string;
  objetivoTangible: string;
  objetivoCuantificable: string;
  compraDeAyer: string;
  compraTotal: string;
  cuantoDeberiamosIr: string;
  cuantoFaltaObjetivo: string;
  porcentajeObjetivo: string;
  inversionCampana: string;
  consumoCampana: string;
  cuantoConsumoDeberiamosIr: string;
  consumoDeAyer: string;
  cuantoFaltaConsumo: string;
  porcentaje: string;
  queBuscamos: string;
  queCantidad: string;
}

interface DashboardEntregableProps {
  productos: Product[];
  existingIds: string[];
}

const DashboardEntregable: React.FC<DashboardEntregableProps> = ({ productos }) => {

  return (
    <div className="bg-gray-100 flex items-center ">
    {/* Contenedor principal con fondo, bordes redondeados y espacio interno */}
    <div className="bg-white rounded-xl shadow-lg p-4 w-full">
      {/* Títulos y encabezados superiores */}
      <div className="mb-2">
        <div className="flex justify-between">
        <h1 className="text-l font-bold text-gray-600">Todas las Campañas</h1>
          <span className="text-l font-semibold text-gray-600">Acordado</span>
          <span className="text-l font-semibold text-gray-600">Actualidad</span>
        </div>
      </div>

      {/* Contenedor con la tabla */}
    <div className="overflow-x-auto">
      <div className="overflow-y-auto">
      <table className="min-w-full text-xs border-separate border-spacing-y-2 text-center">
        <thead className="bg-gray-200 text-gray-600">
          <tr className="rounded-t-lg">
            <th className="px-2 py-2 rounded-tl-lg rounded-bl-lg">Estado</th>
            <th className="px-2 py-2">ID</th>
            <th className="px-2 py-2">Cliente</th>
            <th className="px-2 py-2">Anunciante</th>
            <th className="px-2 py-2">Form.</th>
            <th className="px-2 py-2">Inicio</th>
            <th className="px-2 py-2">Fin</th>
            <th className="px-2 py-2 border-l-4 border-gray-100">KPI</th>
            <th className="px-2 py-2">Unidad</th>
            <th className="px-2 py-2">Costo</th>
            <th className="px-2 py-2 border-l-4 border-gray-100">Re%ult</th>
            <th className="px-2 py-2">Uni.</th>
            <th className="px-2 py-2">Costo</th>
            <th className="px-2 py-2">Faltan</th>
            <th className="px-2 py-2">Ideal hoy</th>
            <th className="px-2 py-2 rounded-tr-lg rounded-br-lg">Proye%</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {productos.map((producto, index) => (
            <tr
              key={index}
              className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} rounded-lg border-white`}
            >
              <td className="px-2 py-2 rounded-tl-lg rounded-bl-lg">{producto.estado}</td>
              <td className="px-2 py-2">{producto.id}</td>
              <td className="px-2 py-2">{producto.cliente}</td>
              <td className="px-2 py-2">{producto.anunciante}</td>
              <td className="px-2 py-2">{producto.formato}</td>
              <td className="px-2 py-2">{producto.fechaInicio}</td>
              <td className="px-2 py-2">{producto.fechaFin}</td>
              <td className="px-2 py-2 border-l-4 border-gray-200">{producto.queBuscamos}</td>
              <td className="px-2 py-2">{producto.queCantidad}</td>
              <td className="px-2 py-2">{producto.objetivoTangible}</td>
              <td className="px-2 py-2 border-l-4 border-gray-200">{producto.porcentajeObjetivo}%</td>
              <td className="px-2 py-2">{producto.compraTotal}</td>
              <td className="px-2 py-2">{producto.objetivoCuantificable}</td>
              <td className="px-2 py-2">{producto.diasRestantes}</td>
              <td className="px-2 py-2">{producto.cuantoDeberiamosIr}</td>
              <td className="px-2 py-2 rounded-tr-lg rounded-br-lg">{producto.porcentajeObjetivo}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
    </div>
    </div>
  );
};

export default DashboardEntregable;