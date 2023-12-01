import 'tailwindcss/tailwind.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";
import { decode } from 'next-auth/jwt';


const Layout = ({ children }) => {
    const router = useRouter();
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const { data } = useSession();


    const logostyle = {
        maxWidth: '100px',
        height: 'auto',
        marginRight: '10px'
    };

    const navigate = (url) => {
        router.push(url);
    };

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    }
    useEffect(() => {

        async function fetchData() {

            console.log(data.session)



        }
        fetchData();
    }, [])




    return (
        <>

            {/* todo este div es el navbar */}
            <div className="h-28 flex items-center justify-between px-4 bg-gradient-to-t from-[#7ac68d] to-[#7c8c84] p-4">
                <div onClick={() => router.push('/adminSells')} className='cursor-pointer'>
                    <img src="/src/Logo_NoLetter.png" alt="Logo" style={logostyle} />
                </div>

               {/*
               
               para testear el token
               <div
                    onClick={() => console.log(data)}
                    className='border'>
                    clg
                </div> */}
                <div className='hidden md:flex gap-6 mx-auto w-full  ' style={{ marginLeft: 10 }}>
                    <button onClick={() => router.push('/adminSells')} className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 transition-colors hover:rounded-lg italic" >Cotizaciones</button>
                    <button onClick={() => router.push('/adminProducts')} className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 transition-colors hover:rounded-lg italic" >Productos</button>
                    <button onClick={() => router.push('/adminClients')} className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 transition-colors hover:rounded-lg italic" >Clientes</button>
                    <button onClick={() => router.push('/adminWorkers')} className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 transition-colors hover:rounded-lg italic" >Personal</button>
                    <button
                        onClick={handleSignOut}
                        className="flex ml-auto text-2xl font-bold cursor-pointer hover:bg-green-400 px-4 py-2 transition-colors hover:rounded-lg text-gray-600"
                    >
                        Cerrar Sesión
                    </button>
                </div>



                <div
                    onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
                    className={`${!burgerMenuOpen && 'hidden'}
                bg-gray-600/50 min-h-screen w-full fixed top-0 right-0 backdrop-blur-sm`}>
                </div>


                <div
                    onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
                    className="text-black text-2xl font-bold md:hidden">
                    <GiHamburgerMenu /></div>

                {burgerMenuOpen && (
                    <div className="bg-[#749494] h-screen w-60 md:w-80 fixed top-0 right-0 flex-col">
                        <div className="flex flex-col gap-6 p-6 text-[#033739]">
                            <button onClick={() => router.push('/adminSells')} className="text-2xl font-bold cursor-pointer">Cotizaciones</button>
                            <button onClick={() => router.push('/adminProducts')} className="text-2xl font-bold cursor-pointer">Productos</button>
                            <button onClick={() => router.push('/adminClients')} className="text-2xl font-bold cursor-pointer">Clientes</button>
                            <button onClick={() => router.push('/adminWorkers')} className="text-2xl font-bold cursor-pointer">Personal</button>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-xl font-semibold"></span>
                            <button
                                onClick={handleSignOut}
                                className="text-2xl font-bold cursor-pointer mt-40"
                            >
                                Cerrar Sesión
                            </button>

                        </div>
                    </div>
                )}
            </div>

            {/* children es el contenido de la pagina */}
            <div className="bg-gradient-to-b from-[#7ac68d] to-[#7c8c84] min-h-screen">
                <div className='flex flex-col mx-10 md:mx-20 '>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout;