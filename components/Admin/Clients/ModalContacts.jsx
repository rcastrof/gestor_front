import React from 'react'
import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RiCloseFill } from 'react-icons/ri'
import { FaEdit, FaUserCircle } from "react-icons/fa";
import { set, useForm } from 'react-hook-form'
import { BsCheck, BsTrashFill } from 'react-icons/bs';

const ModalContacts = (props) => {

    const { show, onClose, contact, name, phone, address, email, id } = props
    const cancelButtonRef = useRef(null);
    const [saveForm, setSaveForm] = useState(true)

    let { register, handleSubmit, formState: { errors }, clearErrors, reset, setValue } = useForm();

    const onSubmit = async (event) => {

        if (saveForm && (contact.id == null || contact.id == undefined)) {
            setSaveForm(false);
            const contactoName = event.contact_name;
            const contactoLastname = event.contact_lastname;
            const contactoPhone = event.contact_phone;
            const contactoEmail = event.contact_email;

            const data = {
                name,
                phone,
                address,
                email,
                contactoName,
                contactoPhone,
                contactoLastname,
                contactoEmail,

            }

            try {
                const Options = {
                    method: 'POST',
                    body: JSON.stringify({
                        data,
                        id
                    }),

                };
                const response = await fetch('http://localhost:3000/api/clients/edit', Options);
                reset({ contact_name: "", contact_phone: "", contact_email: "", contact_lastname: "" });
                setSaveForm(true);
                onClose();
                props.parentCallback({ state: true, status: response.status });
            } catch (error) {
                console.error('Error al cargar los datos de trabajadores:', error);
            }


        }
        else {
            if (saveForm) {

                // UPDATE
                setSaveForm(false);
                const contactoName = event.contact_name;
                const contactoLastname = event.contact_lastname;
                const contactoPhone = event.contact_phone;
                const contactoEmail = event.contact_email;

                const data = {
                    name,
                    phone,
                    address,
                    email,
                    contactoName,
                    contactoPhone,
                    contactoLastname,
                    contactoEmail,

                }

                console.log(data)

                reset({ contact_name: "", contact_phone: "", contact_email: "" });
                setSaveForm(true);
                onClose();

            }
        }


    };
    const closeModal = () => {

        setValue('contact_name', contact.name, { shouldDirty: true })
        setValue('contact_lastname', contact.lastname, { shouldDirty: true })
        setValue('contact_phone', contact.phone, { shouldDirty: true })
        setValue('contact_email', contact.email, { shouldDirty: true })

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
                                            <FaUserCircle className=' h-[20px] w-[20px] ml-[6px] text-white self-center' />
                                        </div>
                                        <Dialog.Title as="h3" className="text-[20px] font-bold leading-[27px] text-white tracking-[-3%] whitespace-nowrap mb-[29px] mt-[4px]">
                                            Contacto de <br /> {name}
                                        </Dialog.Title>
                                    </div>
                                </div>
                            </div>
                            <div className=' text-white'>
                                {/* editar contactos */}
                                <form onSubmit={handleSubmit(onSubmit)} id="createContact">
                                    <label className='text-black text-sm flex flex-col'>
                                        <div className='mb-[8px] ml-[24px] font-bold leading-[19.07px] tracking-[-5%] text-[14px]  mt-[18px]  text-white'>Nombre</div>
                                        <input
                                            {...register("contact_name", {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })}
                                            name='contact_name' type="text"
                                            defaultValue={contact.contactoName}
                                            className="ml-[24px] border-[2px] border-white/[0.20] bg-transparent rounded-[9px] w-[279px] h-[40px] pl-[16px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white text-[#FAFAFA]"
                                            autoComplete='off'
                                        />

                                        {errors.contact_name && <span className='text-xs text-[#FFFFFF] ml-[24px]'>{errors.contact_name.message}</span>}

                                        <div className='mb-[8px] ml-[24px] font-bold leading-[19.07px] tracking-[-5%] text-[14px] mt-[18px] text-white'>Apellido</div>
                                        <input
                                            {...register("contact_lastname", {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })} name='contact_lastname' type="text"
                                            className="ml-[24px] border-[2px] border-white/[0.20] bg-transparent rounded-[9px] w-[279px] h-[40px] pl-[16px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white text-[#FAFAFA]"
                                            defaultValue={contact.contactoLastname}
                                            autoComplete='off' />
                                        {errors.contact_lastname && <span className='text-xs text-[#FFFFFF] ml-[24px]'>{errors.contact_lastname.message}</span>}



                                        <div className='mb-[8px] ml-[24px] font-bold leading-[19.07px] tracking-[-5%] text-[14px] mt-[18px] text-white'>Teléfono</div>
                                        <input
                                            {...register("contact_phone", {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })} name='contact_phone' type="text"
                                            className="ml-[24px] border-[2px] border-white/[0.20] bg-transparent rounded-[9px] w-[279px] h-[40px] pl-[16px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white text-[#FAFAFA]"
                                            defaultValue={contact.contactoPhone}
                                            autoComplete='off' />
                                        {errors.contact_phone && <span className='text-xs text-[#FFFFFF] ml-[24px]'>{errors.contact_phone.message}</span>}

                                        <div className='mb-[8px] ml-[24px] font-bold leading-[19.07px] tracking-[-5%] text-[14px] mt-[18px] text-white'>Email</div>
                                        <input
                                            {...register("contact_email", {
                                                required: { value: true, message: "* Campo Requerido" },
                                            })} name='contact_email' type="text"
                                            className="ml-[24px] border-[2px] border-white/[0.20] bg-transparent rounded-[9px] w-[279px] h-[40px] pl-[16px] focus:outline-none focus-visible:ring-1 focus-visible:ring-white text-[#FAFAFA]"
                                            defaultValue={contact.contactoEmail}
                                            autoComplete='off' />
                                        {errors.contact_email && <span className='text-xs text-[#FFFFFF] ml-[24px]'>{errors.contact_email.message}</span>}


                                    </label>
                                </form>
                            </div>

                            <div className='flex mt-[20px] mb-5'>
                                {!(contact.id == null || contact.id == undefined) ? <div
                                    className="h-[48px] w-[135px] border-[2px] border-white/[0.20] bg-transparent rounded-[10px] ml-[24px] mr-[9px] text-[16px]  leading-[22px] tracking-[-1px]"
                                    onClick={() => closeModal()}
                                >

                                    <div className='flex ml-[20px] cursor-pointer' onClick={() => { props.showModalDelete() }}>
                                        <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full bg-[#D6E1E7]/25 mt-[10px]">
                                            <BsTrashFill className='self-center w-[14px] h-[14px] text-[#FAFAFA]/60' />
                                        </div>

                                        <div className='text-[#FAFAFA] ml-[8px] mt-[11px] self-center'>Eliminar</div>

                                    </div>

                                </div> : null}
                                {!(contact.id == null || contact.id == undefined) ? <button type="submit"
                                    className="h-[48px] w-[135px] bg-[#D6E1E7]/25 rounded-[10px] mr-[24px] text-[16px] leading-[22px] tracking-[-1px]"
                                    onClick={handleSubmit(onSubmit)}>
                                    <div className='flex ml-[20px]' >
                                        <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full bg-[#D6E1E7]/25">
                                            <BsCheck className='w-[20px] h-[20px] text-white' aria-hidden="true" />
                                        </div>
                                        <div className='text-white ml-[8px] font-bold'>Guardar</div>
                                    </div>
                                </button> : <button type="submit"
                                    className="h-[48px] w-[135px] bg-[#D6E1E7]/25 rounded-[10px] mr-[auto] ml-[auto] text-[16px] leading-[22px] tracking-[-1px] mt-[3.5rem]"
                                    onClick={handleSubmit(onSubmit)}>
                                    <div className='flex ml-[20px]'>
                                        <div className="flex justify-center items-center w-[24px] h-[24px] rounded-full bg-[#D6E1E7]/25">
                                            <BsCheck className='w-[20px] h-[20px] text-white' aria-hidden="true" />
                                        </div>
                                        <div className='text-white ml-[8px] font-bold'>Guardar</div>
                                    </div>
                                </button>}

                            </div>


                        </div>
                    </Transition.Child>
                </div>
            </Dialog >
        </Transition.Root >

    )
}

export default ModalContacts