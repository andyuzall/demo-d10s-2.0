import React, { useEffect, useState } from 'react'
import DashboardDetalles from '../Dashboard/DashbordDetalles';
import { Product } from '@/types/Product';
import DashboardEntregable from '../Dashboard/DashboardEntregable';
import DashboardConsumo from '../Dashboard/DashboardConsumo';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Loading from '../Loader/Loading';

type FilterValues = {
  [key: string]: string;
};

function TopBar() {
  const [selectedButton, setSelectedButton] = useState('detalles');
  const [productos, setProductos] = useState<Product[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Product[]>([]);
  const [existingIds, setExistingIds] = useState<string[]>([]);
  const [specialIds, setSpecialIds] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  }

  // Obtenemos los productos desde Google Sheets y los ids existentes en BigQuery
  const fetchProductosAndIds = async () => {
    try {
      const response = await axios.get('/api/sheetData');
      const existingIdsResponse = await axios.get('/api/getExistingIds');
      const specialIdsResponse = await axios.get('/api/getEspecialExistingIds');
      setSpecialIds(specialIdsResponse.data);
      setExistingIds(existingIdsResponse.data);
      setProductos(response.data);
      setFilteredProductos(response.data);

    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductosAndIds();
  }, []);

  useEffect(() => {
    let filtered = productos;

    // Aplica todos los filtros activos
    Object.entries(activeFilters).forEach(([filterType, filterValue]) => {
      if (filterValue) {
        filtered = filtered.filter(producto => {
          return producto[filterType as keyof Product] === filterValue;
        });
      }
    });

    setFilteredProductos(filtered);
  }, [activeFilters, productos]);

  const handleFilterChange = (filters: FilterValues) => {
    setActiveFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      console.log(newFilters);
      Object.entries(filters).forEach(([filterType, filterValue]) => {
        if (filterValue === "") {
          delete newFilters[filterType];
        } else {
          newFilters[filterType] = filterValue;
        }
      });

      return newFilters;
    });
  };

  const handleMultipleFilterChange = (filterType: string, filterValue: string) => {
    handleFilterChange({ [filterType]: filterValue });
  };

  // Función auxiliar para generar el título basado en los filtros activos
const generateTitle = (activeFilters: FilterValues): string => {
  const filterDescriptions = Object.entries(activeFilters)
    .map(([key, value]) => {
      switch (key) {
        case 'estado':
          return `Estado: ${value}`;
        case 'estadoCampana':
          return `Estado de campaña: ${value}`;
        case 'campanaEspecial':
          return `Campaña especial: ${value}`;
        default:
          return `${key}: ${value}`;
      }
    });

  return filterDescriptions.length > 0
    ? filterDescriptions.join(', ')
    : 'Todas las campañas';
};


  if (loading) {
    return <Loading />;
  }

  if (!productos.length) {
    return <Loading />;
  }

  return (
    <div className="flex px-4 m-2 container mx-auto max-w-full">
      <Sidebar onFilterChange={handleFilterChange} onMultipleFilterChange={handleMultipleFilterChange} />
      <div className='flex-row justify-center items-center m-2 w-11/12'>
        <nav className='border rounded-xl flex justify-between items-center text-center w-full shadow-custom gap-4 pt-1 pb-1 pr-4 pl-4 mb-4'>
          <button
            onClick={() => handleButtonClick('detalles')}
            className={`
            border rounded-xl flex justify-center items-center text-center bg-blanco p-2 w-1/3
            ${selectedButton === 'detalles' ? 'font-semibold bg-gradient-to-r to-[#BB86FC] from-[#6300DC] text-white cursor-default' : 'bg-blanco text-negro font-light shadow-custom'}`}
          >
            <p>Detalles</p>
          </button>
          <button
            onClick={() => handleButtonClick('objetivoEntregable')}
            className={`
                border rounded-xl flex justify-center items-center text-center w-1/3 bg-blanco p-2 
                ${selectedButton === 'objetivoEntregable' ? 'font-semibold bg-gradient-to-r to-[#BB86FC] from-[#6300DC] text-white cursor-default' : 'bg-blanco text-negro font-light shadow-custom'}`}
          >
            <p>Objetivo Entregable</p>
          </button>
          <button
            onClick={() => handleButtonClick('objetivoConsumo')}
            className={`
                border rounded-xl flex justify-center items-center text-center w-1/3 bg-blanco p-2 
                ${selectedButton === 'objetivoConsumo' ? 'font-semibold bg-gradient-to-r to-[#BB86FC] from-[#6300DC] text-white cursor-default' : 'bg-blanco text-negro font-light shadow-custom'}`}
          >
            <p>Objetivo Consumo</p>
          </button>
        </nav>
        <div>
          {selectedButton === 'detalles' && <DashboardDetalles productos={filteredProductos} existingIds={existingIds} especialIds={specialIds} title={generateTitle(activeFilters)} />}
          {selectedButton === 'objetivoEntregable' && <DashboardEntregable productos={filteredProductos} existingIds={existingIds} title={generateTitle(activeFilters)}  />}
          {selectedButton === 'objetivoConsumo' && <DashboardConsumo productos={filteredProductos} existingIds={existingIds} title={generateTitle(activeFilters)}  />}
        </div>
      </div>
    </div>
  )
}

export default TopBar;
