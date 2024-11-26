import React from 'react';
import { ArrowDownLeftIcon, ArrowUpIcon } from '@heroicons/react/16/solid';
import GaugeChart from '../Graphic/Gauge';


type CardGraficValues = {
    titulo: string;
    indicador: number;
    resultado: number;
    subtitulo: string;
    value: number;
    comparador: number;
};

const CardGrafic: React.FC<CardGraficValues> = ({ titulo, indicador, resultado, subtitulo, value, comparador }) => {
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
                    <span className={`ml-2 text-xs font-bold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {resultado.toFixed(0)}{subtitulo}
                    </span>
                </div>
            </div>
            <div>
               <GaugeChart value={value} comparisonValue={comparador} />
            </div>
        </div>
        </>
    );
};

export default CardGrafic;