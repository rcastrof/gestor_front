import ModalCreateWorker from '@components/Admin/Workers/ModalCreateWorker';
import WorkersCard from '@components/Admin/Workers/WorkersCard'
import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner';
import axios from 'axios';


const adminWorkers = () => {
    const [workers, setWorkers] = useState([])
    const [loading, setLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await getWorkers();

        };

        // Call the fetchData function inside the useEffect
        fetchData();

    }, []);

    const getWorkers = async () => {
        try {
            setLoading(true);

            const response = await new Promise((resolve, reject) => {
                axios.get(`${process.env.REACT_APP_API_URL}personal/all`, {
                    withCredentials: true,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => {
                        resolve(response.data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            });

            if (!response) {
                throw new Error('No se pudieron cargar los datos');
            }

            setWorkers(response.workers);
            console.log(response.workers);
        } catch (error) {
            console.error('Error al cargar los datos de trabajadores:', error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <Layout>

            <div className='flex flex-col h-full '>
                <div className='text-white text-3xl font-bold italic mt-8'>
                    <h1>Empleados</h1>
                </div>
                {/* boton para agregar productos */}
                <div
                    onClick={() => setShowModalCreate(true)}
                    className='flex  mt-8 mr-10'>
                    <button className='bg-gray-200 text-[#000000] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Empleado</button>
                </div>
                <ModalCreateWorker
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
                        {workers.map((worker, index) => (
                            <WorkersCard
                                key={index}
                                name={worker.name}
                                profession={worker.profession}
                                phone={worker.phone}
                                address={worker.address}
                                email={worker.email}
                                salary={worker.salary}
                                id={worker.id}
                            />
                        ))}
                        <div className='pb-[10px]' />
                        {workers && workers.length === 0 && (
                            <div className='text-white text-2xl font-bold italic mt-8'>
                                <h1>No hay trabajadores</h1>
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

export default adminWorkers