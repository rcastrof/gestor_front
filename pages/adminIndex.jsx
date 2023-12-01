import Layout from '@components/Layout/Layout';
import React, { useEffect } from 'react';
import { getSession, useSession } from "next-auth/react";
import { decode } from 'next-auth/jwt'; // Import the decode function

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // Aquí puedes hacer la carga inicial de datos si es necesario
  // ...

  return {
    props: { session },
  };
}

const AdminIndex = ({ session }) => {





  // Contenido de la página...
  return (
    <Layout>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className="text-center" style={{marginBottom: 140}}>
          <h1 className="text-6xl text-white font-bold">
            Sistema de Gestión Interna
          </h1>
          <h2 className="text-4xl text-white font-semibold mt-4">
            CONSTRUCTORA LOS ALERCES SPA
          </h2>
        </div>
      </div>
    </Layout>
  );
};

export default AdminIndex;
