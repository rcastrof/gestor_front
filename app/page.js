import { useForm } from 'react-hook-form'

export default function Home() {
  return (

    <div className="bg-gradient-to-b from-[#333333] to-[#000000] h-screen">

      <div className="mx-auto my-auto w2 min-h-screen flex items-center justify-center">

        <div className="bg-white/20 w-80 h-[30rem] backdrop-opacity-20 rounded-[10px] flex flex-col font-body items-center">

          <h1 className="text-4xl text-white mt-10">Inicia sesión</h1>
          <p className="text-xs text-white opacity-80 mt-2">Ingresa tus datos o solicita tu cuenta al admin </p>

          <div className="w-4/5 h-[1px] bg-white/20 mt-8"></div>

          <form className="flex flex-col w-4/5 mt-6">

            <label className="text-white text-sm">Email</label>
            <input className="bg-white/20 rounded-[10px] h-[2rem] px-2 text-white" type="email" placeholder="Email" />

            <label className="text-white text-sm mt-5">Contraseña</label>
            <input className="bg-white/20 rounded-[10px] h-[2rem] px-2 text-white" type="password" placeholder="Contraseña" />

            <button className="bg-[#FFD600] rounded-[10px] h-[2rem] mt-5 font-semibold text-sm">Iniciar sesión</button>

          </form>


          <p className="text-xs text-white opacity-80 mt-10">© 2023 Todos los derechos reservados. </p>

        </div>

      </div>


    </div>
  )
}
