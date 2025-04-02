import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

const CrearEmpleadoForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    fechaNacimiento: '',
    direccion: '',
    telefono: '',
    correoElectronico: '',
    puesto: '',
    departamento: '',
    fechaContratacion: '',
    salario: '',
    estadoLaboral: 'Activo',
    usuario: {
      nombreUsuario: '',
      contraseñaHash: '',
      rol: 'Empleado',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('usuario.')) {
      const key = name.split('.')[1];
      setForm({ ...form, usuario: { ...form.usuario, [key]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/Empleados', form);
      alert('Empleado creado exitosamente');
      navigate('/empleados');
    } catch (err) {
      console.error('Error al crear empleado:', err);
      alert('Error al crear empleado');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="space-y-8">
        <div className="border-b border-gray-300 pb-6">
          <h2 className="text-lg font-semibold text-gray-900">Información del Empleado</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input name="nombre" required onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input type="date" name="fechaNacimiento" required onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <input name="direccion" onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input name="telefono" onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input name="correoElectronico" onChange={handleChange}
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Puesto</label>
              <input name="puesto" onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Departamento</label>
              <input name="departamento" onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Fecha de Contratación</label>
              <input type="date" name="fechaContratacion" onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Salario</label>
              <input type="number" name="salario" onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-300 pb-6">
          <h2 className="text-lg font-semibold text-gray-900">Datos de Usuario</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
              <input name="usuario.nombreUsuario" onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input name="usuario.contraseñaHash" type="password" onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="sm:col-span-3 relative">
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <select name="usuario.rol" onChange={handleChange}
                value={form.usuario.rol}
                className="mt-1 appearance-none block w-full rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                <option value="Administrador">Administrador</option>
                <option value="Editor">Editor</option>
                <option value="Empleado">Empleado</option>
                <option value="Auditor">Auditor</option>
              </select>
              <ChevronDownIcon className="absolute right-2 top-9 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" className="text-sm font-semibold text-gray-900">Cancelar</button>
          <button type="submit" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Crear
          </button>
        </div>
      </div>
    </form>
  );
};

export default CrearEmpleadoForm;
