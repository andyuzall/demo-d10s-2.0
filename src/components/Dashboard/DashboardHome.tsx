import React, { useEffect, useState } from 'react'
import CardStatus from '../Cards/CardStatus';
import axios from 'axios';
import CardSinCalc from '../Cards/CardSinCalc';
import CardGrafic from '../Cards/CardGrafic';
import CardDestacadas from '../Cards/CardDestacadas';

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
          <>
          <div className='flex justify-start gap-2 mt-2 mx-2 p-2 bg-gray-100 w-3/4 rounded-lg'>
          
          {/* Primer bloque de datos */}
          <div className='flex flex-col gap-4'>
          <CardStatus
          titulo="Campañas de este mes"
          indicador={campana.mesActual} 
          resultado={calcularCambio(
            campana.mesActual,
            campana.mesAnterior
          )}
          subtitulo='% al mes anterior.'
          />
          <CardStatus
          titulo="Campañas activas"
          indicador={campana.campanasActivas} 
          resultado={calcularCambio(
            campana.mesActual,
            campana.mesAnterior
          )}
          subtitulo='% de las del mes.'
          />
          <CardSinCalc 
          titulo="Campañas próx. a finalizar"
          indicador={campana.campanasProxFinalizar}
          subtitulo="Entre hoy y el sábado"
          />
          </div>

          {/* Segundo bloque de datos */} 
          <div className='flex flex-col gap-4'>
          <CardGrafic 
          titulo="Campañas en Estado Crítico"
          indicador={campana.mesActual} 
          resultado={calcularCambio(
            campana.mesActual,
            campana.mesAnterior
          )}
          subtitulo='% al mes anterior.'   
          />
          <CardGrafic 
          titulo="Campañas en Estado Delicado"
          indicador={campana.mesActual} 
          resultado={calcularCambio(
            campana.mesActual,
            campana.mesAnterior
          )}
          subtitulo='% al mes anterior.'   
          />
          <CardGrafic 
          titulo="Campañas en Estado Óptimo"
          indicador={campana.mesActual} 
          resultado={calcularCambio(
            campana.mesActual,
            campana.mesAnterior
          )}
          subtitulo='% al mes anterior.'   
          />
          </div>
          
          {/* Tercer bloque de datos */}  
          <div className='flex flex-col gap-4'>
          <CardDestacadas 
          titulo="Campañas destacadas"
          indicador={campana.mesActual} 
          resultado={calcularCambio(
            campana.mesActual,
            campana.mesAnterior
          )}
          subtitulo='% al mes anterior.' 
          />
          <div className='flex justify-between gap-4'>
          <CardSinCalc 
          titulo="Nuevas Alarmas"
          indicador={campana.campanasRecientes}
          subtitulo="2 de ellas son por Bajo Cumplimiento"
          />

          <CardSinCalc 
          titulo="Campañas iniciadas recientemente"
          indicador={campana.campanasRecientes}
          subtitulo="En los últimos 4 días"
          />
          </div>
          </div>
          </div>
          </>
        ))}
      </>
  );
};

export default DashboardHome;