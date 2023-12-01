import ModalCreateProduct from '@components/Admin/Products/ModalCreateProduct'
import ProductsCard from '@components/Admin/Products/ProductsCard'
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

const adminProducts = ({ session }) => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function fetchData() {
            await getProducts();

        };

        // Call the fetchData function inside the useEffect
        fetchData();

    }, []);

    const getProducts = async () => {
        try {
            setLoading(true);
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
            setLoading(false);
        }
    }

    const dateNow = new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).replace(/\//g, '-');

    const exportProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/products/export', {
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
                a.download = `"LosAlercesReporteProductos${dateNow}.xlsx`;
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

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCallBack = (childData) => {
        if (childData && childData.state) {
            getProducts();
        }
    }

    return (
        <Layout>

            <div className='flex flex-col h-full '>
                <div className='text-white text-3xl font-bold italic mt-8'>
                    <h1>Productos</h1>
                </div>
                {/* boton para agregar productos */}
                <div className='flex  items-center  '>
                    <div
                        onClick={() => setShowModalCreate(true)}
                        className='flex  mt-8 mr-10 w-fit'>
                        <button className='bg-black/20 text-[#fff] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Producto</button>
                    </div>
                    <div
                        onClick={() => exportProducts()}
                        className=' text-white flex items-center mt-[28px] w-[120px] justify-center h-[35px] rounded-full bg-green-500 hover:bg-green-900 select-none cursor-pointer '>
                        <RiFileExcel2Line className='text-white' size={'25px'} /> Descargar
                    </div>
                </div>

                <ModalCreateProduct
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
                        {filteredProducts.map((product, index) => (
                            <ProductsCard
                                key={index}
                                name={product.name}
                                price={product.price}
                                note={product.note}
                                id={product.iD_Productos}
                                parentCallback={handleCallBack}
                            />
                        ))}
                        <div className='pb-[10px]' />
                        {filteredProducts && filteredProducts.length === 0 && (
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



        </Layout>
    )

}

export default adminProducts