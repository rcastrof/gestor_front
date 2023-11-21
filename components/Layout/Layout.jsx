import 'tailwindcss/tailwind.css'; // Importa el archivo CSS de Tailwind, hay que cambiarlo mas adelante.
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react';
import { useRouter } from 'next/router';
const Layout = (props) => {
    const { children } = props
    const { push } = useRouter();
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)
    const logostyle = {
        maxWidth: '100px',
        height: 'auto',
        marginRight: '10px'
    }

    const navigate = (url) => {
        push(url);
    }

    return (

        <>
            <div className="h-28 flex items-center justify-between px-4 bg-[#ebfefc]">

                <div onClick={() => navigate('/adminSells')} className='cursor-pointer'>

                    <img src="/src/Logo_NoLetter.png" alt="Logo" style={logostyle} />
                </div>

                <div className='hidden md:flex gap-6 mx-auto ' style={{ marginLeft: 10 }}>

                    <button
                        onClick={() => navigate('/adminSells')}
                        className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 rounded transition-colors"
                        style={{ fontFamily: '"Fantasy", sans-serif' }}
                    >
                        COTIZACIONES
                    </button>

                    <button
                        onClick={() => navigate('/adminProducts')}
                        className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 rounded transition-colors"
                        style={{ fontFamily: '"Fantasy", sans-serif' }}
                    >
                        PRODUCTOS
                    </button>

                    <button
                        onClick={() => navigate('/adminClients')}
                        className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 rounded transition-colors"
                        style={{ fontFamily: '"Fantasy", sans-serif' }}
                    >
                        CLIENTES
                    </button>

                    <button
                        onClick={() => navigate('/adminWorkers')}
                        className="text-2xl font-bold cursor-pointer hover:bg-green-200 px-4 py-2 rounded transition-colors"
                        style={{ fontFamily: '"Fantasy", sans-serif' }}
                    >
                        PERSONAL
                    </button>

                </div>

                <div className="flex items-center">
                    <img src="/src/LogoLogin.png" alt="Login Logo" className="h-8 mr-3" />
                    <span className="text-xl font-semibold">Hola, José Sepúlveda</span>
                </div>


                <div
                    onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
                    className={`${!burgerMenuOpen && 'hidden'}
                bg-gray-600/50 min-h-screen w-full fixed top-0 right-0 backdrop-blur-sm`}>
                </div>

                <div
                    onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
                    className="text-black text-2xl font-bold m:hidden"><GiHamburgerMenu /></div>

                {burgerMenuOpen && (
                    <div className="bg-[#749494] h-screen w-60 m:w-80 fixed top-0 right-0  flex-col">
                        <div className="flex flex-col gap-6 p-6 text-[#033739]">
                            <div
                                onClick={() => navigate('/adminSells')}
                                className=" text-2xl font-bold cursor-pointer">Cotizaciones
                            </div>
                            <div
                                onClick={() => navigate('/adminProducts')}
                                className=" text-2xl font-bold cursor-pointer">Productos
                            </div>
                            <div
                                onClick={() => navigate('/adminClients')}
                                className=" text-2xl font-bold cursor-pointer">Clientes
                            </div>
                            <div
                                onClick={() => navigate('/adminWorkers')}
                                className="text-2xl font-bold cursor-pointer">Personal
                            </div>
                        </div>

                    </div>
                )}

            </div>
            {/* contenido */}
            <div className="bg-[#749494] min-h-screen">
                <div className='flex flex-col mx-10 m:mx-20 '>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout