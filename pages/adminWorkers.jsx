import ModalCreateWorker from '@components/Admin/Workers/ModalCreateWorker';
import WorkersCard from '@components/Admin/Workers/WorkersCard'
import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner';


const adminWorkers = () => {
    const [workers, setWorkers] = useState([])
    const [loading, setLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/data/trabajadores.json');
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos');
                }
                const data = await response.json();
                setWorkers(data.workers);
                console.log(data.workers)
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
                    <h1>Empleados</h1>
                </div>
                {/* boton para agregar productos */}
                <div
                    onClick={() => setShowModalCreate(true)}
                    className='flex  mt-8 mr-10'>
                    <button className='bg-[#FFD600] text-[#000000] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Empleado</button>
                </div>
                <ModalCreateWorker
                    show={showModalCreate}
                    onClose={() => setShowModalCreate(false)}
                />
                {/* barra de busqueda */}
                <div className='mx-10 mt-10'>
                    <input className="bg-white/20 rounded-[10px] h-[45px] w-full px-10 text-white" type="text" placeholder="Buscar" />
                </div>

                {/* tarjeta de productos */}

                {!loading && (
                    <div className='m:flex m:flex-wrap m:ml-[24px] mt-5 gap-4'>
                        {workers.map((worker, index) => (
                            <WorkersCard
                                key={index}
                                name={worker.first_name}
                                last_name={worker.last_name}
                                profession={worker.profession}
                                phone={worker.phone}
                                address={worker.address}
                                email={worker.email}
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