import ModalCreateWorker from '@components/Admin/Workers/ModalCreateWorker';
import WorkersCard from '@components/Admin/Workers/WorkersCard'
import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner';


const adminWorkers = () => {
    const [workers, setWorkers] = useState([])
    const [loading, setLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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
            const response = await fetch('http://localhost:3000/api/workers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setWorkers(data);
        } catch (error) {
            console.error('Error al cargar los datos de trabajadores:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleCallBack = (childData) => {
        if (childData && childData.state) {
            getWorkers();
        }
    }
    
    const filteredWorkers = workers.filter((worker) =>
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.lastname.toLowerCase().includes(searchTerm.toLowerCase())
    );




    return (
        <Layout>

            <div className='flex flex-col h-full '>
                <div className='text-white text-3xl font-bold italic mt-8'>
                    <h1>Personal</h1>
                </div>
                {/* boton para agregar productos */}
                <div
                    onClick={() => setShowModalCreate(true)}
                    className='flex  mt-8 mr-10 w-fit'>
                    <button className='bg-gray-200 text-[#000000] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Personal</button>
                </div>
                <ModalCreateWorker
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

                {/* tarjeta de productos */}

                {!loading && (
                    <div className='m:flex m:flex-wrap m:ml-[24px] mt-5 gap-4 self-center'>
                        {filteredWorkers.map((worker, index) => (
                            <WorkersCard
                                key={index}
                                name={worker.name}
                                lastname={worker.lastname}
                                profession={worker.profession}
                                phone={worker.phone}
                                address={worker.address}
                                email={worker.email}
                                salary={worker.salary}
                                id={worker.iD_Personal}
                                parentCallback={handleCallBack}
                            />
                        ))}
                        <div className='pb-[10px]' />
                        {filteredWorkers && filteredWorkers.length === 0 && (
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