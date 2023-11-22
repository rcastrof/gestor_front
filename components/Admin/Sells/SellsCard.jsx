import React, { useEffect, useState } from 'react'
import { FaTrashAlt, FaEdit, FaFilePdf } from "react-icons/fa";
import PDFFile from '../PDF/PDFFile';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ModalDeleteSell from './ModalDeleteSell';
import ModalEditSell from './ModalEditSell';


const SellsCard = (props) => {
    const { name, id, products, workers, sell, clients } = props

    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [total, setTotal] = useState(0);
    const [ownClient, setOwnClient] = useState([]);
    const [thisDate , setThisDate] = useState('');

    const [selectedProducts, setSelectedProducts] = useState([])
    const [selectedWorkers, setSelectedWorkers] = useState([])

    //usefect para sumar todo dentro de products y workers

    useEffect(() => {
        const getFormattedDate = () => {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); // Enero es 0
            const yyyy = today.getFullYear();
            return `${dd}/${mm}/${yyyy}`;
        };
        const date = getFormattedDate();
        setThisDate(date)
    }, [])


    useEffect(() => {
        let total = 0;
        let totalWorkers = 0;
        const allproducts = selectedProducts
        const allworkers = selectedWorkers
        allproducts?.forEach(product => {
            total += product.price * product.cantidad
        });

        allworkers?.forEach(worker => {
            totalWorkers += worker.salary
        }
        );
        setTotal(total + totalWorkers)


    }, [products, workers])

    useEffect(() => {
        async function fetchWorkersFromSells() {
            await fetchWorkersFromSell()
        }
        fetchWorkersFromSells()

        console.log(selectedWorkers)
    }, [sell, workers])

    useEffect(() => {
        async function fetchProductsFromSells() {
            await fetchProductsAndQuantityFromSell()
        }
        fetchProductsFromSells()
    }, [sell, products])


    const fetchProductsAndQuantityFromSell = async () => {
        try {
            // Verificar si sell.productosIds es un objeto
            if (typeof sell.productosIds === 'object' && sell.productosIds !== null) {
                const selectedProducts = Object.entries(sell.productosIds).map(([productID, quantity]) => {
                    // Buscar el producto en el array de productos
                    const product = products.find(product => product.iD_Productos === parseInt(productID));

                    // Verificar si se encontró el producto
                    if (product) {
                        return {
                            ...product,
                            cantidad: parseInt(quantity), // Añadir la cantidad al objeto del producto
                        };
                    }

                    return null; // Retorna null si el producto no se encuentra
                }).filter(product => product !== null); // Filtrar productos que no se encontraron

                // Establecer los productos seleccionados
                setSelectedProducts(selectedProducts);

            } else {
                console.error('Error: sell.productosIds no es un objeto');
            }
        } catch (error) {
            console.error('Error al obtener los productos desde las ventas:', error);
        }
    };

    const fetchWorkersFromSell = async () => {
        try {
            // Obtener los trabajadores cuyos iD_Personal están en el array sell.personalIds
            const selectedWorkers = workers.filter(worker => sell.personalIds.includes(worker.iD_Personal));

            // Establecer los trabajadores seleccionados
            setSelectedWorkers(selectedWorkers);

        } catch (error) {
            console.error('Error al obtener los trabajadores desde las ventas:', error);
        }
    };

    useEffect(() => {
        async function fetchClientFromSells() {
            await fetchClientFromSell()
        }
        fetchClientFromSells()
    }, [sell, clients])

    const handleCallback = (childData) => {
        if (childData && childData.state) {

            props.parentCallback(childData);
        }
    }

    const fetchClientFromSell = async () => {

        const client = clients.find(client => client.iD_Cliente === sell.iD_Cliente)
        setOwnClient(client)
    }


    return (
        <div className='bg-black/20 w-60 h-[220px] rounded-[10px] flex flex-col mb-2 '>
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
                <p className='text-white text-sm italic font-semibold mt-1'>Cliente: {ownClient?.name}</p>
                {/* total */}
                <div className='flex mt-auto mb-1'>
                    <p className='text-white text-2xl italic font-semibold ml-2 '>Total: ${total}</p>
                </div>

            </div>

            {/* button */}

            <div className='flex justify-center mt-8 '>
                <div
                    onClick={() => setShowModalEdit(true)}
                    className='bg-[#083c3c] hidden text-gray-300 cursor-pointer rounded-[10px] h-[40px] w-[80px] font-bold border-2 border-opacity-10 border-black '>
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
                        document={<PDFFile sell={sell} products={selectedProducts} workers={selectedWorkers} date={thisDate}  clientname={ ownClient?.name }/>}
                        fileName="Cotizacion" >
                        {({ loading }) => (loading ? 'Loading document...' : <div className='flex p-1.5'>
                            <FaFilePdf className='self-center h-4 w-6' /> PDF
                        </div>)}
                    </PDFDownloadLink>

                </div>
                {/* modal edit */}
            </div>
            {/*  <div className=' flex mt-auto mb-1'>
                <p className='text-white text-sm italic font-semibold ml-2 '>Fecha: {created}</p>
            </div> */}


        </div>)
}


export default SellsCard