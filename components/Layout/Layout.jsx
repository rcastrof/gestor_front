import 'tailwindcss/tailwind.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut } from "next-auth/react";

const Layout = ({ children }) => {
    const router = useRouter();
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
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

    return (
        <>
            <div className="h-28 flex items-center justify-between px-4 bg-[#ebfefc]">
                <div onClick={() => navigate('/adminSells')} className='cursor-pointer'>
                    <img src="/src/Logo_NoLetter.png" alt="Logo" style={logostyle} />
                </div>

                <div className='hidden md:flex gap-6 mx-auto ' style={{ marginLeft: 10 }}>
                    <button onClick={() => navigate('/adminSells')} className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 transition-colors hover:rounded-lg" style={{ fontFamily: '"NombreDeLaFuente", sans-serif' }}>Cotizaciones</button>
                    <button onClick={() => navigate('/adminProducts')} className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 transition-colors hover:rounded-lg" style={{ fontFamily: '"NombreDeLaFuente", sans-serif' }}>Productos</button>
                    <button onClick={() => navigate('/adminClients')} className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 transition-colors hover:rounded-lg" style={{ fontFamily: '"NombreDeLaFuente", sans-serif' }}>Clientes</button>
                    <button onClick={() => navigate('/adminWorkers')} className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 transition-colors hover:rounded-lg" style={{ fontFamily: '"NombreDeLaFuente", sans-serif' }}>Personal</button>
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
                            <button onClick={() => navigate('/adminSells')} className="text-2xl font-bold cursor-pointer">Cotizaciones</button>
                            <button onClick={() => navigate('/adminProducts')} className="text-2xl font-bold cursor-pointer">Productos</button>
                            <button onClick={() => navigate('/adminClients')} className="text-2xl font-bold cursor-pointer">Clientes</button>
                            <button onClick={() => navigate('/adminWorkers')} className="text-2xl font-bold cursor-pointer">Personal</button>
                        </div>
                        <div className="flex items-center gap-3">
                            <img src="/src/LogoLogin.png" alt="Login Logo" className="h-8" />

                            <span className="text-xl font-semibold"></span>
                            <button
                                onClick={handleSignOut}
                                className="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded-full transition-colors"
                            >
                                Cerrar Sesión
                            </button>

                        </div>
                    </div>
                )}
            </div>
            <div className="bg-[#749494] min-h-screen">
                <div className='flex flex-col mx-10 md:mx-20 '>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout;