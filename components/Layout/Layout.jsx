
import 'tailwindcss/tailwind.css'; // Importa el archivo CSS de Tailwind, hay que cambiarlo mas adelante.
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import { useRouter } from 'next/router';

const Layout = (props) => {
    const { children } = props
    const { push } = useRouter();
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)

    const navigate = (url) => {
        push(url);
    }

    return (
        <>
            <div className="bg-gradient-to-b from-[#000000] to-[#202020] h-28 flex items-center justify-between px-4">
                <img src="/src/Logo.png" alt="Logo"/>
                {/*<div className="text-[#ffffff] text-2xl font-bold">Logo</div>*/}

                <div className='hidden m:flex gap-6 '>

                    <div
                        onClick={() => navigate('/adminSells')}
                        className="text-[#ffffff] text-2xl font-bold cursor-pointer">Cotizaciones</div>

                    <div
                        onClick={() => navigate('/adminProducts')}
                        className="text-[#ffffff] text-2xl font-bold cursor-pointer">Productos</div>


                    <div
                        onClick={() => navigate('/adminClients')}
                        className="text-[#ffffff] text-2xl font-bold cursor-pointer">Clientes</div>

                    <div
                        onClick={() => navigate('/adminWorkers')}
                        className="text-[#ffffff] text-2xl font-bold cursor-pointer">Empleados</div>

                </div>


                <div
                    onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
                    className={`${!burgerMenuOpen && 'hidden'}
                bg-gray-600/50 min-h-screen w-full fixed top-0 right-0 backdrop-blur-sm`}>
                </div>

                <div
                    onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
                    className="text-[#ffffff] text-2xl font-bold m:hidden"><GiHamburgerMenu /></div>

                {burgerMenuOpen && (
                    <div className="bg-gradient-to-b from-[#000000] to-[#202020] h-screen w-60 m:w-80 fixed top-0 right-0">
                        <div className="flex flex-col gap-6 p-6">
                            <div
                                onClick={() => navigate('/adminSells')}
                                className="text-[#ffffff] text-2xl font-bold cursor-pointer">Cotizaciones
                            </div>
                            <div
                                onClick={() => navigate('/adminProducts')}
                                className="text-[#ffffff] text-2xl font-bold cursor-pointer">Productos
                            </div>
                            <div
                                onClick={() => navigate('/adminClients')}
                                className="text-[#ffffff] text-2xl font-bold cursor-pointer">Clientes
                            </div>
                            <div
                                onClick={() => navigate('/adminWorkers')}
                                className="text-[#ffffff] text-2xl font-bold cursor-pointer">Empleados
                            </div>
                        </div>
                    </div>
                )}

            </div>
            {/* contenido */}
            <div className="bg-gradient-to-b from-[#333333] to-[#000000] min-h-screen">
                <div className='flex flex-col mx-10 m:mx-20 '>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout