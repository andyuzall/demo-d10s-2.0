import React, { useState } from 'react';
import axios from 'axios';

type SidebarProps = {
   onFilterChange: (filterType: string, filterValue: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const [isEstadosOpen, setIsEstadosOpen] = useState(false);

  const fetchDestacadas = async () => {
    try {
      const response = await axios.get('/api/getDestacadas');
      onFilterChange("destacadas", response.data);
    } catch (error) {
      console.error('Error al obtener datos de destacadas:', error);
    }
  };

  const handleCampañasActivas = () => {
   setIsEstadosOpen(!isEstadosOpen);
   onFilterChange("estado", "Activa");
  }

  const handleCampañasSinActividad = () => {
   onFilterChange("estado", "Sin actividad");
  }

  const handleCampañasFinalizadas = () => {
   onFilterChange("estado", "Finalizada");
  }

  const handleCampañasPorFueraDeDV = () => {
   onFilterChange("estado", "Por fuera de DV360")
  }

return (
  <div className="bg-gray-800 text-white w-60 min-h-screen p-1">
     {/* Sección de campañas Activas */}
     <div>
        <button
           onClick={() => handleCampañasActivas()}
           className="flex justify-between items-center text-left py-2 px-1 rounded-md hover:bg-gray-700"
        >
           <span className='text-xs'>Activas</span>
           <span className="text-xs">{isEstadosOpen ? '-' : '+'}</span>
        </button>
        {isEstadosOpen && (
           <div className="mt-2">
               <button 
              onClick={() => onFilterChange("estado", "Finalizada")}
              className="block py-1 px-1 text-xs rounded-md hover:bg-gray-700 w-full text-left">
                 Finalizada
              </button>
              <button 
              onClick={() => onFilterChange("estado", "Sin actividad")}
              className="block py-1 px-1 text-xs rounded-md hover:bg-gray-700 w-full text-left">
                 Sin actividad
              </button>
              <button 
              onClick={() => onFilterChange("estado", "BONIFICADA")}
              className="block py-1 px-1 text-xs rounded-md hover:bg-gray-700 w-full text-left">
                 Bonificadas
              </button>
           </div>
        )}
     </div>
     {/* Sección de campañas sin actividad */}
     <div>
        <button
           onClick={() => handleCampañasSinActividad()}
           className="flex justify-between items-center text-left py-2 px-1 rounded-md hover:bg-gray-700"
        >
           <span className='text-xs'>Sin Actividad</span>
        </button>
        </div>
    {/* Sección de campañas Finalizadas */}
     <div>
        <button
           onClick={() => handleCampañasFinalizadas()}
           className="flex justify-between items-center text-left py-2 px-1 rounded-md hover:bg-gray-700"
        >
           <span className='text-xs'>Finalizadas</span>
        </button>
      </div>
     {/* Sección de campañas Por fuera de DV */}
     <div>
        <button
           onClick={() => handleCampañasPorFueraDeDV()}
           className="flex justify-between items-center text-left py-2 px-1 rounded-md hover:bg-gray-700"
        >
           <span className='text-xs'>Fuera de DV</span>
        </button>
      </div>
     {/* Sección de Campañas Destacadas */}
     <div className="">
        <button 
        onClick={fetchDestacadas}
        className="flex justify-between items-center text-left py-2 px-1 rounded-md hover:bg-gray-700">
           <span className="text-xs">Destacadas</span>
        </button>
     </div>
  </div>
);
};


export default Sidebar;
