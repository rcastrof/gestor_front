import Layout from '@components/Layout/Layout'
import React from 'react'

const adminClients = () => {
    return (
        <Layout>

            <div className='flex flex-col  h-full'>
                {/* barra de busqueda */}
                <div className='mx-10 mt-10'>
                    <input className="bg-white/20 rounded-[10px] h-[45px] w-full px-10 text-white" type="text" placeholder="Buscar" />
                </div>
            </div>
            

        </Layout>)
}

export default adminClients