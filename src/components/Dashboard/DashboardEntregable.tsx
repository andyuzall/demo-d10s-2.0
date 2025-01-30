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
    <div className="flex items-center ">
    {/* Contenedor principal con fondo, bordes redondeados y espacio interno */}
    <div className="bg-grisPrincipal bg-opacity-30 border-white shadow-custom rounded-xl p-4 w-full h-lvh">
      {/* Títulos y encabezados superiores */}
      <div className="mb-2">
        <div className="flex justify-between">
        <h1 className="text-l font-bold text-negro">Todas las Campañas</h1>
          <span className="text-l font-semibold text-negro">Acordado</span>
          <span className="text-l font-semibold text-negro">Actualidad</span>
        </div>
      </div>

      {/* Contenedor con la tabla */}
    <div className="overflow-x-auto h-[650px]">
      <div className="overflow-y-auto">
      <table className="min-w-full text-xs border-separate border-spacing-y-2 text-center">
        <thead className="bg-violetaSecundario text-blanco">
          <tr className="rounded-t-3xl">
            <th className="px-2 py-2 rounded-tl-3xl rounded-bl-3xl">Estado</th>
            <th className="px-2 py-2">ID</th>
            <th className="px-2 py-2">Cliente</th>
            <th className="px-1 py-1">Anunciante</th>
            <th className="px-1 py-1">Form.</th>
            <th className="px-2 py-2">Inicio</th>
            <th className="px-2 py-2">Fin</th>
            <th className="px-2 py-2">KPI</th>
            <th className="px-2 py-2">Unidad</th>
            <th className="px-2 py-2">Costo</th>
            <th className="px-2 py-2">Re%ult</th>
            <th className="px-2 py-2">Uni.</th>
            <th className="px-2 py-2">Costo</th>
            <th className="px-2 py-2">Faltan</th>
            <th className="px-2 py-2">Ideal hoy</th>
            <th className="px-2 py-2 rounded-tr-3xl rounded-br-3xl">Proye%</th>
          </tr>
        </thead>
        <tbody className="text-gray-800">
          {productos.map((producto, index) => (
            <tr
              key={index}
              className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} rounded-lg border-white`}
            >
              <td className="px-2 py-2 rounded-tl-3xl rounded-bl-3xl border-l-2 border-t-2 border-b-2 border-violetaPrincipal w-4">{producto.estado}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.id}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.cliente}</td>
              <td className="border-t-2 border-b-2 border-violetaPrincipal">{producto.anunciante}</td>
              <td className="px-1 py-1 border-t-2 border-b-2 border-violetaPrincipal">{producto.formato}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.fechaInicio}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.fechaFin}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.queBuscamos}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.queCantidad}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.objetivoTangible}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.porcentajeObjetivo}%</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.compraTotal}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.objetivoCuantificable}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.diasRestantes}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.cuantoDeberiamosIr}</td>
              <td className="px-2 py-2 rounded-tr-3xl rounded-br-3xl border-r-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.porcentajeObjetivo}%</td>
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