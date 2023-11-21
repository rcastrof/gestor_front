import ModalCreateProduct from '@components/Admin/Products/ModalCreateProduct'
import ProductsCard from '@components/Admin/Products/ProductsCard'
import Layout from '@components/Layout/Layout'
import React, { useEffect, useState } from 'react'
import { Bars } from 'react-loader-spinner'

const adminProducts = () => {

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
                <div
                    onClick={() => setShowModalCreate(true)}
                    className='flex  mt-8 mr-10 w-fit'>
                    <button className='bg-black/20 text-[#fff] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Producto</button>
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