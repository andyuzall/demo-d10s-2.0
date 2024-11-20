"use client"
import Link from 'next/link'
import {signIn, useSession, signOut} from 'next-auth/react'
import logoTipo from '@/assets/logo-violeta.gif';
import logOut from '@/assets/icon-logout.svg';
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
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
            <div className='flex justify-between h-8 w-full items-center text-center'>
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
                <div className='flex'>
                    <Image 
                    src={logoTipo}
                    width={250}
                    height={50}
                    alt='Logotipo de Atomik' 
                    />        
                </div>
                <div>
                    <button className='bg-gray-600 px-3 py-1 rounded-lg text-center'>
                        <p
                        className='text-white'
                        >
                        Nuevas alertas
                        </p>
                    </button>
                </div>
            </div>
            <div className='flex-col justify-center items-center text-center mb-4'>
                <h1 className='text-5xl text-gray-600 uppercase tracking-widest'>
                   Planilla D10S 
                </h1>
                <h2 className='text-2xl text-gray-600'>
                    2.0
                </h2>
            </div>
            <div className='flex justify-center items-center'>
              <span className='bg-gray-200 w-2/4 rounded-lg flex justify-between items-center'>
                <Link
                href="/home"
                onClick={() => handleButtonClick('home')}
                className={`text-xl text-gray-600 w-2/4 rounded-lg text-center uppercase
                  ${selectedButton === 'home' ? 'bg-slate-300 font-semibold cursor-default' : 'font-normal'}`}
                  >
                Home
                </Link>
                <Link
                href="/dashboard"
                onClick={() => handleButtonClick('dashboard')}
                className={`text-xl text-gray-600 w-2/4 rounded-lg text-center uppercase
                  ${selectedButton === 'dashboard' ? 'bg-slate-300 font-semibold cursor-default' : 'font-normal'}`}
                >
                Campañas
                </Link>
                <Link
                href="/notificaciones"
                onClick={() => handleButtonClick('notificaciones')}
                className={`text-xl text-gray-600 w-2/4 rounded-lg text-center uppercase
                  ${selectedButton === 'notificaciones' ? 'bg-slate-300 font-semibold cursor-default' : 'font-normal'}`}
                >
                Notificaciones
                </Link>
              </span>
            </div>
            </>
        ): (
          <>
          <div className='flex flex-col justify-center h-32 w-full items-center text-center mb-28'>
            <div className='flex flex-col justify-center m-0'>
                      <Image 
                      src={logoTipo}
                      width={250}
                      height={50}
                      alt='Logotipo de Atomik' 
                      />        
            </div>
            <div className='flex-col justify-center items-center text-center mb-4'>
                  <h1 className='text-5xl text-gray-600 uppercase tracking-widest'>
                     Planilla D10S 
                  </h1>
                  <h2 className='text-2xl text-gray-600'>
                      2.0
                  </h2>
            </div>
          </div>
            <div className='flex flex-col items-center text-center justify-center'>
              <div className='bg-gray-200 h-60 flex flex-col gap-4 justify-between p-8 rounded-lg shadow-md'>
              <h1 className='font-bold text-xl text-gray-500'>
                Bienvenido a D1OS 2.0
              </h1>
            <button onClick={() => signIn()} 
            className='bg-white px-4 py-2 font-bold rounded-2xl text-black flex items-center justify-between w-full max-w-xs'
            >
              <div className="w-6" /> {/* Espaciador invisible para equilibrar el diseño */}
              <p className="text-center flex-grow">Logueate ahora</p>
              <FcGoogle className="text-xl" />
            </button>
              <h2 className='text-sm text-gray-400'>
                Registra, monitorea y acciona sobre tus campañas.
              </h2>
              </div>
            </div>
          </>
        )} 
    </nav>
  )
}

export default Navbarr;
