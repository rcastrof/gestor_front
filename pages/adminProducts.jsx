import ModalCreateProduct from '@components/Admin/Products/ModalCreateProduct'
import ProductsCard from '@components/Admin/Products/ProductsCard'
import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'

const adminProducts = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [showModalCreate, setShowModalCreate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('/data/productos.json');
                if (!response.ok) {
                    throw new Error('No se pudieron cargar los datos');
                }
                const data = await response.json();
                setProducts(data.products);
                console.log(data.products)
            } catch (error) {
                console.error('Error al cargar los datos de productos:', error);
            }
        };

        fetchData();
        setLoading(false);

    }, []);

    return (
        <Layout>

            <div className='flex flex-col h-full '>
                <div className='text-white text-3xl font-bold italic mt-8'>
                    <h1>Productos</h1>
                </div>
                {/* boton para agregar productos */}
                <div
                    onClick={() => setShowModalCreate(true)}
                    className='flex  mt-8 mr-10'>
                    <button className='bg-gray-200 text-[#000000] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Producto</button>
                </div>
                <ModalCreateProduct
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
                        {products.map((product, index) => (
                            <ProductsCard
                                key={index}
                                name={product.name}
                                price={product.price}                                
                                note={product.note}
                                id={product.id}
                            />
                        ))}
                        <div className='pb-[10px]' />
                        {products && products.length === 0 && (
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