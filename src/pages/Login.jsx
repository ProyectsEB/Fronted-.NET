import { useState } from 'react'
import axios from '../api/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

const Login = () => {
  const [form, setForm] = useState({ nombreUsuario: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post('/Empleados/login', form)
      login(res.data)
      toast.success('Inicio de sesión exitoso 👋')
      
      setTimeout(() => {
        navigate('/empleados')
      }, 1500)

    } catch (err) {
      console.error('Login error:', err)
      toast.error('Credenciales incorrectas ❌')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
              Iniciar sesión
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nombreUsuario" className="block text-sm font-medium text-gray-900">
                  Usuario
                </label>
                <div className="mt-2">
                  <input
                    id="nombreUsuario"
                    name="nombreUsuario"
                    type="text"
                    required
                    value={form.nombreUsuario}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Contraseña
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={form.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-gray-300 px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default Login
