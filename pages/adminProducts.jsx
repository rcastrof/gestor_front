import ProductsCard from '@components/Admin/Products/ProductsCard'
import Layout from '@components/Layout/Layout'
import React from 'react'

const adminProducts = () => {
    return (
        <Layout>

            <div className='flex flex-col h-full '>
                <div className='text-white text-3xl font-bold italic mt-8'>
                    <h1>Productos</h1>
                </div>
                {/* boton para agregar productos */}
                <div className='flex  mt-8 mr-10'>
                    <button className='bg-[#FFD600] text-[#000000] rounded-[10px] h-[45px] w-[160px] font-bold'>Agregar Producto</button>
                </div>
                {/* barra de busqueda */}
                <div className='mx-10 mt-10'>
                    <input className="bg-white/20 rounded-[10px] h-[45px] w-full px-10 text-white" type="text" placeholder="Buscar" />
                </div>
                {/* tarjeta de productos */}
                <div className=' flex mt-8'>
                    <ProductsCard />
                </div>





            </div>

        </Layout>
    )
}

export default adminProducts