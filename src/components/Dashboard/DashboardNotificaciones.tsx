import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../Loader/Loading';
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FaRegArrowAltCircleDown } from "react-icons/fa";


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
        <div className='container mx-auto min-w-full px-4 m-2'>
            <div className='bg-grisPrincipal bg-opacity-30 shadow-custom rounded-lg p-6'>
                <h2 className='flex justify-center items-center text-4xl font-normal text-negro tracking-widest '>
                    ALARMAS
                </h2>
                <div className='overflow-y-auto max-h-[450px] p-4'>
                    <table className="w-full text-sm text-center border-separate border-spacing-y-2">
                        <thead className="bg-violetaSecundario text-blanco">
                            <tr className="rounded-t-xl">
                                <th className="pl-6 py-2 rounded-tl-xl rounded-bl-xl text-start">Tipo</th>
                                <th className="px-2 py-2">Detalle</th>
                                <th className="px-2 py-2">Valor</th>
                                <th className="px-2 py-2">Finaliza en</th>
                                <th className="px-2 py-2">Fecha</th>
                                <th
                                    onClick={() => handleSort('cliente')}
                                    className="px-2 py-2 cursor-pointer"
                                >
                                    Cliente 
                                    {sortColumn === 'cliente' && 
                                        (sortDirection === 'asc' ? '⬆️' : 
                                            '⬇️')}
                                </th>
                                <th
                                    onClick={() => handleSort('categoria')} 
                                    className="px-2 py-2 cursor-pointer"
                                >
                                    Categoría 
                                    {sortColumn === 'categoria' &&
                                     (sortDirection === 'asc' ? '⬆️' : 
                                        '⬇️')}
                                </th>
                                <th className="px-1 py-1 rounded-tr-xl rounded-br-xl">ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAlarmas.length > 0 ? (
                                sortedAlarmas.map((alarma, index) => (
                                    <tr key={index} className="shadow-custom rounded-xl">
                                        <td className="pl-6 py-2 rounded-tl-xl rounded-bl-xl border-l-2 border-t-2 border-b-2 border-violetaPrincipal text-start">{alarma.type}</td>
                                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{alarma.text}</td>
                                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{alarma.dateFormmated}</td>
                                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{alarma.dateFormmated}</td>
                                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{alarma.dateFormmated}</td>
                                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{alarma.cliente}</td>
                                        <td className="px-2 py-2 border-t-2 border-b-2 border-violetaPrincipal">{alarma.categoria}</td>
                                        <td className="px-2 py-2 rounded-tr-xl rounded-br-xl border-r-2 border-t-2 border-b-2 border-violetaPrincipal">{alarma.id}</td>
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