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

interface DashboardConsumoProps {
  productos: Product[];
  existingIds: string[];
}

const DashboardConsumo: React.FC<DashboardConsumoProps> = ({ productos }) => {

  return (
    <div className="flex items-center ">
    {/* Contenedor principal con fondo, bordes redondeados y espacio interno */}
    <div className="bg-grisPrincipal bg-opacity-30 border-white shadow-custom rounded-xl p-4 w-full h-lvh">
      {/* Títulos y encabezados superiores */}
      <div className="mb-2">
        <div className="flex justify-between items-center">
        <h1 className="text-l font-bold text-negro">Todas las Campañas</h1>
        <div className='flex items-start gap-20'>
          <span className="text-l font-semibold text-negro">Inversión</span>
          <span className="text-l font-semibold text-negro">¿Cuánto nos falta?</span>
        </div>
        </div>
      </div>

      {/* Contenedor con la tabla */}
    <div className="overflow-x-auto h-4/5">
      <div className="overflow-y-auto">
      <table className="min-w-full text-xs border-separate border-spacing-y-2 text-center">
        <thead className="bg-violetaSecundario text-blanco">
          <tr className="rounded-t-3xl">
            <th className="px-2 py-2 rounded-tl-3xl rounded-bl-3xl">Estado</th>
            <th className="px-2 py-2">ID</th>
            <th className="px-2 py-2">Cliente</th>
            <th className="px-2 py-2">Anunciante</th>
            <th className="px-2 py-2">Form.</th>
            <th className="px-2 py-2">Inicio</th>
            <th className="px-2 py-2">Fin</th>
            <th className="px-2 py-2 border-l-2 border-violetaPrincipal">Re%ult</th>
            <th className="px-2 py-2">Acordado</th>
            <th className="px-2 py-2">Actual</th>
            <th className="px-2 py-2 border-l-2 border-violetaPrincipal">Falta</th>
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
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.anunciante}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.formato}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.fechaInicio}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.fechaFin}</td>
              <td className={`
                border-l-2 border-t-2 border-b-2 border-violetaPrincipal
                ${parseFloat(producto.porcentaje) >= 120 ? 'bg-purple bg-opacity-15 rounded-3xl border-purple border-opacity-100' : '' }
                ${parseFloat(producto.porcentaje) >= 100 ? 'bg-green bg-opacity-15 rounded-3xl border-green border-opacity-100' : '' }
                ${parseFloat(producto.porcentaje) >= 75 && parseFloat(producto.porcentaje) < 100  ? 'bg-yellow bg-opacity-15 rounded-3xl border-yellow border-opacity-100' : '' }
                ${parseFloat(producto.porcentaje) >= 40 && parseFloat(producto.porcentaje) < 75  ? 'bg-orange bg-opacity-15 rounded-3xl border-orange border-opacity-100' : '' }
                ${parseFloat(producto.porcentaje) < 40 ? ' bg-red bg-opacity-15 rounded-3xl border-red border-opacity-100' : '' }
                `}>
                {producto.porcentaje}%
              </td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.inversionCampana}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-r-2 border-violetaPrincipal">{producto.consumoCampana}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.diasRestantes}</td>
              <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.cuantoConsumoDeberiamosIr}</td>
              <td className="px-2 py-2 rounded-tr-3xl rounded-br-3xl border-r-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.porcentaje}%</td>
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

export default DashboardConsumo;