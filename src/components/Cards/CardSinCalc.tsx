'use client';
import React from 'react';
import { IconIndicador } from '../Tooltip/icons';
import IndicadorToolTip from '../Tooltip/IndicadorToolTip';
import { useFilterNavigationAlarms } from '@/hooks/usefilterNavigation';

type CardSinValues = {
    titulo: string;
    indicador: number;
    subtitulo: string;
    toolTipText: string;
    navigable?: boolean;
    filterPath?: {
        query: { [key: string]: string };
    }
    baseUrl: string;
};

const CardSinCalc: React.FC<CardSinValues> = ({
    titulo,
    indicador,
    subtitulo,
    toolTipText,
    navigable = false,
    filterPath,
    baseUrl
}) => {

    const { navigateWithFilterAlarms } = useFilterNavigationAlarms();

    const handleClick = () => {
        if (navigable) {
            if (filterPath) {
                navigateWithFilterAlarms(filterPath.query, baseUrl);
            }
        }
    }


    return (
        <>
            <div
                onClick={handleClick}
                className={`flex flex-col gap-5 p-4 bg-blanco h-[152px] rounded-lg shadow-custom ${navigable ? 'cursor-pointer card-hover' : ''}`}>
                <div className='flex justify-between items-center'>
                    <h2 className='text-s font-semibold'>{titulo}</h2>
                    <IndicadorToolTip
                        icon={<IconIndicador className='w-5 h-5' />}
                        tooltipText={toolTipText}
                    />
                </div>
                <h3 className='text-negro font-semibold text-3xl'>{indicador}</h3>
                <div className="flex items-center">
                    <span className='text-xs font-light'>
                        {subtitulo}
                    </span>
                </div>
            </div>
        </>
    );
};

export default CardSinCalc;