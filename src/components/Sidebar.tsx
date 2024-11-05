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
return (
  <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
     <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
     {/* Sección de Estados de campaña */}
     <div>
        <button
           onClick={() => setIsEstadosOpen(!isEstadosOpen)}
           className="flex justify-between items-center w-full text-left py-2 px-3 rounded-md hover:bg-gray-700"
        >
           <span>Estados</span>
           <span className="text-sm">{isEstadosOpen ? '-' : '+'}</span>
        </button>
        {isEstadosOpen && (
           <div className="ml-4 mt-2">
               <button 
              onClick={() => onFilterChange("estado", "Finalizada")}
              className="block py-1 px-3 text-sm rounded-md hover:bg-gray-700 w-full text-left">
                 Finalizada
              </button>
              <button 
              onClick={() => onFilterChange("estado", "Activa")}
              className="block py-1 px-3 text-sm rounded-md hover:bg-gray-700 w-full text-left">
                 Activas
              </button>
              <button 
              onClick={() => onFilterChange("estado", "Sin actividad")}
              className="block py-1 px-3 text-sm rounded-md hover:bg-gray-700 w-full text-left">
                 Sin actividad
              </button>
              <button 
              onClick={() => onFilterChange("estado", "BONIFICADA")}
              className="block py-1 px-3 text-sm rounded-md hover:bg-gray-700 w-full text-left">
                 Bonificadas
              </button>
              <button className="block py-1 px-3 text-sm rounded-md hover:bg-gray-700 w-full text-left">
                 Todas
              </button>
           </div>
        )}
     </div>
     {/* Sección de Campañas Destacadas */}
     <div className="mt-4">
        <button 
        onClick={fetchDestacadas}
        className="flex justify-between items-center w-full text-left py-2 px-3 rounded-md hover:bg-gray-700">
           <span>Destacadas</span>
        </button>
     </div>
  </div>
);
};


export default Sidebar;
