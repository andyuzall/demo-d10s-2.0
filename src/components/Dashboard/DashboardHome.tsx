import React, { useEffect, useState } from 'react'
import CardStatus from '../Cards/CardStatus';
import axios from 'axios';

interface HomeData {
    mesActual: number;
    mesAnterior: number;
    campanasActivas: number;
    campanasProxFinalizar: number;
    campanasRecientes: number;
};

const DashboardHome: React.FC = () => {
  const [datosCampanas, setDatosCampanas] = useState<HomeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchDatosCampanas = async () => {
          try {
              const response = await axios.get('/api/sheetDataHome');
              setDatosCampanas(response.data);
              console.log(response.data)
          } catch (error) {
              console.error('Error al obtener datos:', error);
          } finally {
              setLoading(false);
          }
      };

      fetchDatosCampanas();
  }, []);

  // Función para calcular el cambio porcentual
  const calcularCambio = (actual: number, anterior: number) =>
      anterior !== 0 ? ((actual - anterior) / anterior) * 100 : 0;

  if (loading) {
      return <div>Cargando datos...</div>; // Muestra un loader mientras los datos se cargan
  }

  if (!datosCampanas.length) {
      return <div>Error al cargar los datos.</div>; // Manejo de errores si no hay datos
  }

  return (
      <>

        {datosCampanas.map((campana, index) => (
          <div className='flex flex-col gap-4'>
          <CardStatus
          titulo="Campañas de este mes"
          indicador={campana.mesActual} 
          resultado={calcularCambio(
            campana.mesActual,
            campana.mesAnterior
          )}
          />
          <CardStatus
          titulo="Campañas activas"
          indicador={campana.campanasActivas} 
          resultado={calcularCambio(
            campana.mesActual,
            campana.mesAnterior
          )}
          />
          <CardStatus
          titulo="Campañas próx. a finalizar"
          indicador={campana.campanasProxFinalizar} 
          resultado={calcularCambio(
            campana.mesActual,
            campana.mesAnterior
          )}
          />
          </div>
        ))}
      </>
  );
};

export default DashboardHome;