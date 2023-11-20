import React, { useEffect, useState } from 'react'
import { FaTrashAlt, FaEdit, FaFilePdf } from "react-icons/fa";
import PDFFile from '../PDF/PDFFile';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ModalDeleteSell from './ModalDeleteSell';
import ModalEditSell from './ModalEditSell';


const SellsCard = (props) => {
    const { name, id, created, products, workers, client, sell, clients } = props

    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [total, setTotal] = useState(0);

    //usefect para sumar todo dentro de products y workers

    useEffect(() => {
        let total = 0;
        let totalWorkers = 0;
        const allproducts = sell.selectedProducts
        const allworkers = sell.selectedWorkers
        allproducts?.forEach(product => {
            total += product.price * product.quantity
        });

        allworkers?.forEach(worker => {
            totalWorkers += worker.salary
        }
        );
        setTotal(total + totalWorkers)
        

    }, [products, workers])

    const handleCallback = (childData) => {
        if (childData && childData.state) {

            props.parentCallback(childData);
        }
    }
    
    return (
        <div className='bg-white/5 w-60 h-[220px] rounded-[10px] flex flex-col mb-2 '>
            {/* All data from workers */}
            <div
                onClick={() => setShowModalDelete(true)}
                className='bg-gray-200 text-black rounded-[10px] h-6 w-6 ml-auto self-center flex cursor-pointer mr-4 mt-2 '>
                <FaTrashAlt className='self-center h-4 w-6' />
            </div>
            <ModalDeleteSell
                show={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                name={name}
                id={id}
                parentCallback={handleCallback}
            />
            <div className='flex flex-col mx-5 h-[80px]'>
                <p className='text-white text-xl font-bold'>{name}</p>
                <p className='text-white text-sm italic font-semibold mt-1'>Cliente: {client?.name}</p>
                {/* total */}
                <div className='flex mt-auto mb-1'>
                    <p className='text-white text-2xl italic font-semibold ml-2 '>Total: ${total}</p>
                </div>

            </div>

            {/* button */}

            <div className='flex justify-center mt-8 '>
                <div
                    onClick={() => setShowModalEdit(true)}
                    className='bg-[#232323] text-gray-300 cursor-pointer rounded-[10px] h-[40px] w-[80px] font-bold border-2 border-opacity-10 border-black '>
                    <div className='flex p-1.5'>
                        <FaEdit className='self-center h-4 w-6' /> Editar
                    </div>
                </div>
                <ModalEditSell
                    show={showModalEdit}
                    onClose={() => setShowModalEdit(false)}
                    name={name}
                    id={id}
                    products={products}
                    workers={workers}
                    clients={clients}
                    sell={sell}
                    parentCallback={handleCallback}
                />
                <div
                    className='bg-gray-200 text-black cursor-pointer rounded-[10px] h-[40px] w-[80px] font-bold border-2 border-opacity-10 border-black ml-2'
                >
                    <PDFDownloadLink
                        document={<PDFFile sell={sell} products={sell.selectedProducts} workers={sell.selectedWorkers} />}
                        fileName="Cotizacion" >
                        {({ loading }) => (loading ? 'Loading document...' : <div className='flex p-1.5'>
                            <FaFilePdf className='self-center h-4 w-6' /> PDF
                        </div>)}
                    </PDFDownloadLink>

                </div>
                {/* modal edit */}
            </div>
            <div className=' flex mt-auto mb-1'>
                <p className='text-white text-sm italic font-semibold ml-2 '>Fecha: {created}</p>
            </div>


        </div>)
}


export default SellsCard