import React, { useEffect, useState } from 'react'
import CardStatus from '../Cards/CardStatus';
import axios from 'axios';
import CardSinCalc from '../Cards/CardSinCalc';
import CardGrafic from '../Cards/CardGrafic';
import CardDestacadas from '../Cards/CardDestacadas';
import Loading from '../Loader/Loading';

interface HomeData {
  mesActual: number;
  mesAnterior: number;
  campanasActivas: number;
  campanasProxFinalizar: number;
  campanasRecientes: number;
  campanasCritico: number;
  campanasDelicado: number;
  campanasOptimo: number;
};


const DashboardHome: React.FC = () => {
  const [datosCampanas, setDatosCampanas] = useState<HomeData[]>([]);
  const [alarmCount, setAlarmCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // dia para las alarmas
  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - 20);

  // dias para campañas recientes
  const dateLimitRecente = new Date();
  dateLimitRecente.setDate(dateLimitRecente.getDate() - 4);

  const fetchAlarms = async () => {
    try {
      const res = await fetch('/api/sheetAlarms');
      const data = await res.json();
      setAlarmCount(data.count);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      setAlarmCount(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchDatosCampanas = async () => {
    try {
      const response = await axios.get('/api/sheetDataHome');
      setDatosCampanas(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatosCampanas();
    fetchAlarms();
  }, []);

  // Función para calcular el cambio porcentual
  const calcularCambio = (actual: number, anterior: number) =>
    anterior !== 0 ? ((actual - anterior) / anterior) * 100 : 0;

  if (loading) {
    return <Loading />;
  }

  if (!datosCampanas.length) {
    return <div>Error al cargar los datos.</div>;
  }

  return (
    <div className='container mx-auto px-4 m-4'>
      <div className='bg-grisPrincipal bg-opacity-50 rounded-lg border border-white shadow-custom'>
        {datosCampanas.map((campana, index) => (
          <div
            key={index}
            className='flex justify-center items-start gap-4 mx-2 px-4 py-8 rounded-lg'>
            {/* Primer bloque de datos */}
            <div className='flex flex-col gap-4'>
              <CardStatus
                titulo="Cant. de campañas"
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
                titulo="Próx. a finalizar"
                indicador={campana.campanasProxFinalizar}
                subtitulo="Entre hoy y el sábado"
              />
            </div>

            {/* Segundo bloque de datos */}
            <div className='flex flex-col gap-4'>
              <CardGrafic
                titulo="Campañas en Estado Crítico"
                indicador={campana.campanasCritico}
                resultado={calcularCambio(
                  campana.mesActual,
                  campana.mesAnterior
                )}
                subtitulo='% al mes anterior.'
                value={campana.campanasCritico}
                comparador={campana.mesActual}
              />
              <CardGrafic
                titulo="Campañas en Estado Delicado"
                indicador={campana.campanasDelicado}
                resultado={calcularCambio(
                  campana.mesActual,
                  campana.mesAnterior
                )}
                subtitulo='% al mes anterior.'
                value={campana.campanasDelicado}
                comparador={campana.mesActual}
              />
              <CardGrafic
                titulo="Campañas en Estado Óptimo"
                indicador={campana.campanasOptimo}
                resultado={calcularCambio(
                  campana.mesActual,
                  campana.mesAnterior
                )}
                subtitulo='% al mes anterior.'
                value={campana.campanasOptimo}
                comparador={campana.mesActual}
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
                  indicador={alarmCount ?? 0}
                  subtitulo={`Desde el ${dateLimit.toLocaleDateString()} hasta hoy`}
                />

                <CardSinCalc
                  titulo="Iniciadas recientemente"
                  indicador={campana.campanasRecientes}
                  subtitulo={`Entre el ${dateLimitRecente.toLocaleDateString()} hasta hoy`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;