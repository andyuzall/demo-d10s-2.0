import React, { useState } from 'react';
import axios from 'axios';
import iconActivas from '../assets/icons/menu-campañas/activa.svg';
import iconActivasOptimo from '../assets/icons/menu-campañas/activas-optimo.svg';
import iconActivasExito from '../assets/icons/menu-campañas/activas-exito.svg';
import iconActivasCritica from '../assets/icons/menu-campañas/activas-criticas.svg';
import iconActivasDelicada from '../assets/icons/menu-campañas/activas-delicada.svg';
import iconSinActividad from '../assets/icons/menu-campañas/sinactividad.svg';
import iconFinalizadas from '../assets/icons/menu-campañas/finalizadas.svg';
import iconFinalizadasExito from '../assets/icons/menu-campañas/finalizadas-exito.svg';
import iconFueraDV from '../assets/icons/menu-campañas/fueradv360.svg';
import iconPausadas from '../assets/icons/menu-campañas/pausadas.svg';
import iconDestacadas from '../assets/icons/menu-campañas/destacadas.svg';

import Image from 'next/image';
import CampaignTooltip from './Tooltip/CampaignTooltip';


type SidebarProps = {
   onFilterChange: (filterType: string, filterValue: string) => void;
   onFilterTwoChange: (filterType: string, filterValue: string, filterTypeTwo: string, filterValueTwo: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange, onFilterTwoChange }) => {
   const [isEstadosOpen, setIsEstadosOpen] = useState(false);
   const [isFinalizadasOpen, setIsFinalizadasOpen] = useState(false);
   const [selectedButton, setSelectedButton] = useState('');
   //   const fetchDestacadas = async () => {
   //     try {
   //       const response = await axios.get('/api/getDestacadas');
   //       onFilterChange("destacadas", response.data);
   //     } catch (error) {
   //       console.error('Error al obtener datos de destacadas:', error);
   //     }
   //   };

   const fetchEspecialCampaigns = async () => {
      try {
         const res = await axios.get('/api/getEspecialCampaigns');
         onFilterChange("especial", res.data);
         console.log(res.data);
      } catch (error) {
         console.error('Error al obtener datos de campañas especiales:', error);
      }
   };

   const handleCampañasActivas = () => {
      setIsEstadosOpen(!isEstadosOpen);
      onFilterChange("estado", "Activa");
      setSelectedButton("Activa");
   }

   const handleCampañasSinActividad = () => {
      onFilterChange("estado", "Sin actividad");
      setSelectedButton("Sin actividad");
   }

   const handleCampañasPausadas = () => {
      onFilterChange("estado", "Pausada");
      setSelectedButton("Pausada");
   }

   const handleCampañasFinalizadas = () => {
      setIsFinalizadasOpen(!isFinalizadasOpen);
      onFilterChange("estado", "Finalizada");
      setSelectedButton("Finalizada");
   }

   const handleCampañasPorFueraDeDV = () => {
      onFilterChange("estado", "Por fuera de DV360")
      setSelectedButton("Por fuera de DV360");
   }

   return (
      <div className="bg-grisPrincipal bg-opacity-30 rounded-lg text-white w-12 h-[500px] p-1 pt-3 m-1  flex flex-col gap-2 items-center">
         {/* Sección de campañas Activas */}
         <CampaignTooltip
            iconSrc={iconActivas}
            tooltipText="Campañas activas"
            isSelected={selectedButton === 'Activa'}
            onClick={() => handleCampañasActivas()}
         />
         {isEstadosOpen && (
            <div className="mt-2 flex flex-col gap-1 items-center">

               <CampaignTooltip
                  iconSrc={iconActivasExito}
                  tooltipText="Campañas activas en estado excelente"
                  isSelected={selectedButton === 'Activa excelente'}
                  onClick={() => {
                     onFilterChange("estado", "Finalizada");
                     setSelectedButton("Activa excelente");
                  }}
               />

               <CampaignTooltip
                  iconSrc={iconActivasOptimo}
                  tooltipText="Campañas activas en estado optimo"
                  isSelected={selectedButton === 'Activa optimo'}
                  onClick={() => {
                     onFilterChange("estado", "Finalizada");
                     setSelectedButton("Activa optimo");
                  }}               />

               <CampaignTooltip
                  iconSrc={iconActivasDelicada}
                  tooltipText="Campañas activas en estado delicado"
                  isSelected={selectedButton === 'Activa delicado'}
                  onClick={() => {
                     onFilterChange("estado", "Finalizada");
                     setSelectedButton("Activa delicado");
                  }}
               />

               <CampaignTooltip
                  iconSrc={iconActivasCritica}
                  tooltipText="Campañas activas en estado critico"
                  isSelected={selectedButton === 'Activa critico'}
                  onClick={() => {
                     onFilterTwoChange("estadoCampana", "critico", "estado", "Activa");
                     setSelectedButton("Activa critico");
                  }}
               />

            </div>
         )}
         {/* Sección de campañas destacadas */}
         <CampaignTooltip
            iconSrc={iconDestacadas}
            tooltipText="Campañas destacadas"
            isSelected={selectedButton === 'Destacadas'}
            onClick={() => handleCampañasSinActividad()} //TODO: cambiar a campañas destacadas
         />
         {/* Sección de campañas sin actividad */}
         <CampaignTooltip
            iconSrc={iconSinActividad}
            tooltipText="Campañas sin actividad"
            isSelected={selectedButton === 'Sin actividad'}
            onClick={() => handleCampañasSinActividad()}
         />
         {/* Sección de campañas pausadas */}
         <CampaignTooltip
            iconSrc={iconPausadas}
            tooltipText="Campañas pausadas"
            isSelected={selectedButton === 'Pausada'}
            onClick={() => handleCampañasPausadas()}
         />
         {/* Sección de campañas Por fuera de DV */}
         <CampaignTooltip
            iconSrc={iconFueraDV}
            tooltipText="Campañas fuera de DV360"
            isSelected={selectedButton === 'Por fuera de DV360'}
            onClick={() => handleCampañasPorFueraDeDV()}
         />
         {/* Sección de campañas Finalizadas */}
         <CampaignTooltip
            iconSrc={iconFinalizadas}
            tooltipText="Campañas finalizadas"
            isSelected={selectedButton === 'Finalizada'}
            onClick={() => handleCampañasFinalizadas()}
         />
         {isFinalizadasOpen && (
            <div className="mt-2 flex flex-col gap-1 items-center">
               <CampaignTooltip
                  iconSrc={iconFinalizadasExito}
                  tooltipText="Campañas finalizadas exitosamente"
                  isSelected={selectedButton === 'Finalizada exitosa'}
                  onClick={() => {
                     onFilterChange("estado", "Finalizada");
                     setSelectedButton("Finalizada exitosa");
                  }}
               />
            </div>
         )}
         {/* Sección de Campañas Destacadas */}
         {/* <div className="">
        <button 
        onClick={fetchEspecialCampaigns}
        className="flex justify-between items-center text-left py-2 px-1 rounded-md hover:bg-gray-700">
           <span className="text-xs">Destacadas</span>
        </button>
     </div> */}
      </div>
   );
};


export default Sidebar;
