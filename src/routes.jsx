import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmpleadosList from './pages/EmpleadosList';
import CrearEmpleadoForm from './pages/CrearEmpleadoForm';
import EditarEmpleadoForm from './pages/EditarEmpleadoForm';
import PrivateRoute from './components/PrivateRoute';
import { ROLES } from './utils/roles';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<Login />} />

      {/* Ruta raíz */}
      <Route
        path="/"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.EDITOR, ROLES.AUDITOR, ROLES.EMPLEADO]}>
            <Dashboard />
          </PrivateRoute>
        }
      />

      {/* Rutas protegidas */}
      <Route
        path="/empleados"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.EDITOR, ROLES.AUDITOR]}>
            <EmpleadosList />
          </PrivateRoute>
        }
      />

      <Route
        path="/empleados/crear"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN]}>
            <CrearEmpleadoForm />
          </PrivateRoute>
        }
      />

      <Route
        path="/empleados/:id/editar"
        element={
          <PrivateRoute allowedRoles={[ROLES.ADMIN, ROLES.EDITOR]}>
            <EditarEmpleadoForm />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
    </Routes>
  );
};

export default AppRoutes;
