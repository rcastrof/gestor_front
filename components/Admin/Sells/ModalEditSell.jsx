import React from 'react'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RiCloseFill } from 'react-icons/ri'
import { BsCheck } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { IoMdAddCircle, IoMdCloseCircle } from 'react-icons/io'
import { FaEye, FaEyeSlash, FaEdit } from 'react-icons/fa';

const ModalEditSell = (props) => {

    const { show, onClose, clients, products, workers, sell } = props
    const cancelButtonRef = useRef(null);
    const [saveForm, setSaveForm] = useState(true)

    const [selectedWorkers, setSelectedWorkers] = useState([])
    const [selectedWorkerId, setSelectedWorkerId] = useState([])
    const [selectedIdFromWorker, setSelectedIdFromWorker] = useState([])
    const [firstId, setFirstId] = useState([])

    const [HideWorkers, setHideWorkers] = useState(false)

    const [selectedProducts, setSelectedProducts] = useState([])
    const [selectedProductId, setSelectedProductId] = useState([])
    const [selectedIdFromProduct, setSelectedIdFromProduct] = useState([])


    const [HideProducts, setHideProducts] = useState(false)

    const [selectedEditClient, setSelectedEditClient] = useState([])

    const [thisIDSell, setThisIDSell] = useState(sell.iD_Cotizacion)

    const [defaultSellName, setDefaultSellName] = useState('')
    let { register, handleSubmit, formState: { errors }, clearErrors, reset, setValue } = useForm();

    useEffect(() => {
        setSelectedEditClient(sell.iD_Cliente)
        setDefaultSellName(sell.name)
    }, [sell])

    useEffect(() => {
        async function fetchWorkersFromSells() {
            await fetchWorkersFromSell()
        }
        fetchWorkersFromSells()
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
                console.log(selectedProducts)

                // Establecer las IDs de los productos seleccionados
                const selectedProductIds = selectedProducts.map(product => product.iD_Productos);
                setSelectedIdFromProduct(selectedProductIds);
                console.log(selectedProductIds)



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

            // Obtener las IDs de los trabajadores seleccionados
            const selectedWorkerIds = selectedWorkers.map(worker => worker.iD_Personal);

            // Establecer los trabajadores seleccionados
            setSelectedWorkers(selectedWorkers);
            setFirstId(JSON.stringify(selectedWorkers[0]));

            // Establecer las IDs de los trabajadores seleccionados
            setSelectedIdFromWorker(selectedWorkerIds);

        } catch (error) {
            console.error('Error al obtener los trabajadores desde las ventas:', error);
        }
    };

    const onSubmit = async (event) => {

        if (saveForm) {
            setSaveForm(false)

            const name = event.name
            const iD_Cliente = event.client
            const personalIds = selectedIdFromWorker
            const productosIds = selectedIdFromProduct


            const data = {
                name,
                iD_Cliente,
                personalIds,
                productosIds,
                quantityofproduct: "",
            }
            console.log(data)

            try {
                const Options = {
                    method: 'POST',
                    body: JSON.stringify({
                        data,
                        thisIDSell
                    }),


                };
                const response = await fetch('http://localhost:3000/api/sells/edit', Options);


                setSaveForm(true)
                closeModal();
                props.parentCallback({ state: true, status: response.status });
            } catch (error) {
                console.error(error);
            }
        }
    }

    const addWorker = (event) => {

        event.preventDefault()

        if (JSON.parse(selectedWorkerId) !== "") {

            const selectedWorker = workers.find((worker) => worker.name === JSON.parse(selectedWorkerId).name)
            if (selectedWorker) {
                setSelectedWorkers([...selectedWorkers, selectedWorker])
                setSelectedIdFromWorker([...selectedIdFromWorker, selectedWorker.iD_Personal]); // Agrega el id al array
                setSelectedWorkerId([]); // reset the input
            }

        }
    }

    const removeWorker = (index, worker) => {

        const updatedWorkers = selectedWorkers.filter((_, i) => i !== index)
        setSelectedWorkers(updatedWorkers)

        const updatedIds = selectedIdFromWorker.filter(id => id !== worker.iD_Personal);
        setSelectedIdFromWorker(updatedIds);

    }

    const addProduct = (event) => {

        event.preventDefault()

        if (selectedProductId) {
            console.log(selectedProductId)
            console.log(selectedIdFromProduct)

            const selectedProduct = products.find((product) => product.name === selectedProductId)
            if (selectedProduct) {
                setSelectedIdFromProduct(
                    [...selectedIdFromProduct, selectedProduct.iD_Productos] 
                );
                console.log(selectedIdFromProduct)
                setSelectedProducts([...selectedProducts, selectedProduct])
                setSelectedProductId(''); // reset the input
            }
        }
    }

    const removeProduct = (index, product) => {
        const updatedProducts = selectedProducts.filter((_, i) => i !== index)
        setSelectedProducts(updatedProducts)

        const updatedIds = { ...selectedIdFromProduct };
        delete updatedIds[product.iD_Productos];
        setSelectedIdFromProduct(updatedIds);

    }

    const updateQuantity = (index, newQuantity, product) => {

        const updatedProducts = [...selectedProducts];
        updatedProducts[index].quantity = newQuantity;

        const updatedIds = { ...selectedIdFromProduct };
        updatedIds[product.iD_Productos] = newQuantity;
        setSelectedIdFromProduct(updatedIds);

        setSelectedProducts(updatedProducts);
    };

    const closeModal = () => {

        clearErrors()

        onClose();
    }

    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-autogrid" initialFocus={cancelButtonRef} onClose={() => closeModal()} >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center content-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 "
                        enterTo="opacity-100 translate-y-0"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 "
                        leaveTo="opacity-0 translate-y-4 "
                    >
                        <div className="inline-block w-[327px] align-bottom bg-[#033739] text-left overflow-hidden shadow-xl transform transition-all my-[2.5rem] m:my-[2rem] rounded-[1.875rem]">
                            {/*Header modal */}
                            <div className="px-4 pt-5 justify-end">
                                <div className="flex flex-col">
                                    <div className='flex justify-end mr-[0.5rem]'>
                                        <div className="flex justify-center items-center w-[1.5rem] h-[1.5rem] rounded-full  bg-[#D6E1E7]/25 cursor-pointer" onClick={() => closeModal()}>
                                            <RiCloseFill className='w-[1.5rem] h-[1.5rem]  text-[#FFFFFF]/60' aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div className="ml-[0.5rem] flex">
                                        <div className="h-[32px] w-[32px] mr-[8px] bg-[#D6E1E7]/25 rounded-full flex">
                                            <FaEdit className=' h-[20px] w-[20px] ml-[6px] text-white self-center' />
                                        </div>
                                        <Dialog.Title as="h3" className="text-[20px] font-bold leading-[27px] text-white tracking-[-3%] whitespace-nowrap mb-[29px] mt-[4px]">
                                            Editar producto<br />
                                        </Dialog.Title>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} id='formCreateProduct'>
                                <div className='h-[350px] overflow-auto gt-scroll scroll-smooth'>
                                    {/*Contenido*/}
                                    <hr className='bg-white/10 border-none h-[8px] mb-[16px]' />


                                    <div className='h-fit flex flex-col'>
                                        <label className='text-white text-[14px] font-bold ml-[24px] mt-[24px]'>Nombre de referencia</label>
                                        <input
                                            {...register('name', {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })}
                                            type='text'
                                            name='name'
                                            defaultValue={sell.name}
                                            autoComplete='off'

                                            className='h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px] text-white'
                                        />
                                        {errors.name && <span className='text-[#FF5757] text-[12px] ml-[24px]'>{errors.name.message}</span>}

                                        {/* Select con clients  */}
                                        <label className='text-white text-[14px] font-bold ml-[24px] mt-[24px]'>Cliente</label>
                                        <select
                                            {...register('client', {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })}
                                            name='client'
                                            list='clients'
                                            defaultValue={selectedEditClient}
                                            className='h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px] '
                                        >
                                            <option value=''>Selecciona un cliente</option>
                                            {clients.map((client, index) => (
                                                <option key={index} value={client.iD_Cliente}>{client.name}</option>
                                            ))}
                                        </select>
                                        {errors.client && <span className='text-[#FF5757] text-[12px] ml-[24px]'>{errors.client.message}</span>}

                                        {/* Select de  workers  */}
                                        <label className='text-white text-[14px] font-bold ml-[24px] mt-[24px]'>Trabajadores</label>
                                        <div className='flex'>
                                            <select

                                                {...register('workers', {
                                                    required: { value: true, message: "* Campo Requerido" },
                                                })}
                                                name='workers'
                                                list='workers'
                                                autoComplete='off'
                                                type='text'
                                                defaultValue={firstId}
                                                onChange={(event) => setSelectedWorkerId(event.target.value)}
                                                className='h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px] '
                                            >
                                                <option value=''>Selecciona un trabajador</option>
                                                {workers.map((worker, index) => (
                                                    <option key={index} value={JSON.stringify(worker)}>{worker.name} {worker.lastname}  </option>
                                                ))}
                                            </select>
                                            <div onClick={addWorker} className='flex cursor-pointer self-center ml-2'>
                                                <IoMdAddCircle className="text-[#FFFFFF] w-[35px] h-[35px]" />
                                            </div>
                                        </div>
                                        {errors.workers && <span className='text-[#FF5757] text-[12px] ml-[24px]'>{errors.workers.message}</span>}

                                        {/* div con una pestaña para minimizar el div  */}
                                        <div className='text-white text-xl ml-auto mr-5' onClick={() => setHideWorkers(!HideWorkers)}>
                                            {HideWorkers ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                        <div className={`flex ml-[24px] mr-[24px] flex-wrap h-fit mt-[15px] ${HideWorkers ? 'hidden' : ''}`}>
                                            {/* Contenido del div */}
                                            {selectedWorkers?.length === 0 ? (
                                                <div className=' mx-auto my-auto text-white'>
                                                    <p>Sin Trabajadores</p>
                                                </div>
                                            ) : (
                                                selectedWorkers?.map((worker, index) => (
                                                    <div key={index} className='flex h-[48px] rounded-[10px] bg-[#FAFAFA] bg-opacity-10 mr-[16px] mb-[8px]'>
                                                        <div className='ml-[14px] text-[#FAFAFA] mr-[10px] my-[10px] text-[14px] font-bold self-center'>
                                                            {worker.name} {worker.lastname}
                                                        </div>
                                                        <IoMdCloseCircle
                                                            onClick={() => removeWorker(index, worker)}
                                                            className='self-center font-[#424040] h-[16px] w-[16px] mr-[10px] cursor-pointer'
                                                        />
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        {/* Select con products y cantidad del mismo producto */}
                                        <label className='text-white text-[14px] font-bold ml-[24px] mt-[24px]'>Productos</label>
                                        <div className='flex'>
                                            <select
                                                {...register('products', {
                                                    required: { value: true, message: "* Campo Requerido" },
                                                })}
                                                name='products'
                                                list='products'
                                                autoComplete='off'
                                                type='text'
                                                onChange={(event) => setSelectedProductId(event.target.value)}
                                                className='h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px]'
                                            >
                                                <option value=''>Selecciona un producto</option>
                                                {products.map((product, index) => (
                                                    <option key={index} value={product.name}>{product.name} </option>
                                                ))}
                                            </select>
                                            <div onClick={addProduct} className='flex cursor-pointer self-center ml-2'>
                                                <IoMdAddCircle className="text-[#FFFFFF] w-[35px] h-[35px]" />
                                            </div>
                                        </div>
                                        {errors.products && <span className='text-[#FF5757] text-[12px] ml-[24px]'>{errors.products.message}</span>}

                                        {/* div con una pestaña para minimizar el div  */}
                                        <div className='text-white text-xl ml-auto mr-5' onClick={() => setHideProducts(!HideProducts)}>
                                            {HideProducts ? <FaEyeSlash /> : <FaEye />}
                                        </div>

                                        <div className={`flex ml-[24px] mr-[24px] flex-wrap h-fit mt-[15px] ${HideProducts ? 'hidden' : ''}`}>
                                            {/* Contenido del div */}
                                            {selectedProducts?.length === 0 ? (
                                                <div className=' mx-auto my-auto text-white'>
                                                    <p>Sin Productos</p>
                                                </div>
                                            ) : (
                                                selectedProducts?.map((product, index) => (
                                                    <div key={index} className='flex h-[48px] rounded-[10px] bg-[#FAFAFA] bg-opacity-10 mr-[16px] mb-[8px]'>
                                                        <div className='flex'>
                                                            <div className='ml-[14px] text-[#FAFAFA] mr-[10px] my-[10px] text-[14px] font-bold self-center'>
                                                                {product.name}
                                                            </div>
                                                            {/* cantidad */}
                                                            <div className='ml-[14px] text-[#FAFAFA] mr-[10px] my-[10px] text-[14px] font-bold self-center'>
                                                                <input
                                                                    {...register(`quantity-${index}`, {
                                                                    })}
                                                                    defaultValue={product.cantidad}
                                                                    type='number'
                                                                    onChange={(e) => updateQuantity(index, e.target.value, product)}
                                                                    name='quantity'
                                                                    autoComplete='off'
                                                                    className='h-[40px] mb-1.5 w-[60px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px] text-white'
                                                                />

                                                                {errors.quantity && <span className='text-[#FF5757] text-[12px] ml-[24px]'>{errors.quantity.message}</span>}
                                                            </div>
                                                            <IoMdCloseCircle
                                                                onClick={() => removeProduct(index, product)}
                                                                className='self-center font-[#424040] h-[16px] w-[16px] mr-[10px] cursor-pointer'
                                                            />
                                                        </div>

                                                    </div>
                                                ))
                                            )}
                                        </div>

                                    </div>
                                </div>
                                {/* botones de cancelar y guardar */}

                                <div className='flex mt-[30px] pb-10'>
                                    <div
                                        className="h-[48px] w-[135px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mr-[9px] text-[16px] leading-[22px] tracking-[-1px]"
                                        onClick={() => closeModal()}>
                                        <div className='flex ml-[20px] cursor-pointer'>
                                            <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full bg-[#D6E1E7]/25 mt-[10px]">
                                                <RiCloseFill className='w-[14px] h-[14px] text-[#FFFFFF]/60' aria-hidden="true" />                                 </div>
                                            <div className='text-[#FAFAFA] ml-[8px] mt-[11px]'>Cancelar</div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="h-[48px] w-[135px] bg-[#D6E1E7]/25 rounded-[10px] mr-[24px] text-[16px] leading-[22px] tracking-[-1px]">
                                        <div className='flex ml-[20px]'>
                                            <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full bg-[#D6E1E7]/25">
                                                <BsCheck className='w-[20px] h-[20px] text-white' aria-hidden="true" />
                                            </div>
                                            <div className='text-white ml-[8px] font-bold'>Guardar</div>
                                        </div>
                                    </button>
                                </div>
                            </form>



                        </div>
                    </Transition.Child>
                </div>
            </Dialog >
        </Transition.Root >
    )
}

export default ModalEditSell