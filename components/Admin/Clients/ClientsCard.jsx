import React, { useState } from 'react'
import { FaTrashAlt, FaEdit, FaUserCircle, FaFileInvoiceDollar } from "react-icons/fa";
import ModalEditClient from './ModalEditClient';
import ModalDeleteClient from './ModalDeleteClient';
import ModalHistory from './ModalHistory';
import ModalContacts from './ModalContacts';
import ModalDeleteContact from './ModalDeleteContact';

const ClientsCard = (props) => {

    const { name, phone, address, email, id, contact } = props

    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalHistory, setShowModalHistory] = useState(false);
    const [showModalContacts, setShowModalContacts] = useState(false);
    const [showModalDeleteContact, setShowModalDeleteContact] = useState(false);

    const handleCallback = (childData) => {
        if (childData && childData.state) {

            props.parentCallback(childData);
        }
    }

    const changeToDelete = () => {
        setShowModalContacts(false)
        setTimeout(() => {
            setShowModalDeleteContact(true)
        }, 500)

    }


    return (
        <div className='bg-black/20 w-60 h-[300px] rounded-[10px] flex flex-col mb-2 '>
            {/* All data from workers */}
            <div className='flex gap-5 mb-2'>
                <div
                    onClick={() => setShowModalDelete(true)}
                    className='bg-gray-200 text-black rounded-[10px] h-6 w-6 ml-auto flex cursor-pointer mt-2 '>
                    <FaTrashAlt className='self-center h-4 w-6' />
                </div>
                <ModalDeleteClient
                    show={showModalDelete}
                    onClose={() => setShowModalDelete(false)}
                    parentCallback={handleCallback}
                    name={name}
                    id={id}

                />
                <div
                    onClick={() => setShowModalEdit(true)}
                    className='bg-gray-200 text-black rounded-[10px] h-6 w-6  self-center flex cursor-pointer mr-4 mt-2 '>
                    <div className='flex justify-center p-0.5'>
                        <FaEdit className='self-center h-4 w-6' />
                    </div>
                </div>
                <ModalEditClient
                    show={showModalEdit}
                    onClose={() => setShowModalEdit(false)}
                    parentCallback={handleCallback}
                    name={name}
                    phone={phone}
                    address={address}
                    email={email}
                    contact={contact}
                    id={id}
                />
            </div>
            <div className='flex flex-col mx-5 h-[180px]'>
                <p className='text-white text-xl font-bold'>{name}</p>
                <p className='text-white mt-2'>Fono: {phone}</p>
                <p className='text-white mt-2'>Mail: {email}</p>
                <p className='text-white mt-2'>Direccion: {address}</p>
            </div>
            {/* button */}

            <div className='flex justify-center gap-2 mt-6'>
                <div
                    onClick={() => setShowModalHistory(true)}
                    className='bg-[#083c3c] text-gray-300 cursor-pointer rounded-[10px] h-[40px] w-[105px] font-bold border-2 border-opacity-10 border-black '>
                    <div className='flex justify-center p-1.5'>
                        <FaFileInvoiceDollar className='self-center h-4 w-6' /> Historial
                    </div>
                </div>
                <ModalHistory
                    show={showModalHistory}
                    parentCallback={handleCallback}
                    onClose={() => setShowModalHistory(false)}
                    name={name}
                    id={id} />


                <div
                    onClick={() => setShowModalContacts(true)}
                    className='bg-gray-200 text-black cursor-pointer rounded-[10px] h-[40px] w-[105px] font-bold border-2  '>
                    <div className='flex justify-center p-1'>
                        <FaUserCircle className='self-center h-4 w-6' />  Contacto
                    </div>
                </div>
                <ModalContacts
                    show={showModalContacts}
                    onClose={() => setShowModalContacts(false)}
                    parentCallback={handleCallback}
                    name={name}
                    phone={phone}
                    address={address}
                    email={email}
                    contact={contact}
                    id={id}
                    showModalDelete={changeToDelete}
                />
                <ModalDeleteContact
                    show={showModalDeleteContact}
                    onClose={() => setShowModalDeleteContact(false)}
                    contactId={contact.id}
                    parentCallback={handleCallback}
                />

            </div>

        </div>)
}

export default ClientsCard