import React, { useEffect, useState } from 'react'
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
import FaqTooltip from './Tooltip/FaqToolTip';
import FilterTooltip from './Tooltip/FiltersToolTip';
import { useRouter, useSearchParams } from 'next/navigation';

// Constantes para los nombres de los filtros
const FILTER_TYPES = {
   ESTADO: 'estado',
   ESTADO_CAMPANA: 'estadoCampana',
   CAMPANA_ESPECIAL: 'campanaEspecial',
   POR_FINALIZAR: 'campanaPorFinalizar'
};

type FilterValues = {
   [key: string]: string;
};

type SidebarProps = {
   onFilterChange: (filters: FilterValues) => void;
   onMultipleFilterChange: (filterType: string, filterValue: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange, onMultipleFilterChange }) => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const [isEstadosOpen, setIsEstadosOpen] = useState(false);
   const [isFinalizadasOpen, setIsFinalizadasOpen] = useState(false);
   const [selectedButton, setSelectedButton] = useState('');
   const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>({});

   // Efecto para sincronizar el estado inicial con los query params
   useEffect(() => {
      const estado = searchParams?.get(FILTER_TYPES.ESTADO);
      const estadoCampana = searchParams?.get(FILTER_TYPES.ESTADO_CAMPANA);
      const campanaEspecial = searchParams?.get(FILTER_TYPES.CAMPANA_ESPECIAL);
      const campanaPorFinalizar = searchParams?.get(FILTER_TYPES.POR_FINALIZAR);

      // Establecer el estado inicial basado en los query params
      if (estado || estadoCampana || campanaEspecial || campanaPorFinalizar) {
          const initialFilters: FilterValues = {};
          if (estado) initialFilters[FILTER_TYPES.ESTADO] = estado;
          if (estadoCampana) initialFilters[FILTER_TYPES.ESTADO_CAMPANA] = estadoCampana;
          if (campanaEspecial) initialFilters[FILTER_TYPES.CAMPANA_ESPECIAL] = campanaEspecial;
          if (campanaPorFinalizar) initialFilters[FILTER_TYPES.POR_FINALIZAR] = campanaPorFinalizar;
          
          handleFilterChange(initialFilters);
          
          // Establecer el botón seleccionado basado en los filtros
          if (estado === 'Activa') setSelectedButton('Activa');
          if (campanaEspecial === 'Campaña destacada') setSelectedButton('especial');
          if (estado === 'Activa' && estadoCampana === 'aceptable') setSelectedButton('Activa excelente');
          if (estado === 'Activa' && estadoCampana === 'optimo') setSelectedButton('Activa optimo');
          if (estado === 'Activa' && estadoCampana === 'delicado') setSelectedButton('Activa delicado');
          if (estado === 'Activa' && estadoCampana === 'critico') setSelectedButton('Activa critico');
          if (campanaPorFinalizar === 'Por finalizar') setSelectedButton('por finalizar');
      }
  }, [searchParams]);

  // Función auxiliar para actualizar la URL
  const updateURL = (filters: FilterValues) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
          if (value) params.set(key, value);
      });
      
      const newURL = params.toString() ? `?${params.toString()}` : '';
      router.push(`/dashboard${newURL}`, { scroll: false });
  };


   const handleMultipleFilter = (filterType: string, filterValue: string) => {
      setActiveFilters(prev => {
         const newFilters = {
             ...prev,
             [filterType]: filterValue
         };
         
         // Si el valor está vacío, eliminar el filtro
         if (!filterValue) {
             delete newFilters[filterType];
         }

         updateURL(newFilters);
         return newFilters;
     });
     onMultipleFilterChange(filterType, filterValue);
   };

   const handleIdentifierClick = () => {
      setSelectedButton(prev => prev === 'Identificador' ? '' : 'Identificador');
      if (selectedButton === 'Identificador') {
         handleMultipleFilter('id', '');
      }
   };

   const handleFilterChange = (filters: FilterValues) => {
      updateURL(filters);
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

   const handleCampañasPorFinalizar = () => {
      handleFilterChange({
         [FILTER_TYPES.ESTADO]: '',
         [FILTER_TYPES.ESTADO_CAMPANA]: '',
         [FILTER_TYPES.CAMPANA_ESPECIAL]: '',
         [FILTER_TYPES.POR_FINALIZAR]: 'Por finalizar'
      });
      setSelectedButton("por finalizar");
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
      <div className="bg-grisPrincipal bg-opacity-30 rounded-lg text-white w-12 h-[600px] p-1 pt-3 m-1 flex flex-col gap-2 items-center">
         <div className='flex-grow overflow-y-auto'>
            <div className='flex flex-col gap-2 items-center'>

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
                        }}
                     />

                     <CampaignTooltip
                        icon={<IconActivasOptimo className={`w-5 h-5 ${selectedButton === 'Activa optimo' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
                        tooltipText="Campañas activas en estado optimo"
                        isSelected={selectedButton === 'Activa optimo'}
                        onClick={() => {
                           handleCampañasActivasOptimas();
                        }} />

                     <CampaignTooltip
                        icon={<IconActivasDelicada className={`w-5 h-5 ${selectedButton === 'Activa delicado' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
                        tooltipText="Campañas activas en estado delicado"
                        isSelected={selectedButton === 'Activa delicado'}
                        onClick={() => {
                           handleCampañasActivasDelicadas();
                        }}
                     />

                     <CampaignTooltip
                        icon={<IconActivasCritica className={`w-5 h-5 ${selectedButton === 'Activa critico' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
                        tooltipText="Campañas activas en estado critico"
                        isSelected={selectedButton === 'Activa critico'}
                        onClick={() => {
                           handleCampañasActivasCritico();
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
               {/* Sección de campañas por finalizar */}
               <CampaignTooltip
                  icon={<IconDestacadas className={`w-5 h-5 items-center ${selectedButton === 'por finalizar' ? 'stroke-blanco' : 'text-violetaPrincipal'}`} />}
                  tooltipText="Campañas por finalizar"
                  isSelected={selectedButton === 'por finalizar'}
                  onClick={() => handleCampañasPorFinalizar()}
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
         </div>
         <div className='mt-auto'>
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
      </div>
   );
};


export default Sidebar;
