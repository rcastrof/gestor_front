import ClientsCard from '@components/Admin/Clients/ClientsCard';
import ModalCreateClient from '@components/Admin/Clients/ModalCreateClient';
import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'

const adminClients = () => {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/data/clientes.json');
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos');
                }
                const data = await response.json();
                setClients(data.clients);
                console.log(data.clients)
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
                    <h1>Clientes</h1>
                </div>
                {/* boton para agregar productos */}
                <div
                    onClick={() => setShowModalCreate(true)}
                    className='flex  mt-8 mr-10'>
                    <button className='bg-gray-200 text-[#000000] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Cliente</button>
                </div>
                <ModalCreateClient
                    show={showModalCreate}
                    onClose={() => setShowModalCreate(false)}
                />
                {/* barra de busqueda */}
                <div className=' mt-10'>
                    <input className="bg-white/20 rounded-[10px] h-[45px] w-full px-10 text-white" type="text" placeholder="Buscar" />
                </div>

                {/* tarjeta de productos */}

                {!loading && (
                    <div className='m:flex m:flex-wrap m:ml-[24px] mt-5 gap-4 self-center'>
                        {clients.map((client, index) => (
                            <ClientsCard
                                key={index}
                                name={client.name}
                                phone={client.phone}
                                address={client.address}
                                email={client.email}
                                contact={client.contact}
                                id={client.id}

                            />
                        ))}
                        <div className='pb-[10px]' />
                        {clients && clients.length === 0 && (
                            <div className='text-white text-2xl font-bold italic mt-8'>
                                <h1>No hay clientes</h1>
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

        </Layout>)
}

export default adminClients