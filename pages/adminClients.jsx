import ClientsCard from '@components/Admin/Clients/ClientsCard';
import ModalCreateClient from '@components/Admin/Clients/ModalCreateClient';
import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner';

const adminClients = () => {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            await getClients();
            await getContacts();
            await fetchContacts();

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

    const getContacts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log(data)
            //si data esta vacio o no existe, entonces data = []
            if (data === undefined || data.length == 0) {
                setContacts([]);
            }
            else {
                setContacts(data);
            }
            console.log(contacts)
        } catch (error) {
            console.error('Error al cargar los datos de contactos:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchContacts = async () => {
        try {
            setLoading(true);
    
            // Obtener los clientes y contactos
            await getClients();
            await getContacts();
    
            // Verificar si hay clientes y contactos antes de continuar
            if (clients.length === 0 || contacts.length === 0) {
                console.warn('No hay clientes o contactos para asignar.');
                return;
            }
    
            // Iterar sobre los contactos y asignarlos a los clientes correspondientes
            const updatedClients = clients.map((client) => {
                const clientContacts = contacts.filter(
                    (contact) => contact.iD_Cliente === client.iD_Cliente
                );
                return { ...client, contacts: clientContacts };
            });
    
            // Actualizar el estado de clients con los contactos asignados
            setClients(updatedClients);
            console.log(updatedClients)
    
        } catch (error) {
            console.error('Error al asignar contactos a clientes:', error);
        } finally {
            setLoading(false);
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
                <div
                    onClick={() => setShowModalCreate(true)}
                    className='flex  mt-8 mr-10'>
                    <button className='bg-gray-200 text-[#000000] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Cliente</button>
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
                                contact={client.contact}
                                id={client.iD_cliente}
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