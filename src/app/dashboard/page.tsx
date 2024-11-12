'use client';
import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Product } from '@/types/Product';
import axios from 'axios';
import DashboardEntregable from '@/components/Dashboard/DashboardEntregable';

const DashboardPage: React.FC = () => {
  const [productos, setProductos] = useState<Product[]>([]);
  const [filteredProductos, setFilteredProductos] = useState<Product[]>([]);
  const [existingIds, setExistingIds] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState({ type: '', value: '' });

  useEffect(() => {
    // Obtenemos los productos desde Google Sheets y los ids existentes en BigQuery
    const fetchProductosAndIds = async () => {
      try {
        const response = await axios.get('/api/sheetData');
        const existingIdsResponse = await axios.get('/api/getExistingIds');
        setExistingIds(existingIdsResponse.data);        
        setProductos(response.data);
        setFilteredProductos(response.data);

      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
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

  return (
    <div className="dashboard flex">
      <Sidebar onFilterChange={handleFilterChange} />
      <div className="dashboard-content flex-1 p-2 bg-gray-100">
        <DashboardEntregable productos={filteredProductos} existingIds={existingIds} />
      </div>
    </div>
  );
};

export default DashboardPage;