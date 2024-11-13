"use client"
import Link from 'next/link'
import {signIn, useSession, signOut} from 'next-auth/react'
import logoTipo from '@/assets/logo-violeta.gif';
import Image from 'next/image';


function Navbarr() {

  const {data: session} = useSession();

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
                    <p className='ml-4'>{session.user.name}</p>
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
                className='bg-gray-200 text-gray-600 p-2'
                >
                Home
                </Link>
                <Link
                href="/dashboard"
                className='bg-gray-200 text-gray-600 p-2'
                >
                Campañas
                </Link>
                <Link
                href="/notificaciones"
                className='bg-gray-200 text-gray-600 p-2'
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
