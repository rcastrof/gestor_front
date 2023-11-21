// register.jsx
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [registerError, setRegisterError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        setRegisterError(null);

        try {
            const response = await axios.post('https://localhost:7013/v1/login/register', data);

            if (response.status === 200) {
                router.push('/');
            } else {
                // Aquí podrías manejar diferentes tipos de errores
                setRegisterError(response.data.message || "Error en el registro. Inténtalo de nuevo.");
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            setRegisterError(error.response?.data?.message || "Error en el registro. Inténtalo de nuevo.");
        }
    };
0
    return (
        <>
            <div className="bg-gradient-to-b from-[#7ac68d] to-[#7c8c84] h-screen">
                <div className="mx-auto my-auto w-full min-h-screen flex items-center justify-center">

                    <img src="/src/Logo.png" alt="Logo" style={{ marginRight: 200, width: 800, height: 800, marginBottom: 100 }} />

                    <div className="bg-black/50 w-80 h-[40rem] backdrop-opacity-20 rounded-[10px] flex flex-col font-body items-center" style={{ marginRight: 300 }}>
                        <h1 className="text-5xl text-white mt-10 ">Registro</h1>
                        <p className="text-xl text-white opacity-80 mt-2">Crea tu cuenta</p>

                        <div className="w-4/5 h-[1px] bg-white/20 mt-8"></div>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-4/5 mt-6">
                            <input {...register('nombre', { required: true })} placeholder="Nombre" type="text" className="bg-black/20 rounded-[10px] h-[2rem] px-2 text-white mb-4" />
                            {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre.message}</p>}

                            <input {...register('apellido', { required: true })} placeholder="Apellido" type="text" className="bg-black/20 rounded-[10px] h-[2rem] px-2 text-white mb-4" />
                            {errors.apellido && <p className="text-red-500 text-xs">{errors.apellido.message}</p>}

                            <input {...register('rut', { required: true })} placeholder="RUT" type="text" className="bg-black/20 rounded-[10px] h-[2rem] px-2 text-white mb-4" />
                            {errors.rut && <p className="text-red-500 text-xs">{errors.rut.message}</p>}

                            <input {...register('email', { required: true })} placeholder="Email" type="email" className="bg-black/20 rounded-[10px] h-[2rem] px-2 text-white mb-4" />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

                            <input {...register('password', { required: true })} placeholder="Contraseña" type="password" className="bg-black/20 rounded-[10px] h-[2rem] px-2 text-white mb-4" />
                            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

                            <input {...register('confirmPassword', { required: true })} placeholder="Confirmar contraseña" type="password" className="bg-black/20 rounded-[10px] h-[2rem] px-2 text-white mb-4" />
                            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}

                            <button type="submit" disabled={loading} className="bg-[#083c3c] rounded-[10px] h-[2rem] mt-5 font-semibold text-white">Registrarse</button>
                            {registerError && <p className="text-red-500 text-xs mt-2">{registerError}</p>}
                        </form>

                        <button onClick={() => router.push('/')} className="mt-4 text-white">
                            ¿Ya tienes cuenta? Inicia sesión aquí
                        </button>

                        <p className="text-xs text-white opacity-80 mt-10">© 2023 Todos los derechos reservados. </p>
                    </div>
                </div>
            </div>
        </>
    );
}
