"use client"
import Link from 'next/link'
import {signIn, useSession, signOut} from 'next-auth/react'

function Navbar() {

  const {data: session} = useSession();
  console.log(session);

  return (
    <nav className='bg-gray-800 flex items-center py-3 justify-between px-24 text-white'>
        <Link 
        href="/"
        className='p-2 border rounded-xl border-violet-600 hover:text-red-300'
        >
          <h1>
              Home Page
          </h1>
        </Link>
        {session?.user ? (

          <div className='flex gap-x-2 items-center'>
          <Link 
          href=""
          className='p-2 border rounded-xl border-violet-600 hover:text-red-300'
          >
          Registros
          </Link>
          <Link 
          href="/dashboard"
          className='p-2 border rounded-xl border-violet-600 hover:text-red-300'
          >
          Monitoreo
          </Link>
          <p className='ml-4'>Hola {session.user.name}!</p>
          <img src={session.user.image} alt="Imagen de Usuario" 
          className='mr-4 w-10 h-10 rounded-full cursor-pointer'
          />
          <button
          onClick={async () => {
            await signOut({
              callbackUrl: "/"
            });
          }}
          >
            Logout
          </button>
          </div>
          ): (
          <button onClick={() => signIn()} 
          className='bg-sky-400 px-3 py-2'
          >
            Sign In
          </button>
          )}
    </nav>
  )
}

export default Navbar;