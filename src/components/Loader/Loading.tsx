import React from 'react';
import logoTipo from '@/assets/logo-violeta.gif';
import Image from 'next/image';

const Loading: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center">
            <Image
                src={logoTipo}
                width={1920}
                height={1080}
                alt='Cargando...'
            />
        </div>
    );
};

export default Loading;
