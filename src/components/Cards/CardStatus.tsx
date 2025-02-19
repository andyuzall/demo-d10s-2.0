import React from 'react';
import { ArrowDownLeftIcon, ArrowUpIcon } from '@heroicons/react/16/solid';
import IndicadorToolTip from '../Tooltip/IndicadorToolTip';
import { IconIndicador } from '../Tooltip/icons';


type CardValues = {
    titulo: string;
    indicador: number;
    resultado: number;
    subtitulo: string;
    toolTipText: string;
};

const CardStatus: React.FC<CardValues> = ({ titulo, indicador, resultado, subtitulo, toolTipText }) => {
    const isPositive = resultado > 0;

    return (
        <>
            <div className="flex flex-col gap-5 p-4 bg-blanco w-64 h-[152px] rounded-lg shadow-custom">
                <div className='flex justify-between items-center'>
                    <h2 className='text-s font-semibold'>{titulo}</h2>
                    <IndicadorToolTip
                        icon={<IconIndicador className='w-5 h-5' />}
                        tooltipText={toolTipText}
                    />
                </div>
                <h3 className='text-negro font-semibold text-3xl'>{indicador}</h3>
                <div className="flex items-center">
                    {isPositive ? (
                        <ArrowUpIcon className="w-4 h-4 text-green-500" />
                    ) : resultado < 0 ? (
                        <ArrowDownLeftIcon className="w-4 h-4 text-red-500" />
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