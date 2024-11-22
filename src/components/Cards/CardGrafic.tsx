import React from 'react';
import { ArrowDownLeftIcon, ArrowUpIcon } from '@heroicons/react/16/solid';


type CardGraficValues = {
    titulo: string;
    indicador: number;
    resultado: number;
    subtitulo: string;
};

const CardGrafic: React.FC<CardGraficValues> = ({ titulo, indicador, resultado, subtitulo }) => {
    const isPositive = resultado > 0;

    
    return (
        <>
        <div className='flex p-4 justify-between items-center bg-slate-200 w-96 rounded-lg'>
            <div className="flex flex-col gap-4">
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
                    <span className={`ml-2 text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {resultado.toFixed(2)}{subtitulo}
                    </span>
                </div>
            </div>
            <div>
                insertar grafica
            </div>
        </div>
        </>
    );
};

export default CardGrafic;