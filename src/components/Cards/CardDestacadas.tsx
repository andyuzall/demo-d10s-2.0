import React, { useEffect, useState } from 'react';
import axios from 'axios';

type CardDestacadasValues = {
    titulo: string;
    indicador: number;
    resultado: number;
    subtitulo: string;
};

type LatestDestacada = {
    id: string;
    cliente: string;
    anunciante: string;
    formato: string;
}

const CardDestacadas: React.FC<CardDestacadasValues> = ({
    titulo,
}) => {
    const [latestDestacadas, setLatestDestacadas] = useState<LatestDestacada[]>([]);
    const [countDestacadas, setCountDestacadas] = useState<number>(0);
    const fetchLatestDestacadas = async () => {
        try {
            const response = await axios.get('/api/getLatestDestacadas');
            setLatestDestacadas(response.data);
        } catch (error) {
            console.error('Error al obtener las ultimas destacadas:', error);
        }
    };

    const fetchCountDestacadas = async () => {
        try {
            const response = await axios.get('/api/getCountDestacadas');
            const total = response.data.total;
            setCountDestacadas(total);
        } catch (error) {
            console.error('Error al obtener el número de destacadas:', error);
        }
    };

    useEffect(() => {
        fetchLatestDestacadas();
        fetchCountDestacadas();
    }, []);


    return (
        <>
            <div className="relative flex flex-col gap-1 bg-blanco shadow-custom w-[500px] h-[330px] rounded-lg p-4 overflow-hidden">
                <svg
                    className="absolute top-0 left-0 w-full h-[75px]"
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="gradient" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#BB86FC" />
                            <stop offset="100%" stopColor="#6300DC" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M0,100 C150,50 350,150 500,100 L500,0 L0,0 Z"
                        fill="url(#gradient)"
                    />
                </svg>
                <h2 className='text-sm text-negro font-semibold relative'>{titulo}</h2>
                <div className="flex justify-between items-center mt-2 relative">
                    <h3 className='text-negro font-semibold text-4xl'>{countDestacadas || 0}</h3>
                    <h3 className='text-l font-semibold'>Top 5 campañas Destacadas</h3>
                </div>
                <table className="min-w-full text-xs border-separate border-spacing-y-1 text-center relative">
                    <thead className="bg-gradient-to-r from-[#BB86FC] to-[#6300DC] text-blanco">
                        <tr className="rounded-t-lg">
                            <th className="px-1 py-1 rounded-tl-lg rounded-bl-lg">ID</th>
                            <th className="px-1 py-1">Cliente</th>
                            <th className="px-1 py-1">Anunciante</th>
                            <th className="px-1 py-1 rounded-tr-lg rounded-br-lg">Form.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {latestDestacadas.length > 0 ? (
                            latestDestacadas.map((destacada, index) => (
                                <tr key={index} className="rounded-lg bg-white">
                                    <td className="px-2 py-2 rounded-tl-lg rounded-bl-lg border-l-2 border-t-2 border-b-2 border-violetaPrincipal">
                                        {destacada.id}
                                    </td>
                                    <td className="px-1 py-1 border-t-2 border-b-2 border-violetaPrincipal">{destacada.cliente}</td>
                                    <td className="px-1 py-1 border-t-2 border-b-2 border-violetaPrincipal">{destacada.anunciante}</td>
                                    <td className="px-1 py-1 rounded-tr-lg rounded-br-lg border-r-2 border-t-2 border-b-2 border-violetaPrincipal">
                                        {destacada.formato}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-500">
                                    No se encontraron campañas destacadas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CardDestacadas;