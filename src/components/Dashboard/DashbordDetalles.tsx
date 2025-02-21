'use client';
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
  queBuscamos: string;
  queCantidad: string;
  campanaEspecial: string;
  escenarioCampana: string;
  mercado: string;
}

interface DashboardDetallesProps {
  productos: Product[];
  existingIds: string[];
  especialIds: string[];
  title: string;
}

const DashboardDetalles: React.FC<DashboardDetallesProps> = ({ productos, existingIds, title, especialIds }) => {
  const [likedIds, setLikedIds] = useState<string[]>(existingIds);
  const [especialCampaigns, setEspecialCampaigns] = useState<string[]>(especialIds);
  const [showExtraTables, setShowExtraTables] = useState(false);

  const handleSaveEspecialSheet = async (producto: Product) => {
    try {
      await axios.post('/api/saveEspecialToSheet', { id: producto.id });
      setEspecialCampaigns([...especialCampaigns, producto.id]);
    } catch (error) {
      console.error('Error al guardar en GoogleSheet:', error);
    }
  };

  const handleSaveDestacadaToBigQuery = async (producto: Product) => {
    try {
      await axios.post('/api/saveToBigQuery', producto);
      setLikedIds([...likedIds, producto.id]);
      await axios.post('/api/saveExitosaToSheet', {
        id: producto.id,
        cliente: producto.cliente,
        anunciante: producto.anunciante,
        formato: producto.formato,
        trader: producto.trader,
        inversion: producto.inversionCampana,
        consumo: producto.consumoCampana,
        objetivoTangible: producto.objetivoTangible,
        objetivoCuantificable: producto.objetivoCuantificable,
        compraTotal: producto.compraTotal
      });
    } catch (error) {
      console.error('Error al guardar en BigQuery:', error);
    }
  };

  const calcularPorcentaje = (compraTotal: number, queCantidad: number): string => {
    const porcentaje = (compraTotal / queCantidad) * 100;
    return `${porcentaje.toFixed(2)}%`;
  };


  return (
    <div className=" flex items-center ">
      {/* Contenedor principal con fondo, bordes redondeados y espacio interno */}
      <div className="bg-grisPrincipal bg-opacity-30 border-white shadow-custom rounded-xl p-4 w-full h-lvh">
        {/* Títulos y encabezados superiores */}
        <div className="mb-2">
          <div className="flex justify-between">
            <h1 className="text-l font-bold text-negro">
              <span className="text-l font-semibold text-negro">
                {title}
              </span>
            </h1>
            <SwitchButton onChange={setShowExtraTables} />
          </div>
        </div>
        {/* Contenedor con la tabla sin menos info */}
        <div className="overflow-x-auto h-[650px]">
          <div className="overflow-y-auto max-h-full">
            <table className="min-w-full whitespace-nowrap text-xs border-separate border-spacing-y-2 text-center">
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
                  <th className="px-2 py-2">Categoría</th>
                  <th className="px-2 py-2">Duración</th>
                  <th className="px-2 py-2">Restante</th>
                  <th
                    className={`${showExtraTables ? "px-2 py-2 border-r-2" : "px-2 py-2 rounded-tr-3xl rounded-br-3xl"}`}>
                    Inversión
                  </th>
                  {showExtraTables && (
                    <>
                      <th className="px-2 py-2">KPI</th>
                      <th className="px-2 py-2">Unidad</th>
                      <th className="px-2 py-2">Costo</th>
                      <th className="px-2 py-2">%Entr</th>
                      <th className="px-2 py-2">Uni.</th>
                      <th className="px-2 py-2">Costo</th>
                      <th className="px-2 py-2">Faltan</th>
                      <th className="px-2 py-2">Ideal hoy</th>
                      <th className="px-2 py-2 border-r-2">Proye%</th>
                      <th className="px-2 py-2">Re%ult</th>
                      <th className="px-2 py-2">Acordado</th>
                      <th className="px-2 py-2">Actual</th>
                      <th className="px-2 py-2">Falta</th>
                      <th className="px-2 py-2">Ideal</th>
                      <th className="px-2 py-2 rounded-tr-3xl rounded-br-3xl">Proye%</th>
                    </>
                  )}
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
                          onClick={() => handleSaveEspecialSheet(producto)}
                          disabled={especialCampaigns.includes(producto.id)}
                          color="error"
                        >
                          {especialCampaigns.includes(producto.id) ? (
                            <Image
                              src={destacadoActivoclicked}
                              alt='Campaña destacada'
                              width={20}
                              height={20}
                            />
                          ) : (
                            <Image
                              src={destacadoActivo}
                              alt='Destacar campaña'
                              width={20}
                              height={20}
                            />
                          )}
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
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.categoria}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.duracionCampana}</td>
                    <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.diasRestantes}</td>
                    <td
                      className={`${showExtraTables ? "px-2 py-2 border-t-2 border-b-2 border-r-2 border-violetaPrincipal" : "px-2 py-2 rounded-tr-3xl rounded-br-3xl border-r-2 border-t-2 border-b-2 border-violetaPrincipal"}`}>
                      ${producto.inversionCampana}
                    </td>
                    {showExtraTables && (
                      <>
                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.queBuscamos}</td>
                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.queCantidad}</td>
                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.objetivoTangible}</td>
                        <td className="border-t-2 border-b-2 border-violetaPrincipal">
                          <p
                            className={`${parseFloat(producto.porcentajeObjetivo) >= 120 ? 'bg-purple bg-opacity-15 rounded-3xl border-purple border-2 p-1' : ''}
                          ${parseFloat(producto.porcentajeObjetivo) >= 100 ? 'bg-green bg-opacity-15 rounded-3xl border-green border-2 p-1' : ''}
                          ${parseFloat(producto.porcentajeObjetivo) >= 75 && parseFloat(producto.porcentajeObjetivo) < 100 ? 'bg-yellow bg-opacity-15 rounded-3xl border-yellow border-2 p-1' : ''}
                          ${parseFloat(producto.porcentajeObjetivo) >= 40 && parseFloat(producto.porcentajeObjetivo) < 75 ? 'bg-orange bg-opacity-15 rounded-3xl border-orange border-2 p-1' : ''}
                          ${parseFloat(producto.porcentajeObjetivo) < 40 ? ' bg-red bg-opacity-15 rounded-3xl border-red border-2 p-1' : ''}`}
                          >
                            {calcularPorcentaje(parseFloat(producto.compraTotal), parseFloat(producto.queCantidad))}                       
                          </p>
                        </td>
                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.compraTotal}</td>
                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.objetivoCuantificable}</td>
                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.diasRestantes}</td>
                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.cuantoDeberiamosIr}</td>

                        <td className="px-2 py-2 border-t-2 border-b-2 border-r-2 border-violetaPrincipal">
                          <p
                            className={`${parseFloat(producto.porcentajeObjetivo) >= 120 ? 'bg-purple bg-opacity-15 rounded-3xl border-purple border-2 p-1' : ''}
                          ${parseFloat(producto.porcentajeObjetivo) >= 100 ? 'bg-green bg-opacity-15 rounded-3xl border-green border-2 p-1' : ''}
                          ${parseFloat(producto.porcentajeObjetivo) >= 75 && parseFloat(producto.porcentajeObjetivo) < 100 ? 'bg-yellow bg-opacity-15 rounded-3xl border-yellow border-2 p-1' : ''}
                          ${parseFloat(producto.porcentajeObjetivo) >= 40 && parseFloat(producto.porcentajeObjetivo) < 75 ? 'bg-orange bg-opacity-15 rounded-3xl border-orange border-2 p-1' : ''}
                          ${parseFloat(producto.porcentajeObjetivo) < 40 ? ' bg-red bg-opacity-15 rounded-3xl border-red border-2 p-1' : ''}`}
                          >
                            {producto.porcentajeObjetivo}%
                          </p>
                        </td>

                        <td className={`
                          border-t-2 border-b-2 pl-2 border-violetaPrincipal`}>
                          <p
                            className={`
                              ${parseFloat(producto.porcentaje) >= 120 ? 'bg-purple bg-opacity-15 rounded-3xl border-purple border-2 p-1' : ''}
                              ${parseFloat(producto.porcentaje) >= 100 ? 'bg-green bg-opacity-15 rounded-3xl border-green border-2 p-1' : ''}
                              ${parseFloat(producto.porcentaje) >= 75 && parseFloat(producto.porcentaje) < 100 ? 'bg-yellow bg-opacity-15 rounded-3xl border-yellow border-2 p-1' : ''}
                              ${parseFloat(producto.porcentaje) >= 40 && parseFloat(producto.porcentaje) < 75 ? 'bg-orange bg-opacity-15 rounded-3xl border-orange border-2 p-1' : ''}
                              ${parseFloat(producto.porcentaje) < 40 ? ' bg-red bg-opacity-15 rounded-3xl border-red border-2 p-1' : ''}
                              `}
                          >
                            {producto.porcentaje}%
                          </p>
                        </td>
                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.inversionCampana}</td>
                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.consumoCampana}</td>
                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.diasRestantes}</td>
                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.cuantoConsumoDeberiamosIr}</td>
                        <td className="px-2 py-2 rounded-tr-3xl rounded-br-3xl border-r-2 border-t-2 border-b-2 border-violetaPrincipal">{producto.porcentaje}%</td>
                      </>
                    )}
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
