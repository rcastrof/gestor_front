import React, { useEffect } from 'react'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RiCloseFill } from 'react-icons/ri'
import { GoAlert } from 'react-icons/go'
import { useRouter } from "next/router";

const ModalDeleteWorker = (props) => {

    const { show, onClose, name, id } = props;
    const cancelButtonRef = useRef(null);
    const { push } = useRouter();

    const closeModal = () => {
        onClose();
    }

    const handleDelete = async () => {

        try {
            const Options = {
                method: 'POST',
                body: JSON.stringify({
                    id
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                
            };
            const response = await fetch(`http://localhost:3000/api/workers/delete`, Options);
            props.parentCallback({state: true, status: response.status});

            closeModal();
        } catch (error) {
            console.error('Error al borrar el producto:', error);
        } 


    }



    return (
        <Transition.Root show={show} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-autogrcontactId" initialFocus={cancelButtonRef} onClose={() => closeModal()} >
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
                        <div className="inline-block w-[327px] h-[246px] align-bottom bg-[#033739] text-left  shadow-xl transform transition-all my-[6rem] m:my-[15rem] rounded-[1.875rem]">
                            {/*Header modal */}
                            <div className="px-4 pt-5 justify-end">
                                <div className="flex flex-col">
                                    <div className='flex justify-end mr-[0.5rem]'>
                                        <div className="flex justify-center items-center w-[1.5rem] h-[1.5rem] rounded-full bg-[#F5F5F5] cursor-pointer" onClick={() => closeModal()}>
                                            <RiCloseFill className='w-[1.5rem] h-[1.5rem] text-[#000]/60' aria-hidden="true" />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="flex h-[120px] ml-[1rem] ">
                                <GoAlert className='h-[80px] w-[80px] text-white self-center mr-[8px]' />
                                <div className='leading-[19.07px] tracking-[-5%] text-[20px] self-center text-[#FAFAFA] font-bold'>  ¿Seguro que deseas eliminar a {name} ? </div>
                            </div>



                            <div className='flex mt-[1rem]'>
                                <button
                                    className="h-[48px] w-[136px] bg-[#D6E1E7]/25 rounded-[10px] ml-[24px] font-bold text-[16px] leading-[22px] tracking-[-1px] "
                                    onClick={() => handleDelete()}>
                                    <div className='flex'>
                                        <div className='text-white self-center ml-[auto] mr-[auto]'>Si, eliminar</div>
                                    </div>
                                </button>
                                <div
                                    className="flex h-[48px] w-[136px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] mr-[24px] ml-[9px] text-[16px]  
                                    cursor-pointer leading-[22px] tracking-[-1px]"
                                    onClick={() => closeModal()}>
                                    <div className='text-[#FAFAFA] self-center ml-[auto] mr-[auto]'>No</div>
                                </div>
                            </div>



                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>)
}

export default ModalDeleteWorker