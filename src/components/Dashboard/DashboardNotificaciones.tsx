import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../Loader/Loading';


type Alarms = {
    date: string;
    id: string;
    type: string;
    text: string;
    trader: string;
    year: string;
    month: string;
    day: string;
    dateFormmated: string;
    cliente: string;
    categoria: number;
}

const DashboardNotificaciones: React.FC = () => {
    const [datosAlarmas, setDatosAlarmas] = useState<Alarms[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAlarms = async () => {
        try {
            const res = await axios.get('/api/sheetTotalAlarms');
            setDatosAlarmas(res.data.AlarmsUltimateMonth);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAlarms();
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (!datosAlarmas.length) {
        return <div>Error al cargar los datos.</div>;
    }

    return (
        <div className='flex justify-center py-5 min-h-[300px]'>
            <div className='w-full max-w-7xl bg-white shadow-2xl rounded-lg p-6'>
                <div className='overflow-y-auto max-h-[450px]'>
                    <table className="w-full text-sm text-center border-separate border-spacing-y-2">
                        <thead className="bg-gray-200 text-gray-600">
                            <tr className="rounded-t-lg">
                                <th className="px-1 py-1 rounded-tl-lg rounded-bl-lg">Tipo</th>
                                <th className="px-1 py-1">Fecha</th>
                                <th className="px-1 py-1">Cliente</th>
                                <th className="px-1 py-1">Categoría</th>
                                <th className="px-1 py-1 rounded-tr-lg rounded-br-lg">Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {datosAlarmas.length > 0 ? (
                                datosAlarmas.map((alarma, index) => (
                                    <tr key={index} className="bg-white hover:bg-gray-100 shadow-sm rounded-lg">
                                        <td className="px-2 py-2 rounded-tl-lg rounded-bl-lg">{alarma.type}</td>
                                        <td className="px-2 py-2">{alarma.dateFormmated}</td>
                                        <td className="px-2 py-2">{alarma.cliente}</td>
                                        <td className="px-2 py-2">{alarma.categoria}</td>
                                        <td className="px-2 py-2 rounded-tr-lg rounded-br-lg">{alarma.id}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4 text-gray-500">
                                        No se encontraron alarmas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardNotificaciones;