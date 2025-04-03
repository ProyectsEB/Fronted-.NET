import React from 'react';
import { Form, Input, Button, DatePicker, InputNumber, Select, Row, Col, Card, message } from 'antd';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CrearEmpleadoForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post('/Empleados', values);
      message.success('Empleado creado exitosamente');
      navigate('/empleados');
    } catch (err) {
      console.error('Error al crear empleado:', err);
      message.error('Error al crear empleado');
    }
  };

  return (
    <Card title="Crear Nuevo Empleado" bordered={false} style={{ maxWidth: 800, margin: 'auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          estadoLaboral: 'Activo',
          usuario: { rol: 'Empleado' },
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
            >
              <Input placeholder="Nombre completo" />
            </Form.Item>
            <Form.Item
              name="fechaNacimiento"
              label="Fecha de Nacimiento"
              rules={[{ required: true, message: 'Por favor seleccione la fecha de nacimiento' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="direccion"
              label="Dirección"
              rules={[{ required: true, message: 'Por favor ingrese la dirección' }]}
            >
              <Input placeholder="Dirección completa" />
            </Form.Item>
            <Form.Item
              name="telefono"
              label="Teléfono"
              rules={[{ required: true, message: 'Por favor ingrese el teléfono' }]}
            >
              <Input placeholder="Número de teléfono" />
            </Form.Item>
            <Form.Item
              name="correoElectronico"
              label="Correo Electrónico"
              rules={[
                { required: true, message: 'Por favor ingrese el correo electrónico' },
                { type: 'email', message: 'Ingrese un correo electrónico válido' },
              ]}
            >
              <Input placeholder="Correo electrónico" />
            </Form.Item>
            <Form.Item
              name="puesto"
              label="Puesto"
              rules={[{ required: true, message: 'Por favor ingrese el puesto' }]}
            >
              <Input placeholder="Puesto de trabajo" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              name="departamento"
              label="Departamento"
              rules={[{ required: true, message: 'Por favor ingrese el departamento' }]}
            >
              <Input placeholder="Departamento" />
            </Form.Item>
            <Form.Item
              name="fechaContratacion"
              label="Fecha de Contratación"
              rules={[{ required: true, message: 'Por favor seleccione la fecha de contratación' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              name="salario"
              label="Salario"
              rules={[{ required: true, message: 'Por favor ingrese el salario' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                formatter={(value) =>
                  `Q ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/Q\s?|,/g, '')}
              />
            </Form.Item>
            <Form.Item
              name="estadoLaboral"
              label="Estado Laboral"
              rules={[{ required: true, message: 'Por favor seleccione el estado laboral' }]}
            >
              <Select>
                <Option value="Activo">Activo</Option>
                <Option value="Inactivo">Inactivo</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={['usuario', 'nombreUsuario']}
              label="Nombre de Usuario"
              rules={[{ required: true, message: 'Por favor ingrese el nombre de usuario' }]}
            >
              <Input placeholder="Nombre de usuario" />
            </Form.Item>
            <Form.Item
              name={['usuario', 'contraseñaHash']}
              label="Contraseña"
              rules={[{ required: true, message: 'Por favor ingrese la contraseña' }]}
            >
              <Input.Password placeholder="Contraseña" />
            </Form.Item>
            <Form.Item
              name={['usuario', 'rol']}
              label="Rol"
              rules={[{ required: true, message: 'Por favor seleccione el rol' }]}
            >
              <Select>
                <Option value="Administrador">Administrador</Option>
                <Option value="Editor">Editor</Option>
                <Option value="Empleado">Empleado</Option>
                <Option value="Auditor">Auditor</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ textAlign: 'right' }}>
          <Button type="primary" htmlType="submit">
            Crear Empleado
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CrearEmpleadoForm;
