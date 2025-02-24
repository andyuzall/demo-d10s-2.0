"use client"
import Link from 'next/link'
import { signIn, useSession, signOut } from 'next-auth/react'
import logoTipo from '@/assets/logos/logo-blanco.svg';
import logOut from '@/assets/icons/generales/logout.svg';
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function Navbarr() {
  const pathname  = usePathname();
  const { data: session } = useSession();
  const [selectedButton, setSelectedButton] = useState('home');
  const [notifications, setNotifications] = useState([
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Efecto para sincronizar el selectedButton con la ruta actual
  useEffect(() => {
    // Remover el slash inicial para comparar
    const currentPath = pathname?.slice(1) || 'home';
    setSelectedButton(currentPath);
  }, [pathname]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/sheetAlarms');
      const data = await res.json();
      console.log("Respuesta de la API:", data);
      if (Array.isArray(data.recentAlarms)) {
        setNotifications(data.recentAlarms);
      } else {
        console.error("El formato de la respuesta no es válido:", data);
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      fetchNotifications();
    }
  };

  const signInAccount = async () => {
    try {
      await signIn('', { callbackUrl: '/home' });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setSelectedButton(buttonName);
  }

  return (
    <nav className="relative flex-col items-center pt-8 justify-between m-1 h-[250px] rounded-lg px-4 bg-[url('../assets/img-header.jpg')] bg-cover bg-no-repeat'">
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent backdrop-blur-sm rounded-b-lg pointer-events-none z-0"></div>
      {session?.user ? (
        <>
          <div className="flex justify-between h-8 w-full items-center text-center">
            <div className='flex items-center w-[150px] gap-[5px]'>
              <img
                src={session.user.image!}
                alt='Imagen de Usuario'
                className='w-10 h-10 rounded-full cursor-pointer'
              />
              <p className='text-blanco text-sm'>{session.user.name}</p>
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
                width={150}
                height={50}
                alt='Logotipo de Atomik'
              />
            </div>
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                className={`bg-blanco px-3 py-1 rounded-lg shadow-custom text-center
                  ${isDropdownOpen ? 'bg-gradient-to-r from-[#BB86FC] to-[#6300DC] text-blanco' : ''}`}
              >
                Nuevas alertas
              </button>

              {isDropdownOpen && (
                <ul
                  className="absolute right-0 mt-1 w-60 z-10 overflow-hidden p-2"
                >
                  {notifications.map((notification, index) => (
                    <li
                      key={index}
                      className="bg-negro opacity-90 px-4 py-1.5 my-1 font-normal text-xs text-blanco rounded-lg"
                    >
                      {notification.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className='flex flex-col justify-center items-center text-center mb-4 mt-4 gap-2'>
            <h1 className='text-4xl font-light text-blanco uppercase tracking-widest'>
              D10S
            </h1>
            <h2 className='text-l font-light text-blanco'>
              2.0
            </h2>
          </div>
          <div className='flex justify-center items-center relative z-10'>
            <span className='bg-transparent border-2 border-blanco/50 w-2/4 rounded-lg flex justify-between items-center'>
              <Link
                href="/home"
                onClick={() => handleButtonClick('home')}
                className={`text-xl font-light w-2/4 rounded-lg text-center uppercase py-1.5
                  ${selectedButton === 'home' ? 'bg-violetaSecundario/50 text-blanco font-semibold cursor-default' : 'font-normal text-blanco/60'}`}
              >
                Home
              </Link>
              <Link
                href="/dashboard"
                onClick={() => handleButtonClick('dashboard')}
                className={`text-xl font-light w-2/4 rounded-lg text-center uppercase py-1.5 
                  ${selectedButton === 'dashboard' ? 'bg-violetaSecundario/50 text-blanco font-semibold cursor-default' : 'font-normal text-blanco/60'}`}
              >
                Campañas
              </Link>
              <Link
                href="/notificaciones"
                onClick={() => handleButtonClick('notificaciones')}
                className={`text-xl font-light w-2/4 rounded-lg text-center uppercase py-1.5
                  ${selectedButton === 'notificaciones' ? 'bg-violetaSecundario/50 text-blanco font-semibold cursor-default' : 'font-normal text-blanco/60'}`}
              >
                Notificaciones
              </Link>
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent backdrop-blur-sm rounded-b-lg pointer-events-none"></div>
        </>
      ) : (
        <>
          <div className="fixed inset-0 flex flex-col gap-48 justify-start pt-10 items-center bg-[url('../assets/img-login.jpg')] bg-cover bg-no-repeat">
            <div className='flex flex-col gap-8'>
            <Image
              src={logoTipo}
              width={250}
              height={50}
              alt='Logotipo de Atomik'
              />
            <div className='flex flex-col items-center text-center'>
            </div>
            </div>
            <div className="">
              <div className='bg-transparent backdrop-blur-md h-64 flex flex-col 
            border-2 border-grisPrincipal border-opacity-80 justify-evenly items-center p-8 rounded-lg shadow-md'>
                <h1 className='font-bold text-2xl text-blanco'>
                  Bienvenido a D1OS 2.0
                </h1>
                <button onClick={() => signInAccount()}
                  className='bg-blanco px-4 py-3 font-bold rounded-2xl text-negro flex items-center justify-between w-full max-w-xs'
                >
                  <div className="w-6" /> {/* Espaciador invisible para equilibrar el diseño */}
                  <p className="text-center flex-grow">Logueate ahora</p>
                  <FcGoogle className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbarr;
