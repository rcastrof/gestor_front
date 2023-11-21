import React, { useState } from 'react'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import ModalEditWorker from './ModalEditWorker';
import ModalDeleteWorker from './ModalDeleteWorker';

const WorkersCard = (props) => {

    const { name, profession, phone, address, email, id, salary, lastname } = props

    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleCallback = (childData) => {
        if (childData && childData.state) {

            props.parentCallback(childData);
        }
    }

    return (
        <div className='bg-black/20 w-60 h-[300px] rounded-[10px] flex flex-col mb-2 '>
            {/* All data from workers */}
            <div className='flex justify-end'>

                <div
                    onClick={() => setShowModalDelete(true)}
                    className='bg-gray-200 text-black rounded-[10px] h-6 w-6 ml-auto self-center flex cursor-pointer mr-4 mt-2 '>
                    <FaTrashAlt className='self-center h-4 w-6' />
                </div>
                <ModalDeleteWorker
                    show={showModalDelete}
                    onClose={() => setShowModalDelete(false)}
                    name={name}
                    id={id}
                    parentCallback={handleCallback}

                />
                <div
                    onClick={() => setShowModalEdit(true)}
                    className='bg-gray-200 text-black rounded-[10px] h-6 w-6 ml-4 self-center flex cursor-pointer mr-4 mt-2 '>
                    <FaEdit className='self-center h-4 w-6' />

                </div>
                <ModalEditWorker
                    show={showModalEdit}
                    onClose={() => setShowModalEdit(false)}
                    name={name}
                    profession={profession}
                    phone={phone}
                    address={address}
                    email={email}
                    id={id}
                    salary={salary}
                    lastname={lastname}
                    parentCallback={handleCallback}
                />
            </div>

            <div className='flex flex-col mx-5 h-[180px] '>
                <p className='text-white text-xl font-bold'>{name} {lastname}</p>
                <p className='text-white mt-2'>Cargo: {profession}</p>
                <p className='text-white mt-2'>Fono: {phone}</p>
                <p className='text-white mt-2'>Mail: <span className="text-sm">{email}</span></p>
                <p className='text-white mt-2'>Direccion: {address}</p>
            </div>


            {/* button */}



        </div>)
}

export default WorkersCard