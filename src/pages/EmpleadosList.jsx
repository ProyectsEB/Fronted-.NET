import { useEffect, useState } from 'react';
import axios from '../api/axiosInstance';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ROLES } from '../utils/roles';
import { Table, Space, Tag, Button, Popconfirm, Skeleton } from 'antd';
import toast from 'react-hot-toast';

const EmpleadosList = () => {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const { user } = useAuth();

  const fetchEmpleados = async () => {
    try {
      setLoading(true);
      setVisible(false);
      const res = await axios.get('/Empleados');
      const empleadosParseados = res.data.map((e) => ({
        key: e.empleadoID,
        nombre: e.nombre || '—',
        puesto: e.puesto || '—',
        rol: e.rol || 'Sin rol', // ← Tu lógica original
        estado: e.estadoLaboral || 'Sin estado',
      }));

      // Simula duración mínima del skeleton
      setTimeout(() => {
        setEmpleados(empleadosParseados);
        setLoading(false);
        setTimeout(() => setVisible(true), 100);
      }, 1500);
    } catch (error) {
      console.error('Error al cargar empleados:', error);
      toast.error('Error al cargar empleados');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleInactivar = async (id) => {
    try {
      await axios.delete(`/Empleados/${id}`);
      toast.success('Empleado inactivado');
      fetchEmpleados(); // recarga la tabla y el empleado aparecerá con estado Inactivo
    } catch (err) {
      console.error('Error al inactivar:', err);
      toast.error('No se pudo inactivar');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'id',
      width: 80,
    },
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Puesto',
      dataIndex: 'puesto',
      key: 'puesto',
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
      render: rol => <Tag color={rol === 'Administrador' ? 'red' : 'blue'}>{rol}</Tag>,
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: estado => <Tag color={estado === 'Activo' ? 'green' : 'volcano'}>{estado}</Tag>,
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_, record) => (
        <Space size="middle">
          {(user.role === ROLES.ADMIN || user.role === ROLES.EDITOR) && (
            <Link to={`/empleados/${record.key}/editar`}>✏️ Editar</Link>
          )}
          {user.role === ROLES.ADMIN && (
            <Popconfirm
              title="¿Está seguro de inactivar este empleado?"
              onConfirm={() => handleInactivar(record.key)}
              okText="Sí"
              cancelText="No"
            >
              <Button type="link" danger>
                ❌ Inactivar
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Empleados</h2>

      {user.role === ROLES.ADMIN && (
        <Link
          to="/empleados/crear"
          className="mb-4 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded shadow transition"
        >
          ➕ Crear Empleado
        </Link>
      )}

      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : (
        <div className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <Table
            columns={columns}
            dataSource={empleados}
            pagination={{ pageSize: 6 }}
            bordered
          />
        </div>
      )}
    </div>
  );
};

export default EmpleadosList;
