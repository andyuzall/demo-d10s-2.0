import React, { useState } from 'react';

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
   IconFinalizadasExito,
   IconFiltros,
   IconBuscador
} from './Tooltip/icons';
import CampaignTooltip from './Tooltip/CampaignTooltip';
import FilterTooltip from './Tooltip/FiltersToolTip';
import FaqTooltip from './Tooltip/FaqToolTip';


type SidebarProps = {
   onFilterChange: (filterType: string, filterValue: string) => void;
   onFilterTwoChange: (filterType: string, filterValue: string, filterTypeTwo: string, filterValueTwo: string) => void;
   onMultipleFilterChange: (filterType: string, filterValue: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange, onFilterTwoChange, onMultipleFilterChange }) => {
   const [isEstadosOpen, setIsEstadosOpen] = useState(false);
   const [isFinalizadasOpen, setIsFinalizadasOpen] = useState(false);
   const [selectedButton, setSelectedButton] = useState('');
   const [selectedCompra, setSelectedCompra] = useState<string>('');

   const handleFilterChange = (filterType: string, filterValue: string) => {
      setSelectedCompra(filterValue);
      onFilterChange(filterType, filterValue);
   };

   const handleMultipleFilter = (filterType: string, filterValue: string) => {
      setSelectedCompra(filterValue);
      onMultipleFilterChange(filterType, filterValue);
   };

   const handleCampañasDestacadas = () => {
      onFilterChange("campanaEspecial", "Campaña destacada");
      setSelectedButton("especial");
   }

   const handleCampañasActivas = () => {
      setIsEstadosOpen(!isEstadosOpen);
      onFilterTwoChange("estado", "Activa", "estadoCampana", "")
      setSelectedButton("Activa");
   }

   const handleCampañasActivasAceptables = () => {
      onFilterTwoChange("estado", "Activa", "estadoCampana", "aceptable")
   }

   const handleCampañasActivasOptimas = () => {
      onFilterTwoChange("estado", "Activa", "estadoCampana", "optimo")
   }

   const handleCampañasActivasDelicadas = () => {
      onFilterTwoChange("estado", "Activa", "estadoCampana", "delicado")
   }

   const handleCampañasActivasCritico = () => {
      onFilterTwoChange("estado", "Activa", "estadoCampana", "critico")
   }

   const handleCampañasSinActividad = () => {
      onFilterTwoChange("estado", "Sin actividad", "estadoCampana", "")
      setSelectedButton("Sin actividad");
   }

   const handleCampañasPausadas = () => {
      onFilterTwoChange("estado", "Pausada", "estadoCampana", "")
      setSelectedButton("Pausada");
   }

   const handleCampañasFinalizadas = () => {
      setIsFinalizadasOpen(!isFinalizadasOpen);
      onFilterTwoChange("estado", "Finalizada", "estadoCampana", "")
      setSelectedButton("Finalizada");
   }

   const handleCampañasPorFueraDeDV = () => {
      onFilterTwoChange("estado", "Por fuera de DV360", "estadoCampana", "")
      setSelectedButton("Por fuera de DV360");
   }

   return (
      <div className="bg-grisPrincipal bg-opacity-30 rounded-lg text-white w-12 h-[500px] p-1 pt-3 m-1 flex flex-col gap-2 items-center">
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
                     handleCampañasActivasAceptables();
                     setSelectedButton("Activa excelente");
                  }}
               />

               <CampaignTooltip
                  icon={<IconActivasOptimo className={`w-5 h-5 ${selectedButton === 'Activa optimo' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
                  tooltipText="Campañas activas en estado optimo"
                  isSelected={selectedButton === 'Activa optimo'}
                  onClick={() => {
                     handleCampañasActivasOptimas();
                     setSelectedButton("Activa optimo");
                  }} />

               <CampaignTooltip
                  icon={<IconActivasDelicada className={`w-5 h-5 ${selectedButton === 'Activa delicado' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
                  tooltipText="Campañas activas en estado delicado"
                  isSelected={selectedButton === 'Activa delicado'}
                  onClick={() => {
                     handleCampañasActivasDelicadas();
                     setSelectedButton("Activa delicado");
                  }}
               />

               <CampaignTooltip
                  icon={<IconActivasCritica className={`w-5 h-5 ${selectedButton === 'Activa critico' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
                  tooltipText="Campañas activas en estado critico"
                  isSelected={selectedButton === 'Activa critico'}
                  onClick={() => {
                     handleCampañasActivasCritico();
                     setSelectedButton("Activa critico");
                  }}
               />

            </div>
         )}
         {/* Sección de campañas destacadas */}
         <CampaignTooltip
            icon={<IconDestacadas className={`w-5 h-5 items-center ${selectedButton === 'especial' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
            tooltipText="Campañas destacadas"
            isSelected={selectedButton === 'especial'}
            onClick={() => handleCampañasDestacadas()}
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
                     setSelectedButton("Finalizada exitosa");
                  }}
               />
            </div>
         )}
         {/* Sección de filtros */}
         <FilterTooltip
            icon={<IconFiltros className={`w-5 h-5 ${selectedButton === 'Filtros' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
            tooltipText='Filtros'
            isSelected={selectedButton === 'Filtros'}
            onClick={() => { }}
            onMultipleFilterChange={handleMultipleFilter}
         />
         {/* Busqueda por identificador */}
         <FaqTooltip
            icon={<IconBuscador className={`w-5 h-5 ${selectedButton === 'Filtros' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
            tooltipText='Busqueda por identificador'
            isSelected={selectedButton === 'Identificador'}
            onClick={() => { }}
            onFilterChange={handleFilterChange}
         />
      </div>
   );
};


export default Sidebar;
