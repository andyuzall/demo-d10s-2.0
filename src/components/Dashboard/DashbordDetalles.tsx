import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import axios from 'axios';

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
  duracionCampana: string;
  idDV: string;
  accessDV: string;
}

interface DashboardDetallesProps {
  productos: Product[];
  existingIds: string[];
}

const DashboardDetalles: React.FC<DashboardDetallesProps> = ({ productos, existingIds }) => {
  const [likedIds, setLikedIds] = useState<string[]>(existingIds);

  const handleSaveToBigQuery = async (producto: Product) => {
    try {
      await axios.post('/api/saveToBigQuery', producto);
      console.log('Datos guardados en BigQuery');
      setLikedIds([...likedIds, producto.id]);
    } catch (error) {
      console.error('Error al guardar en BigQuery:', error);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center ">
    {/* Contenedor principal con fondo, bordes redondeados y espacio interno */}
    <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-7xl">
      {/* Títulos y encabezados superiores */}
      <div className="mb-2">
        <div className="flex items-center">
        <h1 className="text-l font-bold text-gray-600">Todas las Campañas</h1>
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
            <th className="px-2 py-2">ID DV360</th>
            <th className="px-2 py-2">Nombre</th>
            <th className="px-2 py-2">Categoría</th>
            <th className="px-2 py-2">Duración</th>
            <th className="px-2 py-2">Días restantes</th>
            <th className="px-2 py-2">Inversión</th>
            <th className="px-2 py-2 rounded-tr-lg rounded-br-lg">Destacada</th>
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
              <td className="px-2 py-2">
                <a href={producto.accessDV} target="_blank" rel="noreferrer" className='hover:text-cyan-700'>
                {producto.idDV}
                </a>
                </td>
              <td className="px-2 py-2">{producto.campana}</td>
              <td className="px-2 py-2">{producto.categoria}</td>
              <td className="px-2 py-2">{producto.duracionCampana}</td>
              <td className="px-2 py-2">{producto.diasRestantes}</td>
              <td className="px-2 py-2">${producto.inversionCampana}</td>
              <td className="px-2 py-2">
              <IconButton
                      onClick={() => handleSaveToBigQuery(producto)}
                      disabled={likedIds.includes(producto.id)}
                      color="error"
                    >
                      {likedIds.includes(producto.id) ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
              </td>
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

export default DashboardDetalles;
