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
    const [sortedAlarmas, setSortedAlarmas] = useState<Alarms[]>([]);
    const [sortColumn, setSortColumn] = useState<keyof Alarms | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [loading, setLoading] = useState(true);

    const fetchAlarms = async () => {
        try {
            const res = await axios.get('/api/sheetTotalAlarms');
            setDatosAlarmas(res.data.AlarmsUltimateMonth);
            setSortedAlarmas(res.data.AlarmsUltimateMonth);
        } catch (error) {
            console.error('Error al obtener datos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = (column: keyof Alarms) => {
        const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortDirection(direction);

        const sorted = [...datosAlarmas].sort((a, b) => {
            const aValue = a[column];
            const bValue = b[column];

            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });

        setSortedAlarmas(sorted);
    }


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
                                <th
                                    onClick={() => handleSort('cliente')}
                                    className="px-1 py-1 cursor-pointer hover:bg-gray-300"
                                >
                                    Cliente {sortColumn === 'cliente' && (sortDirection === 'asc' ? '⬆️' : '⬇️')}
                                </th>
                                <th
                                    onClick={() => handleSort('categoria')} 
                                    className="px-2 py-2 cursor-pointer hover:bg-gray-300"
                                    >
                                        Categoría {sortColumn === 'categoria' && (sortDirection === 'asc' ? '⬆️' : '⬇️')}
                                    </th>
                                <th className="px-1 py-1 rounded-tr-lg rounded-br-lg">Detalle</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAlarmas.length > 0 ? (
                                sortedAlarmas.map((alarma, index) => (
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