'use client';
import React from 'react';
import { ArrowDownLeftIcon, ArrowUpIcon } from '@heroicons/react/16/solid';
import IndicadorToolTip from '../Tooltip/IndicadorToolTip';
import { IconIndicador } from '../Tooltip/icons';
import { useFilterNavigation } from '@/hooks/usefilterNavigation';


type CardValues = {
    titulo: string;
    indicador: number;
    resultado: number;
    subtitulo: string;
    toolTipText: string;
    filterPath?: {
        query: { [key: string]: string };
    }
};

const CardStatus: React.FC<CardValues> = ({ 
    titulo, 
    indicador, 
    resultado, 
    subtitulo, 
    toolTipText,
    filterPath
}) => {
    const isPositive = resultado > 0;
    const { navigateWithFilter } = useFilterNavigation();

    const handleClick = () => {
        if (filterPath) {
            navigateWithFilter(filterPath.query);
        }
    };

    return (
        <>
            <div
            onClick={handleClick} 
            className={`flex flex-col gap-5 p-4 bg-blanco w-64 h-[152px] rounded-lg shadow-custom ${
                filterPath ? 'cursor-pointer card-hover' : ''
            }`}>
                <div className='flex justify-between items-center'>
                    <h2 className='text-sm font-semibold'>{titulo}</h2>
                    <IndicadorToolTip
                        icon={<IconIndicador className='w-5 h-5' />}
                        tooltipText={toolTipText}
                    />
                </div>
                <h3 className='text-negro font-semibold text-3xl'>{indicador}</h3>
                <div className="flex items-center">
                    {isPositive ? (
                        <ArrowUpIcon className="w-4 h-4 text-green" />
                    ) : resultado < 0 ? (
                        <ArrowDownLeftIcon className="w-4 h-4 text-red" />
                    ) : (
                        <span className="text-gray-400">Sin cambios</span>
                    )}
                    <span className={`ml-2 text-xs font-light ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {resultado.toFixed(0)}{subtitulo}
                    </span>
                </div>
            </div>
        </>
    );
};

export default CardStatus;