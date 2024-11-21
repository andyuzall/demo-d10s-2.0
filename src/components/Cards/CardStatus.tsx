import React from 'react';
import { ArrowDownLeftIcon, ArrowUpIcon } from '@heroicons/react/16/solid';


type CardValues = {
    titulo: string;
    indicador: number;
    resultado?: number;
};

const CardStatus: React.FC<CardValues> = ({ titulo, indicador, resultado }) => {
    const isPositive = resultado > 0;

    
    return (
        <>
        <div className="flex flex-col gap-4 p-4 bg-slate-200 w-52 rounded-lg">
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
                    {resultado.toFixed(2)}% al mes anterior.
                </span>
            </div>
        </div>
        </>
    );
};

export default CardStatus;