import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

const EditarEmpleadoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    axios.get(`/Empleados/${id}`)
      .then((res) => {
        const empleado = res.data;
        if (!empleado.usuario) {
          empleado.usuario = {
            nombreUsuario: '',
            contraseñaHash: '',
            rol: 'Empleado',
          };
        }
        setForm(empleado);
      })
      .catch((err) => {
        console.error('Error al cargar empleado:', err);
        alert('Error al obtener el empleado');
      });
  }, [id]);

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
      await axios.put(`/Empleados/${id}`, form);
      alert('Empleado actualizado');
      navigate('/empleados');
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('No se pudo actualizar el empleado');
    }
  };

  if (!form) return <p className="text-center mt-10 text-gray-600">Cargando datos...</p>;

  return (
    <form onSubmit={handleSubmit} className="p-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="space-y-8">
        <div className="border-b border-gray-300 pb-6">
          <h2 className="text-lg font-semibold text-gray-900">Editar Empleado</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input name="nombre" value={form.nombre || ''} onChange={handleChange} required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Fecha de Nacimiento</label>
              <input type="date" name="fechaNacimiento" value={form.fechaNacimiento || ''} onChange={handleChange} required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-6">
              <label className="block text-sm font-medium text-gray-700">Dirección</label>
              <input name="direccion" value={form.direccion || ''} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input name="telefono" value={form.telefono || ''} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input name="correoElectronico" value={form.correoElectronico || ''} onChange={handleChange} type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Puesto</label>
              <input name="puesto" value={form.puesto || ''} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Departamento</label>
              <input name="departamento" value={form.departamento || ''} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Fecha de Contratación</label>
              <input type="date" name="fechaContratacion" value={form.fechaContratacion || ''} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Salario</label>
              <input type="number" name="salario" value={form.salario || ''} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-300 pb-6">
          <h2 className="text-lg font-semibold text-gray-900">Datos de Usuario</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
              <input name="usuario.nombreUsuario" value={form.usuario?.nombreUsuario || ''} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input name="usuario.contraseñaHash" type="password" value={form.usuario?.contraseñaHash || ''} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-3 relative">
              <label className="block text-sm font-medium text-gray-700">Rol</label>
              <select name="usuario.rol" value={form.usuario?.rol || 'Empleado'} onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-sm">
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
            Actualizar
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditarEmpleadoForm;
