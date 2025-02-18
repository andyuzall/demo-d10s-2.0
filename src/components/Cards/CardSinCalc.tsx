import React from 'react';

type CardSinValues = {
    titulo: string;
    indicador: number;
    subtitulo: string;
    icon: React.ReactNode;
    onOpenModal: ()  => void;
};

const CardSinCalc: React.FC<CardSinValues> = ({ titulo, indicador, subtitulo, icon, onOpenModal }) => {

    return (
        <>
            <div className="flex flex-col gap-5 p-4 bg-blanco h-[152px] rounded-lg shadow-custom">
                <div className='flex justify-between items-center'>
                    <h2 className='text-s font-semibold'>{titulo}</h2>
                    <button
                    onClick={onOpenModal}
                    >
                        {icon}
                    </button>
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