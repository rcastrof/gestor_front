import ClientsCard from '@components/Admin/Clients/ClientsCard';
import ModalCreateClient from '@components/Admin/Clients/ModalCreateClient';
import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner';
import { getSession } from "next-auth/react";
import fetch from 'node-fetch';
import { RiFileExcel2Line } from "react-icons/ri";



export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    // Aquí puedes hacer la carga inicial de datos si es necesario
    // ...

    return {
        props: { session },
    };
}

const adminClients = ({ session }) => {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {

            await getClients();


        };

        fetchData();

    }, []);

    const getClients = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data)
            //si data esta vacio o no existe, entonces data = []
            if (data === undefined || data.length == 0) {
                setClients([]);
            }
            else {
                setClients(data);
            }

        } catch (error) {
            console.error('Error al cargar los datos de clientes:', error);
        } finally {
            setLoading(false);
        }
    }

    const dateNow = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).replace(/\//g, '-');

    const exportClientes = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/clients/export', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Verificar si la respuesta es un archivo binario
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.startsWith('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
                // Si es un archivo Excel, crear un Blob y generar una URL de descarga
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `"LosAlercesReporteClientes${dateNow}.xlsx`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                // Si no es un archivo Excel, interpretar la respuesta como JSON
                const data = await response.json();
                console.log(data);
            }

            setLoading(false);

        } catch (error) {
            console.error('Error al descargar:', error);
        }
    };

    const handleCallBack = (childData) => {
        if (childData && childData.state) {
            getClients();
        }
    }

    const filteredClients = clients.filter((client) =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (

        <Layout>

            <div className='flex flex-col h-full '>
                <div className='text-white text-3xl font-bold italic mt-8'>
                    <h1>Clientes</h1>
                </div>
                {/* boton para agregar cliente */}
                <div className='flex  items-center  '>
                    <div
                        onClick={() => setShowModalCreate(true)}
                        className='flex  mt-8 mr-5'>
                        <button className='bg-black/20 text-[#fff] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Cliente</button>
                    </div>

                    <div
                        onClick={() => exportClientes()}
                        className=' text-white flex items-center mt-[28px] w-[120px] justify-center h-[35px] rounded-full bg-green-500 hover:bg-green-900 select-none cursor-pointer '>
                        <RiFileExcel2Line className='text-white' size={'25px'} /> Descargar
                    </div>
                </div>

                <ModalCreateClient
                    show={showModalCreate}
                    onClose={() => setShowModalCreate(false)}
                    parentCallback={handleCallBack}
                />

                {/* barra de busqueda */}
                <div className='mt-10'>
                    <input
                        className="bg-white/20 rounded-[10px] h-[45px] w-full px-10 text-white"
                        type="text"
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* tarjeta de cliente */}

                {!loading && (
                    <div className='m:flex m:flex-wrap m:ml-[24px] mt-5 gap-4 self-center'>
                        {filteredClients.map((client, index) => (
                            <ClientsCard
                                key={index}
                                name={client.name}
                                phone={client.phone}
                                address={client.address}
                                email={client.email}
                                contact={client.contacto}
                                id={client.iD_Cliente}

                                parentCallback={handleCallBack}

                            />
                        ))}
                        <div className='pb-[10px]' />
                        {filteredClients && filteredClients.length === 0 && (
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