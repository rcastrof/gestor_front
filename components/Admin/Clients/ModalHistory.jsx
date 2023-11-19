import React from 'react'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RiCloseFill } from 'react-icons/ri'
import { FaFileInvoiceDollar } from "react-icons/fa";
import { useForm } from 'react-hook-form'

const ModalHistory = (props) => {

    const { show, onClose, name, profession, phone, address, email, id, last_name } = props
    const cancelButtonRef = useRef(null);

    let { register, handleSubmit, formState: { errors }, clearErrors, reset, setValue } = useForm();


    const closeModal = () => {

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
                                            <FaFileInvoiceDollar className=' h-[20px] w-[20px] ml-[6px] text-white self-center' />
                                        </div>
                                        <Dialog.Title as="h3" className="text-[20px] font-bold leading-[27px] text-white tracking-[-3%] whitespace-nowrap mb-[29px] mt-[4px]">
                                            Todas las cotizaciones de <br /> {name}
                                        </Dialog.Title>
                                    </div>
                                </div>
                            </div>
                            <div className='p-5 text-white'>
                                aqui todas las cotizaciones
                            </div>
                            {/* botones de cancelar y guardar */}

                            <div className='flex justify-center mb-5 mt-5'>
                                <div
                                    className="h-[48px] w-[135px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mr-[9px] text-[16px] leading-[22px] tracking-[-1px]"
                                    onClick={() => closeModal()}>
                                    <div className='flex ml-[20px] cursor-pointer'>
                                        <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full bg-[#D6E1E7]/25 mt-[10px]">
                                            <RiCloseFill className='w-[14px] h-[14px] text-[#FFFFFF]/60' aria-hidden="true" />                                 </div>
                                        <div className='text-[#FAFAFA] ml-[8px] mt-[11px]'>Cancelar</div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </Transition.Child>
                </div>
            </Dialog >
        </Transition.Root >

    )
}
export default ModalHistory