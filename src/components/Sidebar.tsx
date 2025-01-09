import React, { useState } from 'react';
import axios from 'axios';

import { 
   IconActivas, 
   IconActivasExito, 
   IconActivasOptimo, 
   IconActivasDelicada, 
   IconActivasCritica, 
   IconDestacadas, 
   IconSinActividad, 
   IconPausadas, 
   IconFueraDV, 
   IconFinalizadas, 
   IconFinalizadasExito } from './Tooltip/icons';
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
            icon={<IconActivas className={`w-5 h-5 ${selectedButton === 'Activa' ? 'stroke-blanco' : ''}`} />}
            tooltipText="Campañas activas"
            isSelected={selectedButton === 'Activa'}
            onClick={() => handleCampañasActivas()}
         />
         {isEstadosOpen && (
            <div className="mt-2 flex flex-col gap-1 items-center">
               <CampaignTooltip
                  icon={<IconActivasExito className={`w-5 h-5 ${selectedButton === 'Activa excelente' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
                  tooltipText="Campañas activas en estado excelente"
                  isSelected={selectedButton === 'Activa excelente'}
                  onClick={() => {
                     onFilterChange("estado", "Finalizada");
                     setSelectedButton("Activa excelente");
                  }}
               />

               <CampaignTooltip
                  icon={<IconActivasOptimo className={`w-5 h-5 ${selectedButton === 'Activa optimo' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
                  tooltipText="Campañas activas en estado optimo"
                  isSelected={selectedButton === 'Activa optimo'}
                  onClick={() => {
                     onFilterChange("estado", "Finalizada");
                     setSelectedButton("Activa optimo");
                  }}               />

               <CampaignTooltip
                  icon={<IconActivasDelicada className={`w-5 h-5 ${selectedButton === 'Activa delicado' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
                  tooltipText="Campañas activas en estado delicado"
                  isSelected={selectedButton === 'Activa delicado'}
                  onClick={() => {
                     onFilterChange("estado", "Finalizada");
                     setSelectedButton("Activa delicado");
                  }}
               />

               <CampaignTooltip
                  icon={<IconActivasCritica className={`w-5 h-5 ${selectedButton === 'Activa critico' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
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
            icon={<IconDestacadas className={`w-5 h-5 ${selectedButton === 'Destacadas' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
            tooltipText="Campañas destacadas"
            isSelected={selectedButton === 'Destacadas'}
            onClick={() => handleCampañasSinActividad()} //TODO: cambiar a campañas destacadas
         />
         {/* Sección de campañas sin actividad */}
         <CampaignTooltip
            icon={<IconSinActividad className={`w-5 h-5 ${selectedButton === 'Sin actividad' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
            tooltipText="Campañas sin actividad"
            isSelected={selectedButton === 'Sin actividad'}
            onClick={() => handleCampañasSinActividad()}
         />
         {/* Sección de campañas pausadas */}
         <CampaignTooltip
            icon={<IconPausadas className={`w-5 h-5 ${selectedButton === 'Pausada' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
            tooltipText="Campañas pausadas"
            isSelected={selectedButton === 'Pausada'}
            onClick={() => handleCampañasPausadas()}
         />
         {/* Sección de campañas Por fuera de DV */}
         <CampaignTooltip
            icon={<IconFueraDV className={`w-5 h-5 ${selectedButton === 'Por fuera de DV360' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
            tooltipText="Campañas fuera de DV360"
            isSelected={selectedButton === 'Por fuera de DV360'}
            onClick={() => handleCampañasPorFueraDeDV()}
         />
         {/* Sección de campañas Finalizadas */}
         <CampaignTooltip
            icon={<IconFinalizadas className={`w-5 h-5 ${selectedButton === 'Finalizada' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
            tooltipText="Campañas finalizadas"
            isSelected={selectedButton === 'Finalizada'}
            onClick={() => handleCampañasFinalizadas()}
         />
         {isFinalizadasOpen && (
            <div className="mt-2 flex flex-col gap-1 items-center">
               <CampaignTooltip
                  icon={<IconFinalizadasExito className={`w-5 h-5 ${selectedButton === 'Finalizada exitosa' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
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
