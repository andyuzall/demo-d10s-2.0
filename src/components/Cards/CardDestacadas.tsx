import React from 'react';
import { ArrowDownLeftIcon, ArrowUpIcon } from '@heroicons/react/16/solid';


type CardDestacadasValues = {
    titulo: string;
    indicador: number;
    resultado: number;
    subtitulo: string;
};

const CardDestacadas: React.FC<CardDestacadasValues> = ({ titulo, indicador, resultado, subtitulo }) => {
    const isPositive = resultado > 0;

    
    return (
        <>
            <div className="flex flex-col gap-2 bg-slate-200 w-full h-2/4 rounded-lg p-4">
                <h2 className='text-s font-semibold'>{titulo}</h2>
                <h3 className='text-black font-bold text-4xl'>{indicador}</h3>
                <div className="flex items-center">
                    {isPositive ? (
                        <ArrowUpIcon className="w-6 h-6 text-green-500" />
                    ) : resultado < 0 ? (
                        <ArrowDownLeftIcon className="w-6 h-6 text-red-500" />
                    ) : (
                        <span className="text-gray-400">Sin cambios</span>
                    )}
                    <div className='flex justify-between w-full'>
                    <span className={`ml-2 text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {resultado.toFixed(2)}{subtitulo}
                    </span>
                    <h3 className='text-xs font-semibold'>Top 5 campañas Destacadas.</h3>
                    </div>
                </div>
            <table className="min-w-full text-xs border-separate border-spacing-y-2 text-center">
                <thead className="bg-gray-200 text-gray-600">
                  <tr className="rounded-t-lg">
                    <th className="px-2 py-2 rounded-tl-lg rounded-bl-lg">ID</th>
                    <th className="px-2 py-2">Cliente</th>
                    <th className="px-2 py-2">Anunciante</th>
                    <th className="px-2 py-2 rounded-tr-lg rounded-br-lg">Form.</th>
                  </tr>
                </thead>
                <tbody>
                <td className="px-2 py-2 rounded-tl-lg rounded-bl-lg">Conectar Datos</td>
                <td className="px-2 py-2">Conectar Datos</td>
                <td className="px-2 py-2">Conectar Datos</td>
                <td className="px-2 py-2 rounded-tr-lg rounded-br-lg">Conectar Datos</td>
                </tbody>
                <tbody>
                <td className="px-2 py-2 rounded-tl-lg rounded-bl-lg">Conectar Datos</td>
                <td className="px-2 py-2">Conectar Datos</td>
                <td className="px-2 py-2">Conectar Datos</td>
                <td className="px-2 py-2 rounded-tr-lg rounded-br-lg">Conectar Datos</td>
                </tbody>               <tbody>
                <td className="px-2 py-2 rounded-tl-lg rounded-bl-lg">Conectar Datos</td>
                <td className="px-2 py-2">Conectar Datos</td>
                <td className="px-2 py-2">Conectar Datos</td>
                <td className="px-2 py-2 rounded-tr-lg rounded-br-lg">Conectar Datos</td>
                </tbody>               <tbody>
                <td className="px-2 py-2 rounded-tl-lg rounded-bl-lg">Conectar Datos</td>
                <td className="px-2 py-2">Conectar Datos</td>
                <td className="px-2 py-2">Conectar Datos</td>
                <td className="px-2 py-2 rounded-tr-lg rounded-br-lg">Conectar Datos</td>
                </tbody>               <tbody>
                <td className="px-2 py-2 rounded-tl-lg rounded-bl-lg">Conectar Datos</td>
                <td className="px-2 py-2">Conectar Datos</td>
                <td className="px-2 py-2">Conectar Datos</td>
                <td className="px-2 py-2 rounded-tr-lg rounded-br-lg">Conectar Datos</td>
                </tbody>
            </table>
            </div>
        </>
    );
};

export default CardDestacadas;