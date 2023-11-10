import React from 'react'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RiCloseFill } from 'react-icons/ri'
import { BsCheck } from 'react-icons/bs'
import { FaEdit } from "react-icons/fa";
import { useForm } from 'react-hook-form'




const ModalEditWorker = (props) => {

    const { show, onClose, name, profession, phone, address, email, id , last_name} = props
    const cancelButtonRef = useRef(null);
    const [saveForm, setSaveForm] = useState(true)

    let { register, handleSubmit, formState: { errors }, clearErrors, reset, setValue } = useForm();


    const onSubmit = async (event) => {
        if (saveForm) {
            setSaveForm(false)

            const name = event.name
            const last_name = event.last_name
            const profession = event.profession
            const phone = event.phone
            const address = event.address
            const email = event.email


            const data = {
                name: name,
                last_name: last_name,
                profession: profession,
                phone: phone,
                address: address,
                email: email,                
            }

            console.log(data)
            setSaveForm(true)
            console.log('Modifacando datos del id', id)
            onClose();
        }


    }
    const closeModal = () => {

        setValue('name', name)
        setValue('last_name', last_name)
        setValue('profession', profession)
        setValue('phone', phone)
        setValue('address', address)
        setValue('email', email)

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
                        <div className="inline-block w-[327px] align-bottom bg-gradient-to-b from-[#333333] to-[#000000] text-left overflow-hidden shadow-xl transform transition-all my-[2.5rem] m:my-[2rem] rounded-[1.875rem]">
                            {/*Header modal */}
                            <div className="px-4 pt-5 justify-end">
                                <div className="flex flex-col">
                                    <div className='flex justify-end mr-[0.5rem]'>
                                        <div className="flex justify-center items-center w-[1.5rem] h-[1.5rem] rounded-full  bg-[#D6E1E7]/25 cursor-pointer" onClick={() => closeModal()}>
                                            <RiCloseFill className='w-[1.5rem] h-[1.5rem]  text-[#FFFFFF]/60' aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div className="ml-[0.5rem] flex">
                                        <div className="h-[32px] w-[32px] mr-[8px] bg-[#232323] rounded-full flex">
                                            <FaEdit className=' h-[20px] w-[20px] ml-[6px] text-white self-center' />
                                        </div>
                                        <Dialog.Title as="h3" className="text-[20px] font-bold leading-[27px] text-white tracking-[-3%] whitespace-nowrap mb-[29px] mt-[4px]">
                                            Editar a<br /> {name}
                                        </Dialog.Title>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} id='formEditWorker'>
                                <div className='h-[350px] overflow-auto gt-scroll scroll-smooth'>
                                    {/*Contenido*/}
                                    <hr className='bg-white/10 border-none h-[8px] mb-[16px]' />


                                    <div className='h-fit flex flex-col'>
                                        <label className='text-white text-[14px] font-bold ml-[24px] mt-[24px]'>Nombres</label>
                                        <input
                                            {...register('name', {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })}
                                            type='text'
                                            name='name'
                                            autoComplete='off'
                                            defaultValue={name}
                                            className='h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px] text-white'
                                        />
                                        {errors.name && <span className='text-[#FF5757] text-[12px] ml-[24px]'>{errors.name.message}</span>}

                                        <label className='text-white text-[14px] font-bold ml-[24px] mt-[24px]'>Apellidos</label>
                                        <input
                                            {...register('last_name', {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })}
                                            type='text'
                                            name='last_name'
                                            autoComplete='off'
                                            defaultValue={last_name}
                                            className='h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px] text-white'
                                        />
                                        {errors.last_name && <span className='text-[#FF5757] text-[12px] ml-[24px]'>{errors.last_name.message}</span>}

                                        <label className='text-white text-[14px] font-bold ml-[24px] mt-[24px]'>Cargo</label>
                                        <input
                                            {...register('profession', {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })}
                                            type='text'
                                            autoComplete='off'
                                            name='profession'
                                            defaultValue={profession}
                                            className='h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px] text-white'
                                        />
                                        {errors.profession && <span className='text-[#FF5757] text-[12px] ml-[24px]'>{errors.profession.message}</span>}

                                        <label className='text-white text-[14px] font-bold ml-[24px] mt-[24px]'>Fono</label>
                                        <input
                                            {...register('phone', {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })}
                                            type='text'
                                            name='phone'
                                            defaultValue={phone}
                                            className='h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px] text-white'
                                        />
                                        {errors.phone && <span className='text-[#FF5757] text-[12px] ml-[24px]'>{errors.phone.message}</span>}

                                        <label className='text-white text-[14px] font-bold ml-[24px] mt-[24px]'>Email</label>
                                        <input
                                            {...register('email', {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })}
                                            type='text'
                                            name='email'
                                            defaultValue={email}
                                            className='h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px] text-white'
                                        />
                                        {errors.email && <span className='text-[#FF5757] text-[12px] ml-[24px]'>{errors.email.message}</span>}

                                        <label className='text-white text-[14px] font-bold ml-[24px] mt-[24px]'>Direccion</label>
                                        <input
                                            {...register('address', {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })}
                                            type='text'
                                            name='address'
                                            defaultValue={address}
                                            className='h-[48px] w-[279px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mt-[8px] text-[16px] leading-[22px] tracking-[-1px] text-white'
                                        />
                                        {errors.address && <span className='text-[#FF5757] text-[12px] ml-[24px]'>{errors.address.message}</span>}
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
                                        className="h-[48px] w-[135px] bg-[#232323] rounded-[10px] mr-[24px] text-[16px] leading-[22px] tracking-[-1px]">
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

export default ModalEditWorker