import React, { useState } from 'react';
import axios from 'axios';
import { IoMdCheckboxOutline } from "react-icons/io";
import iconActivas from '../assets/icons/menu-campañas/activa.svg';
import iconActivasOptimo from '../assets/icons/menu-campañas/activas-optimo.svg';
import iconActivasExito from '../assets/icons/menu-campañas/activas-exito.svg';
import iconActivasCritica from '../assets/icons/menu-campañas/activas-criticas.svg';
import iconActivasDelicada from '../assets/icons/menu-campañas/activas-delicada.svg';
import iconSinActividad from '../assets/icons/menu-campañas/sinactividad.svg';
import iconFinalizadas from '../assets/icons/menu-campañas/finalizadas.svg';
import iconFueraDV from '../assets/icons/menu-campañas/fueradv360.svg';
import Image from 'next/image';


type SidebarProps = {
   onFilterChange: (filterType: string, filterValue: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onFilterChange }) => {
  const [isEstadosOpen, setIsEstadosOpen] = useState(false);

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
  <div className="bg-gray-200 rounded-lg text-white w-11 p-1 pt-3 m-1  flex flex-col gap-2 items-center">
     {/* Sección de campañas Activas */}
     <div>
        <button
           onClick={() => handleCampañasActivas()}
           className="bg-white flex justify-between items-center py-2 px-2 rounded-md hover:bg-gray-700"
        >
         <Image
         src={iconActivas}
         alt="icono activas"
         width={20}  
         height={20}
         />
        </button>
        {isEstadosOpen && (
           <div className="mt-2 flex flex-col gap-1 items-center">
               <button 
              onClick={() => onFilterChange("estado", "Finalizada")}
              className="bg-gray-700 block py-1 px-1 rounded-md">
                 <IoMdCheckboxOutline />
              </button>
              <button 
              onClick={() => onFilterChange("estado", "Sin actividad")}
              className="bg-gray-700 block py-1 px-1 rounded-md">
                 <IoMdCheckboxOutline />
              </button>
              <button 
              onClick={() => onFilterChange("estado", "BONIFICADA")}
              className="bg-gray-700 block py-1 px-1 rounded-md">
                 <IoMdCheckboxOutline />
              </button>
              <button 
              onClick={fetchEspecialCampaigns}
              className="bg-gray-700 block py-1 px-1 rounded-md">
                 <IoMdCheckboxOutline />
              </button>
           </div>
        )}
     </div>
     {/* Sección de campañas sin actividad */}
     <div>
        <button
           onClick={() => handleCampañasSinActividad()}
           className="bg-white flex justify-between items-center py-2 px-2 rounded-md hover:bg-gray-700"
        >
         <Image
         src={iconSinActividad}
         alt="icono sin actividad"
         width={20}  
         height={20}
         />
        </button>
        </div>
    {/* Sección de campañas Finalizadas */}
     <div>
        <button
           onClick={() => handleCampañasFinalizadas()}
           className="bg-white flex justify-between items-center py-2 px-2 rounded-md hover:bg-gray-700"
        >
         <Image
         src={iconFinalizadas}
         alt="icono finalizadas"
         width={20}  
         height={20}
         />
        </button>
      </div>
     {/* Sección de campañas Por fuera de DV */}
     <div>
        <button
           onClick={() => handleCampañasPorFueraDeDV()}
           className="bg-white flex justify-between items-center py-2 px-2 rounded-md hover:bg-gray-700"
        >
           <Image
           src={iconFueraDV}
           alt="icono fuera de DV360"
           width={20}  
           height={20}
           />
        </button>
      </div>
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
