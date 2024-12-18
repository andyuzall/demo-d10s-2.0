import React, { useEffect, useState } from 'react'
import DashboardDetalles from '../Dashboard/DashbordDetalles';
import { Product } from '@/types/Product';
import DashboardEntregable from '../Dashboard/DashboardEntregable';
import DashboardConsumo from '../Dashboard/DashboardConsumo';
import axios from 'axios';
import Sidebar from '../Sidebar';
import Loading from '../Loader/Loading';

function TopBar() {
    const [selectedButton, setSelectedButton] = useState('detalles');
    const [productos, setProductos] = useState<Product[]>([]);
    const [filteredProductos, setFilteredProductos] = useState<Product[]>([]);
    const [existingIds, setExistingIds] = useState<string[]>([]);
    const [activeFilter, setActiveFilter] = useState({ type: '', value: '' });
    const [loading, setLoading] = useState(true);

    const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
        setSelectedButton(buttonName);
    }

    // Obtenemos los productos desde Google Sheets y los ids existentes en BigQuery
    const fetchProductosAndIds = async () => {
      try {
        const response = await axios.get('/api/sheetData');
        const existingIdsResponse = await axios.get('/api/getEspecialExistingIds');
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
        if (activeFilter.type === 'estado') {
          const filtered = productos.filter(producto => 
            activeFilter.value === 'Todas' ? true : producto.estado === activeFilter.value
          );
          setFilteredProductos(filtered);
        } else if (activeFilter.type === 'destacadas') {
          const fetchDestacadas = async () => {
            try {
              const response = await axios.get('/api/getDestacadas');
              setFilteredProductos(response.data);
            } catch (error) {
              console.error('Error al obtener campañas destacadas:', error);
            }
          };
          fetchDestacadas();
        } else {
          setFilteredProductos(productos);
        }
      }, [activeFilter, productos]);
    
      const handleFilterChange = (filterType: string, filterValue: string) => {
        setActiveFilter({ type: filterType, value: filterValue });
      };

      if (loading) {
        return <Loading />
      }

      if (!productos.length) {
        return <div>Error al cargar los datos.</div>
      }

  return (
    <div className="flex px-4 m-2 container mx-auto max-w-full">
    <Sidebar onFilterChange={handleFilterChange} />
    <div className='flex-row justify-center items-center m-2 w-11/12'>
      <nav className='border rounded-xl flex justify-between items-center text-center w-full shadow-custom gap-4 pt-1 pb-1 pr-4 pl-4 mb-4'>
        <button
        onClick={() => handleButtonClick('detalles')}
        className={`
            border rounded-xl flex justify-center items-center text-center bg-blanco p-2 w-1/3
            ${selectedButton === 'detalles' ? 'bg-gradient-to-r to-[#BB86FC] from-[#6300DC] text-white cursor-default' : 'bg-blanco text-negro font-bold shadow-custom'}`}
            >
            <p>Detalles</p>
        </button>
        <button 
            onClick={() => handleButtonClick('objetivoEntregable')}
            className={`
                border rounded-xl flex justify-center items-center text-center w-1/3 bg-blanco p-2 
                ${selectedButton === 'objetivoEntregable' ? 'bg-gradient-to-r to-[#BB86FC] from-[#6300DC] text-white cursor-default' : 'bg-blanco text-negro font-bold shadow-custom'}`}
                >
            <p>Objetivo Entregable</p>
        </button>
        <button 
            onClick={() => handleButtonClick('objetivoConsumo')}
            className={`
                border rounded-xl flex justify-center items-center text-center w-1/3 bg-blanco p-2 
                ${selectedButton === 'objetivoConsumo' ? 'bg-gradient-to-r to-[#BB86FC] from-[#6300DC] text-white cursor-default' : 'bg-blanco text-negro font-bold shadow-custom'}`}
            >     
            <p>Objetivo Consumo</p>
        </button>
      </nav>
      <div>
        {selectedButton === 'detalles' && <DashboardDetalles productos={filteredProductos} existingIds={existingIds} />}
        {selectedButton === 'objetivoEntregable' && <DashboardEntregable productos={filteredProductos} existingIds={existingIds} />}
        {selectedButton === 'objetivoConsumo' && <DashboardConsumo productos={filteredProductos} existingIds={existingIds} />}
      </div>
    </div>
    </div>
  )
}

export default TopBar;
