import React from 'react';

type CardSinValues = {
    titulo: string;
    indicador: number;
    subtitulo: string;
};

const CardSinCalc: React.FC<CardSinValues> = ({ titulo, indicador, subtitulo }) => {
    
    return (
        <>
        <div className="flex flex-col gap-4 p-4 bg-slate-200 w-56 rounded-lg">
            <h2 className='text-s font-semibold'>{titulo}</h2>
            <h3 className='text-black font-bold text-4xl'>{indicador}</h3>
            <div className="flex items-center">
                <span className='text-xs font-medium '>
                    {subtitulo}
                </span>
            </div>
        </div>
        </>
    );
};

export default CardSinCalc;