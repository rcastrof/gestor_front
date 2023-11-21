'use client'
import { useForm } from 'react-hook-form'
import { signIn } from "next-auth/react";
import { useState } from 'react';
import { useRouter } from 'next/navigation'


export default function Home(props) {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter()
  const [loginError, setLoginError] = useState(null)
  const [loading, setLoading] = useState(false);



  const onSubmit = async (event) => {


    const email = event.email;
    const pass = event.password;




    setLoginError(null)
    const autenticar = await signIn('credentials', {
      redirect: false,
      email: email,
      password: pass,

    });
    if (autenticar && autenticar.ok) {

      router.push("/adminIndex")


    } else if (autenticar.error) {


      setLoginError("Usuario o Contraseña Incorrectos")
      setLoading(false);


    }

  };

  return (

    <>
      <div className="bg-gradient-to-b from-[#7ac68d] to-[#7c8c84] h-screen">

        <div className="mx-auto my-auto w2 min-h-screen flex items-center justify-center">

        <img src="/src/Logo.png" alt="Logo" style={{marginRight: 200, width: 800, height: 800, marginBottom: 50}}/> 

          <div className="bg-black/50 w-80 h-[30rem] backdrop-opacity-20 rounded-[10px] flex flex-col font-body items-center" style={{ marginRight: 300, marginBottom: 120}}>


            <h1 className="text-4xl text-white mt-10">Inicia sesión</h1>
            <p className="text-xs text-white opacity-80 mt-2">Ingresa tus datos o solicita tu cuenta al admin </p>

            <div className="w-4/5 h-[1px] bg-white/20 mt-8"></div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col w-4/5 mt-6">

              <label className="text-white text-sm">Email</label>
              <input
                {...register("email", {
                  required: { value: true, message: "* Campo Requerido" },
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "* Formato inválido" }
                })}
                name='email'
                placeholder="Email"
                type='text'
                autoComplete='off'
                className="bg-black/20 rounded-[10px] h-[2rem] px-2 text-white" />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}



              <label className="text-white text-sm mt-5">Contraseña</label>
              <input
                {...register("password", {
                  required: { value: true, message: "* Campo Requerido" },

                })}
                name="password"
                type="password"
                className="bg-black/20 rounded-[10px] h-[2rem] px-2 text-white"
                placeholder="Contraseña" />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              {loginError && <p className="text-red-500 text-xs">{loginError}</p>}



              <button
                type="submit"
                className="bg-[#083c3c] rounded-[10px] h-[2rem] mt-5 font-semibold text-sm text-white"

              >Iniciar sesión</button>

              <button onClick={() => router.push('/register')} className="mt-4 text-white">
                ¿No tienes cuenta? Regístrate aquí
              </button>

            </form>


            <p className="text-xs text-white opacity-80 mt-10">© 2023 Todos los derechos reservados. </p>

          </div>

        </div>


      </div>
    </>
  )
}

