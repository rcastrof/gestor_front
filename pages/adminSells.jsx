import ModalCreateSell from '@components/Admin/Sells/ModalCreateSell'
import SellsCard from '@components/Admin/Sells/SellsCard'
import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'


const adminSells = () => {

    const [products, setProducts] = useState([])
    const [workers, setWorkers] = useState([])
    const [clients, setClients] = useState([])
    const [sells, setSells] = useState([])

    const [loading, setLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await fetch('/data/productos.json');
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos');
                }
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error al cargar los datos de productos:', error);
            }
            try {
                const response = await fetch('/data/clientes.json');
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos');
                }
                const data = await response.json();
                setClients(data.clients);
            } catch (error) {
                console.error('Error al cargar los datos de trabajadores:', error);
            }
            try {
                const response = await fetch('/data/trabajadores.json');
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos');
                }
                const data = await response.json();
                setWorkers(data.workers);
            } catch (error) {
                console.error('Error al cargar los datos de trabajadores:', error);
            }
            try {
                const response = await fetch('/data/cotizaciones.json');
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos');
                }
                const data = await response.json();
                setSells(data.sells);
            } catch (error) {
                console.error('Error al cargar los datos de trabajadores:', error);
            }
        };

        fetchData();
        setLoading(false);

    }, []);

    return (
        <Layout>

            <div className='flex flex-col h-full '>
                <div className='text-white text-3xl font-bold italic mt-8'>
                    <h1>Cotizaciones</h1>
                </div>
                {/* boton para agregar cotizaciones */}
                <div
                    onClick={() => setShowModalCreate(true)}
                    className='flex  mt-8 mr-10'>
                    <button className='bg-gray-200 text-[#000000] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Cotizacion</button>
                </div>
                <ModalCreateSell
                    show={showModalCreate}
                    onClose={() => setShowModalCreate(false)}
                    clients={clients}
                    products={products}
                    workers={workers}
                />
                {/* barra de busqueda */}
                <div className=' mt-10'>
                    <input className="bg-white/20 rounded-[10px] h-[45px] w-full px-10 text-white" type="text" placeholder="Buscar" />
                </div>

                {/* tarjeta de productos */}

                {!loading && (
                    <div className='m:flex m:flex-wrap m:ml-[24px] mt-5 gap-4 self-center'>
                        {sells.map((sell, index) => (
                            <SellsCard
                                key={index}
                                name={sell.name}
                                id={sell.id}
                                created={sell.created}
                                client={sell.client}

                                clients={clients}
                                products={products}
                                workers={workers}
                                sell={sell}
                            />
                        ))}
                        <div className='pb-[10px]' />
                        {sells && sells.length === 0 && (
                            <div className='text-white text-2xl font-bold italic mt-8'>
                                <h1>No hay cotizaciones</h1>
                            </div>
                        )}
                    </div>
                )}

                {loading &&
                    <div className='flex justify-center mt-[24px]'>
                        <Bars color="#FAFAFA" height={80} width={80} />
                    </div>
                }



            </div>



        </Layout>
    )

}

export default adminSells