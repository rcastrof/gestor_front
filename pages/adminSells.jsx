import ModalCreateSell from '@components/Admin/Sells/ModalCreateSell'
import SellsCard from '@components/Admin/Sells/SellsCard'
import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'
import { getSession } from "next-auth/react";
import { RiFileExcel2Line } from 'react-icons/ri'

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

const adminSells = ({ session }) => {

    const [products, setProducts] = useState([])
    const [workers, setWorkers] = useState([])
    const [clients, setClients] = useState([])
    const [sells, setSells] = useState([])

    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    const [showModalCreate, setShowModalCreate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await getSells();
            await getClients();
            await getProducts();
            await getWorkers();
        };
        fetchData();
        setLoading(false);

    }, []);

    const getClients = async () => {
        try {
            // Obtener clientes
            const response = await fetch('http://localhost:3000/api/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            // Si data está vacío o no existe, entonces data = []
            if (!data || data.length === 0) {
                setClients([]);
            } else {
                setClients(data);
            }

        } catch (error) {
            console.error('Error al cargar los datos de clientes:', error);
        }
    };


    const getProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data === undefined || data.length == 0) {
                setProducts([]);
            }
            else {
                setProducts(data);
            }
        } catch (error) {
            console.error('Error al cargar los datos de productos:', error);
        } finally {
        }
    }

    const getWorkers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/workers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data === undefined || data.length == 0) {
                setWorkers([]);
            }
            else {
                setWorkers(data);
            }

        } catch (error) {
            console.error('Error al cargar los datos de trabajadores:', error);
        } finally {
        }
    }

    const getSells = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/sells', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data === undefined || data.length == 0) {
                setSells([]);
            }
            else {
                setSells(data);
            }

        } catch (error) {
            console.error('Error al cargar los datos de cotizaciones:', error);
        }
    }


    const handleCallBack = (childData) => {
        if (childData && childData.state) {
            setLoading(true);
            getSells();
            getClients();
            getProducts();
            getWorkers();
            setLoading(false);
        }

    }

    const filteredSells = sells.filter((sell) =>    
        sell.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      
    );
    const dateNow = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).replace(/\//g, '-');
    
    const exportClientes = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/sells/export', {
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
                a.download = `"LosAlercesReporteCotizaciones${dateNow}.xlsx`;
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


    return (
        <Layout>
            <div className='flex flex-col h-full '>

                <div className='text-white text-3xl font-bold italic mt-8'>
                    <h1>Cotizaciones</h1>
                </div>
                {/* boton para agregar cotizaciones */}
                <div className='flex  items-center  '>
                    <div
                        onClick={() => setShowModalCreate(true)}
                        className='flex  mt-8 mr-5'>
                        <button className='bg-black/20 text-[#fff] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Cotizacion</button>
                    </div>

                    <div
                        onClick={() => exportClientes()}
                        className=' text-white flex items-center mt-[28px] w-[120px] justify-center h-[35px] rounded-full bg-green-500 hover:bg-green-900 select-none cursor-pointer '>
                        <RiFileExcel2Line className='text-white' size={'25px'} /> Descargar
                    </div>
                </div>
                <ModalCreateSell
                    show={showModalCreate}
                    onClose={() => setShowModalCreate(false)}
                    clients={clients}
                    products={products}
                    workers={workers}
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
                        {filteredSells.map((sell, index) => (
                            <SellsCard
                                key={index}
                                name={sell.name}
                                id={sell.iD_Cotizacion}

                                clients={clients}
                                products={products}
                                workers={workers}

                                sell={sell}

                                parentCallback={handleCallBack}
                            />
                        ))}
                        <div className='pb-[10px]' />
                        {filteredSells && filteredSells.length === 0 && (
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