import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import destacadoFinalizada from '../../assets/icons/menu-campañas/destacados/destacado-finalizado.svg'
import destacadoFinalizadaClicked from '../../assets/icons/menu-campañas/destacados/destacado-finalizado-pressed.svg'
import destacadoActivo from '../../assets/icons/menu-campañas/destacados/destacado-activo.svg'
import destacadoActivoclicked from '../../assets/icons/menu-campañas/destacados/destacado-activo-pressed.svg'
import axios from 'axios';
import Image from 'next/image';
import SwitchButton from '../Switch/SwitchButton';

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
  estadoCampana: string;
}

interface DashboardDetallesProps {
  productos: Product[];
  existingIds: string[];
}

const DashboardDetalles: React.FC<DashboardDetallesProps> = ({ productos, existingIds }) => {
  const [likedIds, setLikedIds] = useState<string[]>(existingIds);

  const handleSaveEspecialToBigQuery = async (producto: Product) => {
    try {
      await axios.post('/api/saveEspecialToBigQuery', producto);
      console.log('Datos guardados en BigQuery');
      setLikedIds([...likedIds, producto.id]);
    } catch (error) {
      console.error('Error al guardar en BigQuery:', error);
    }
  };

  const handleSaveDestacadaToBigQuery = async (producto: Product) => {
    try {
      await axios.post('/api/saveToBigQuery', producto);
      console.log('Datos guardados en BigQuery');
      setLikedIds([...likedIds, producto.id]);
    } catch (error) {
      console.error('Error al guardar en BigQuery:', error);
    }
  };

  return (
    <div className=" flex items-center ">
      {/* Contenedor principal con fondo, bordes redondeados y espacio interno */}
      <div className="bg-grisPrincipal bg-opacity-30 border-white shadow-custom rounded-xl p-4 w-full">
        {/* Títulos y encabezados superiores */}
        <div className="mb-2">
          <div className="flex justify-between">
            <h1 className="text-l font-bold text-negro">
              <span className="text-l font-semibold text-negro">
                Todas las campañas
              </span>
            </h1>
            <SwitchButton />
          </div>
        </div>

        {/* Contenedor con la tabla */}
        <div className="overflow-x-auto">
          <div className="overflow-y-auto">
            <table className="min-w-full text-xs border-separate border-spacing-y-2 text-center">
              <thead className="bg-violetaSecundario text-blanco">
                <tr className="rounded-t-3xl">
                  <th className="px-2 py-2 rounded-tl-3xl rounded-bl-3xl">Destacar</th>
                  <th className="px-2 py-2">Estado</th>
                  <th className="px-2 py-2">ID</th>
                  <th className="px-2 py-2">Cliente</th>
                  <th className="px-2 py-2">Anunciante</th>
                  <th className="px-2 py-2">Form.</th>
                  <th className="px-2 py-2">Inicio</th>
                  <th className="px-2 py-2">Fin</th>
                  <th className="px-2 py-2">ID DV360</th>
                  <th className="w-[5px] text-start">Nombre</th>
                  <th className="px-2 py-2">Categoría</th>
                  <th className="px-2 py-2">Duración</th>
                  <th className="px-2 py-2">Días restantes</th>
                  <th className="px-2 py-2 rounded-tr-3xl rounded-br-3xl">Inversión</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {productos.map((producto, index) => (
                  <tr
                    key={index}
                    className={`border-b ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} rounded-lg border-white`}
                  >
                    <td className="px-2 py-2 rounded-tl-3xl rounded-bl-3xl border-l-2 border-t-2 border-b-2 border-violetaPrincipal w-4">
                      {producto.estado === 'Finalizada' ?
                        <IconButton
                          onClick={() => handleSaveDestacadaToBigQuery(producto)}
                          disabled={likedIds.includes(producto.id)}
                          color="error"
                        >
                          {likedIds.includes(producto.id) ?
                            <Image
                              src={destacadoFinalizadaClicked}
                              alt='Campaña destacada'
                              width={20}
                              height={20}
                            />
                            :
                            <Image
                              src={destacadoFinalizada}
                              alt='Destacar campaña finalizada'
                              width={20}
                              height={20}
                            />
                          }
                        </IconButton> :
                        ''}
                      {producto.estado === 'Activa' ||
                        producto.estado === 'Sin actividad' ||
                        producto.estado === 'BONIFICADA' ||
                        producto.estado === 'Por fuera de DV360' ?
                        <IconButton
                          onClick={() => handleSaveEspecialToBigQuery(producto)}
                          disabled={likedIds.includes(producto.id)}
                          color="error"
                        >
                          {likedIds.includes(producto.id) ?
                            <Image
                              src={destacadoActivoclicked}
                              alt='Campaña destacada'
                              width={20}
                              height={20}
                            />
                            :
                            <Image
                              src={destacadoActivo}
                              alt='Destacar campaña'
                              width={20}
                              height={20}
                            />
                          }
                        </IconButton> :
                        ''}
                    </td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.estado}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal w-4">{producto.id}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.cliente}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.anunciante}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.formato}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal w-4">{producto.fechaInicio}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal w-4">{producto.fechaFin}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal w-4">
                      <a href={producto.accessDV} target="_blank" rel="noreferrer" className='hover:text-cyan-700'>
                        {producto.idDV}
                      </a>
                    </td>
                    <td className="border-t-2 border-b-2 border-violetaPrincipal w-[5px] text-start">{producto.campana}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.categoria}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.duracionCampana}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.diasRestantes}</td>
                    <td className="px-2 py-2 rounded-tr-3xl rounded-br-3xl border-r-2 border-t-2 border-b-2 border-violetaPrincipal">${producto.inversionCampana}</td>
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
