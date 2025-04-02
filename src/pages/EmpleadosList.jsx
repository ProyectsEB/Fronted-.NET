import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ROLES } from '../utils/roles';

const EmpleadosList = () => {
  const [empleados, setEmpleados] = useState([]);
  const { user } = useAuth();

  const fetchEmpleados = async () => {
    try {
      const res = await axios.get('/Empleados');
      setEmpleados(res.data);
    } catch (error) {
      console.error('Error al cargar empleados:', error);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleInactivar = async (id) => {
    if (confirm('¿Estás seguro de que deseas inactivar este empleado?')) {
      try {
        await axios.delete(`/Empleados/${id}`);
        fetchEmpleados(); // Refresh list
      } catch (err) {
        console.error('Error al inactivar:', err);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Empleados</h2>
      {user.role === ROLES.ADMIN && (
        <Link
        to="/empleados/crear"
        className="mb-4 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded shadow transition"
      >
        ➕ Crear Empleado
      </Link>
      
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                {/* Opcional: checkbox de selección masiva */}
              </th>
              <th scope="col" className="px-6 py-3">Nombre</th>
              <th scope="col" className="px-6 py-3">Puesto</th>
              <th scope="col" className="px-6 py-3">Rol</th>
              <th scope="col" className="px-6 py-3">Estado</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((e) => (
              <tr
                key={e.empleadoID}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  {/* Puedes añadir checkboxes aquí si los necesitas */}
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {e.nombre}
                </th>
                <td className="px-6 py-4">{e.puesto}</td>
                <td className="px-6 py-4">{e.usuario?.rol}</td>
                <td className="px-6 py-4">{e.estadoLaboral}</td>
                <td className="flex items-center px-6 py-4">
                  {(user.role === ROLES.ADMIN || user.role === ROLES.EDITOR) && (
                    <Link
                      to={`/empleados/${e.empleadoID}/editar`}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      ✏️ Editar
                    </Link>
                  )}
                  {user.role === ROLES.ADMIN && (
                    <button
                      onClick={() => handleInactivar(e.empleadoID)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                    >
                      ❌ Inactivar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpleadosList;
