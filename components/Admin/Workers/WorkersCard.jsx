import React, { useState } from 'react'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ModalEditWorker from './ModalEditWorker';
import ModalDeleteWorker from './ModalDeleteWorker';

const WorkersCard = (props) => {

    const { name, profession, phone, address, email, id, last_name, salary } = props

    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);


    return (
        <div className='bg-white/5 w-60 h-[300px] rounded-[10px] flex flex-col mb-2 '>
            {/* All data from workers */}
            <div 
            onClick={() => setShowModalDelete(true)}
            className='bg-gray-200 text-black rounded-[10px] h-6 w-6 ml-auto self-center flex cursor-pointer mr-4 mt-2 '>
                <FaTrashAlt className='self-center h-4 w-6' />
            </div>
            <ModalDeleteWorker 
                show = {showModalDelete}
                onClose = {() => setShowModalDelete(false)}
                name = {name + ' ' + last_name}
                id = {id}

            />
            <div className='flex flex-col mx-5 h-[180px]'>
                <p className='text-white text-xl font-bold'>{name} {last_name}</p>
                <p className='text-white mt-2'>Cargo: {profession}</p>
                <p className='text-white mt-2'>Fono: {phone}</p>
                <p className='text-white mt-2'>Mail: {email}</p>
                <p className='text-white mt-2'>Direccion: {address}</p>
            </div>
            {/* button */}

            <div className='flex justify-center mt-8'>
                <div
                    onClick={() => setShowModalEdit(true)}
                    className='bg-[#232323] text-gray-300 cursor-pointer rounded-[10px] h-[40px] w-[80px] font-bold border-2 border-opacity-10 border-black '>
                    <div className='flex p-1.5'>
                        <FaEdit className='self-center h-4 w-6' /> Editar
                    </div>
                </div>
                <ModalEditWorker
                    show={showModalEdit}
                    onClose={() => setShowModalEdit(false)}
                    name={name}
                    last_name={last_name}
                    profession={profession}
                    phone={phone}
                    address={address}
                    email={email}
                    id={id}
                    salary={salary}
                />

            </div>

        </div>)
}

export default WorkersCard