import React from 'react';
import { ArrowDownLeftIcon, ArrowUpIcon } from '@heroicons/react/16/solid';
import GaugeChart from '../Graphic/Gauge';
import IndicadorToolTip from '../Tooltip/IndicadorToolTip';
import { IconIndicador } from '../Tooltip/icons';


type CardGraficValues = {
    titulo: string;
    indicador: number;
    resultado: number;
    subtitulo: string;
    value: number;
    comparador: number;
    toolTipText: string;
};

const CardGrafic: React.FC<CardGraficValues> = ({ titulo, indicador, resultado, subtitulo, value, comparador, toolTipText }) => {
    const isPositive = resultado > 0;


    return (
        <>
            <div className='flex p-4 justify-between items-center bg-blanco shadow-custom rounded-lg w-[450px]'>
                <div className="flex flex-col gap-5">
                    <h2 className='text-s font-semibold'>{titulo}</h2>
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
                <div>
                    <GaugeChart value={value} comparisonValue={comparador} />
                </div>
                <div className='flex flex-col justify-start self-start'>
                    <IndicadorToolTip
                        icon={<IconIndicador className='w-5 h-5' />}
                        tooltipText={toolTipText}
                    />
                </div>
            </div>
        </>
    );
};

export default CardGrafic;