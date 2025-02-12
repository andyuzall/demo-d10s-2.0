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

// Constantes para los nombres de los filtros
const FILTER_TYPES = {
   ESTADO: 'estado',
   ESTADO_CAMPANA: 'estadoCampana',
   CAMPANA_ESPECIAL: 'campanaEspecial'
};

type FilterValues = {
   [key: string]: string;
};

type SidebarProps = {
   onFilterChange: (filters: FilterValues) => void;
   onMultipleFilterChange: (filterType: string, filterValue: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange, onMultipleFilterChange }) => {
   const [isEstadosOpen, setIsEstadosOpen] = useState(false);
   const [isFinalizadasOpen, setIsFinalizadasOpen] = useState(false);
   const [selectedButton, setSelectedButton] = useState('');
   const [activeFilters, setActiveFilters] = useState<{[key: string]: string}>({});

   const handleMultipleFilter = (filterType: string, filterValue: string) => {
      setActiveFilters(prev => ({
          ...prev,
          [filterType]: filterValue
      }));
      onMultipleFilterChange(filterType, filterValue);
  };

  const handleIdentifierClick = () => {
      setSelectedButton(prev => prev === 'Identificador' ? '' : 'Identificador');
      if (selectedButton === 'Identificador') {
          handleMultipleFilter('id', '');
      }
  };

   const handleFilterChange = (filters: FilterValues) => {
      onFilterChange(filters);
   };

   const handleCampañasDestacadas = () => {
      handleFilterChange({
         [FILTER_TYPES.ESTADO]: '',
         [FILTER_TYPES.ESTADO_CAMPANA]: '',
         [FILTER_TYPES.CAMPANA_ESPECIAL]: 'Campaña destacada'
      });
      setSelectedButton("especial");
   }

   const handleCampañasActivas = () => {
      setIsEstadosOpen(!isEstadosOpen);
      handleFilterChange({
         [FILTER_TYPES.ESTADO]: 'Activa',
         [FILTER_TYPES.ESTADO_CAMPANA]: '',
         [FILTER_TYPES.CAMPANA_ESPECIAL]: ''
      });
      setSelectedButton("Activa");
   }

   const handleCampañasActivasAceptables = () => {
      handleFilterChange({
         [FILTER_TYPES.ESTADO]: 'Activa',
         [FILTER_TYPES.ESTADO_CAMPANA]: 'aceptable',
         [FILTER_TYPES.CAMPANA_ESPECIAL]: ''
      });
   }

   const handleCampañasActivasOptimas = () => {
      handleFilterChange({
         [FILTER_TYPES.ESTADO]: 'Activa',
         [FILTER_TYPES.ESTADO_CAMPANA]: 'optimo',
         [FILTER_TYPES.CAMPANA_ESPECIAL]: ''
      });
   }

   const handleCampañasActivasDelicadas = () => {
      handleFilterChange({
         [FILTER_TYPES.ESTADO]: 'Activa',
         [FILTER_TYPES.ESTADO_CAMPANA]: 'delicado',
         [FILTER_TYPES.CAMPANA_ESPECIAL]: ''
      });
   }

   const handleCampañasActivasCritico = () => {
      handleFilterChange({
         [FILTER_TYPES.ESTADO]: 'Activa',
         [FILTER_TYPES.ESTADO_CAMPANA]: 'critico',
         [FILTER_TYPES.CAMPANA_ESPECIAL]: ''
      });
   }

   const handleCampañasSinActividad = () => {
      handleFilterChange({
         [FILTER_TYPES.ESTADO]: 'Sin actividad',
         [FILTER_TYPES.ESTADO_CAMPANA]: '',
         [FILTER_TYPES.CAMPANA_ESPECIAL]: ''
      });
      setSelectedButton("Sin actividad");
   }

   const handleCampañasPausadas = () => {
      handleFilterChange({
         [FILTER_TYPES.ESTADO]: 'Campaña Pausada',
         [FILTER_TYPES.ESTADO_CAMPANA]: '',
         [FILTER_TYPES.CAMPANA_ESPECIAL]: ''
      });
      setSelectedButton("Pausada");
   }

   const handleCampañasFinalizadas = () => {
      setIsFinalizadasOpen(!isFinalizadasOpen);
      handleFilterChange({
         [FILTER_TYPES.ESTADO]: 'Finalizada',
         [FILTER_TYPES.ESTADO_CAMPANA]: '',
         [FILTER_TYPES.CAMPANA_ESPECIAL]: ''
      });
      setSelectedButton("Finalizada");
   }

   const handleCampañasPorFueraDeDV = () => {
      handleFilterChange({
         [FILTER_TYPES.ESTADO]: 'Por fuera de DV360',
         [FILTER_TYPES.ESTADO_CAMPANA]: '',
         [FILTER_TYPES.CAMPANA_ESPECIAL]: ''
      });
      setSelectedButton("Por fuera de DV360");
   }


   return (
      <div className="bg-grisPrincipal bg-opacity-30 rounded-lg text-white w-12 h-[600px] p-1 pt-3 m-1 flex flex-col justify-between gap-2 items-center">
         <div className='flex flex-col justify-between gap-2 items-center'>
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
         </div>
         {/* Busqueda por identificador */}
         <FaqTooltip
            icon={<IconBuscador className={`w-5 h-5 ${selectedButton === 'Identificador' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
            tooltipText='Busqueda por identificador'
            isSelected={selectedButton === 'Identificador'}
            onClick={handleIdentifierClick}
            onMultipleFilterChange={handleMultipleFilter}
            activeFilter={activeFilters['id'] || ''}
         />
      </div>
   );
};


export default Sidebar;
