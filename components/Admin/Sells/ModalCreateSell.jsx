import React from 'react'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RiCloseFill } from 'react-icons/ri'
import { BsCheck } from 'react-icons/bs'
import { useForm } from 'react-hook-form'
import { IoMdAddCircle, IoMdCloseCircle } from 'react-icons/io'
import { FaEye, FaEyeSlash, FaEdit } from 'react-icons/fa';


const ModalCreateSell = (props) => {

    const { show, onClose, clients, products, workers } = props
    const cancelButtonRef = useRef(null);
    const [saveForm, setSaveForm] = useState(true)

    const [selectedWorkers, setSelectedWorkers] = useState([])
    const [selectedWorkerId, setSelectedWorkerId] = useState([])
    const [selectedIdFromWorker, setSelectedIdFromWorker] = useState([])

    const [HideWorkers, setHideWorkers] = useState(false)

    const [selectedProducts, setSelectedProducts] = useState([])
    const [selectedProductId, setSelectedProductId] = useState([])
    const [selectedIdFromProduct, setSelectedIdFromProduct] = useState([])

    const [HideProducts, setHideProducts] = useState(false)

    let { register, handleSubmit, formState: { errors }, clearErrors, reset, setValue } = useForm();

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

            try {
                const Options = {
                    method: 'POST',
                    body: JSON.stringify({ data })
                };
                const response = await fetch(`http://localhost:3000/api/sells/create`, Options);
                setSaveForm(true)
                closeModal();
                props.parentCallback({ state: true, status: response.status });
            }
            catch (error) {
                console.error('Error al crear el producto:', error);
            }
        }
    }

    const addWorker = (event) => {

        event.preventDefault()

        if (JSON.parse(selectedWorkerId) !== "") {

            const selectedWorker = workers.find((worker) => worker.name === JSON.parse(selectedWorkerId).name)
            if (selectedWorker) {
                setSelectedWorkers([...selectedWorkers, selectedWorker])
                console.log(selectedWorkers)
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

            const selectedProduct = products.find((product) => product.name === selectedProductId)
            if (selectedProduct) {
                setSelectedIdFromProduct({
                    ...selectedIdFromProduct,
                    [selectedProduct.iD_Productos]: 0, // Inicializar la cantidad en 0
                });
                console.log(selectedIdFromProduct)
                setSelectedProducts([...selectedProducts, selectedProduct])
                console.log(selectedProducts, 'selected')
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

        console.log(selectedIdFromProduct, 'selectedIdFromProduct')
    }

    const updateQuantity = (index, newQuantity, product) => {

        const updatedProducts = [...selectedProducts];
        updatedProducts[index].quantity = newQuantity;

        const updatedIds = { ...selectedIdFromProduct };
        updatedIds[product.iD_Productos] = newQuantity;
        setSelectedIdFromProduct(updatedIds);

        console.log(selectedIdFromProduct, 'selectedIdFromProduct')

        setSelectedProducts(updatedProducts);
    };


    const closeModal = () => {

        setValue('name', '')
        setValue('price', '')


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
                                            Crear Cotización<br />
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
                                            className='h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px]'
                                        >
                                            <option value='' className='text'>Selecciona un cliente</option>
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
                                                onChange={(event) => setSelectedWorkerId(event.target.value)}
                                                className=' h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px]'
                                            >
                                                <option value=''>Selecciona un trabajador</option>
                                                {workers.map((worker, index) => (
                                                    <option key={index} value={JSON.stringify(worker)}>{worker.name} {worker.lastname} </option>
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
                                            {selectedWorkers.length === 0 ? (
                                                <div className=' mx-auto my-auto text-white'>
                                                    <p>Sin Trabajadores</p>
                                                </div>
                                            ) : (
                                                selectedWorkers.map((worker, index) => (
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
                                            {selectedProducts.length === 0 ? (
                                                <div className=' mx-auto my-auto text-white'>
                                                    <p>Sin Productos</p>
                                                </div>
                                            ) : (
                                                selectedProducts.map((product, index) => (
                                                    <div key={index} className='flex h-[48px] rounded-[10px] bg-[#FAFAFA] bg-opacity-10 mr-[16px] mb-[8px]'>
                                                        <div className='flex'>
                                                            <div className='ml-[14px] text-[#FAFAFA] mr-[10px] my-[10px] text-[14px] font-bold self-center'>
                                                                {product.name}
                                                            </div>
                                                            {/* cantidad */}
                                                            <div className='ml-[14px] text-[#FAFAFA] mr-[10px] my-[10px] text-[14px] font-bold self-center'>
                                                                <input
                                                                    {...register('quantity', {
                                                                        required: { value: true, message: "* Campo Requerido" },
                                                                    })}
                                                                    value={product.quantity || ''}
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

export default ModalCreateSell