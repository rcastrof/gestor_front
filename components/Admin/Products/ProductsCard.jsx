import React from 'react'

const ProductsCard = () => {
    return (
        <div className='bg-white/5 w-80 h-[300px]  rounded-[10px] flex flex-col '>
            <div className='border mx-10 mt-4 h-2/4'>
                <p className=''>Foto</p>
            </div>
            <div className='flex flex-col mx-10 mt-4'>
                <p className='text-white text-xl font-bold'>$ Precio</p>
                <p className='text-white mt-2'>Descripcion</p>
            </div>
        </div>)
}

export default ProductsCard
