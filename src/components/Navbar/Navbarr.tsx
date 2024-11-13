"use client"
import Link from 'next/link'
import {signIn, useSession, signOut} from 'next-auth/react'
import logoTipo from '@/assets/logo-violeta.gif';
import logOut from '@/assets/icon-logout.svg';
import Image from 'next/image';
import { useState } from 'react';


function Navbarr() {

  const {data: session} = useSession();
  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
}

  return (
    <nav className='flex-col items-center py-3 justify-between px-4'>
        {session?.user ? (
            <>
            <div className='flex justify-between w-full items-center text-center'>
                <div className='flex justify-start items-center'>
                    <img 
                    src={session.user.image!} 
                    alt='Imagen de Usuario' 
                    className='mr-1 w-10 h-10 rounded-full cursor-pointer'
                    />
                    <p className='ml-2 mr-2'>{session.user.name}</p>
                    <button
                    onClick={async () => {
                      await signOut({
                        callbackUrl: "/"
                      });
                    }}
                    >
                      <Image 
                      src={logOut}
                      width={20}
                      height={20}
                      alt="Icono para cerrar sesion"
                      />
                    </button>
                </div>
                <div className='block w-auto'>
                    <Image 
                    src={logoTipo}
                    width={150}
                    height={50}
                    alt='Logotipo de Atomik' 
                    />        
                </div>
                <div>
                    <button>
                        <p
                        className=''
                        >
                        Nuevas alertas
                        </p>
                    </button>
                </div>
            </div>
            <div className='flex-col justify-center items-center text-center mb-4'>
                <h1 className='text-5xl font-semibold text-gray-600 uppercase tracking-widest'>
                   Planilla D10S 
                </h1>
                <h2 className='text-4xl font-semibold text-gray-600'>
                    2.0
                </h2>
            </div>
            <div className='flex justify-center items-center'>
                <Link
                href="/home"
                onClick={() => handleButtonClick('home')}
                className={`text-xl text-gray-600 bg-gray-300 p-2 rounded-tl-lg rounded-bl-lg w-60 text-center
                  ${selectedButton === 'home' ? 'font-semibold cursor-default' : 'font-normal'}`}
                >
                Home
                </Link>
                <Link
                href="/dashboard"
                onClick={() => handleButtonClick('dashboard')}
                className={`text-xl text-gray-600 bg-gray-300 p-2 w-60 text-center
                  ${selectedButton === 'dashboard' ? 'font-semibold cursor-default' : 'font-normal'}`}
                >
                Campañas
                </Link>
                <Link
                href="/notificaciones"
                onClick={() => handleButtonClick('notificaciones')}
                className={`text-xl text-gray-600 bg-gray-300 p-2 rounded-tr-lg rounded-br-lg w-60 text-center
                  ${selectedButton === 'notificaciones' ? 'font-semibold cursor-default' : 'font-normal'}`}
                >
                Notificaciones
                </Link>
            </div>
            </>
        ): (
            <button onClick={() => signIn()} 
            className='bg-sky-400 px-3 py-2'
            >
              Logueate
            </button>
        )} 
    </nav>
  )
}

export default Navbarr;
