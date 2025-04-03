import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker, InputNumber, Select, Row, Col, Card, message, Spin } from 'antd';
import axios from '../api/axiosInstance';
import dayjs from 'dayjs';

const { Option } = Select;

const EditarEmpleadoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

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

        form.setFieldsValue({
          ...empleado,
          fechaNacimiento: dayjs(empleado.fechaNacimiento),
          fechaContratacion: dayjs(empleado.fechaContratacion),
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al obtener empleado:', err);
        message.error('Error al obtener el empleado');
        setLoading(false);
      });
  }, [id, form]);

  const onFinish = async (values) => {
    const formatted = {
      ...values,
      fechaNacimiento: values.fechaNacimiento?.format('YYYY-MM-DD'),
      fechaContratacion: values.fechaContratacion?.format('YYYY-MM-DD'),
    };

    try {
      await axios.put(`/Empleados/${id}`, formatted);
      message.success('Empleado actualizado');
      navigate('/empleados');
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
      message.error('No se pudo actualizar el empleado');
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Spin size="large" /></div>;
  }

  return (
    <Card title="Editar Empleado" bordered={false} style={{ maxWidth: 800, margin: 'auto' }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col xs={24} sm={12}>
            <Form.Item name="nombre" label="Nombre" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="fechaNacimiento" label="Fecha de Nacimiento" rules={[{ required: true }]}>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="direccion" label="Dirección" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="telefono" label="Teléfono" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="correoElectronico" label="Correo Electrónico" rules={[{ type: 'email' }]}>
              <Input />
            </Form.Item>
            <Form.Item name="puesto" label="Puesto">
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item name="departamento" label="Departamento">
              <Input />
            </Form.Item>
            <Form.Item name="fechaContratacion" label="Fecha de Contratación">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name="salario" label="Salario">
              <InputNumber
                style={{ width: '100%' }}
                min={0}
                formatter={(value) => `Q ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={(value) => value.replace(/Q\s?|,/g, '')}
              />
            </Form.Item>
            <Form.Item name="estadoLaboral" label="Estado Laboral">
              <Select>
                <Option value="Activo">Activo</Option>
                <Option value="Inactivo">Inactivo</Option>
              </Select>
            </Form.Item>
            <Form.Item name={['usuario', 'nombreUsuario']} label="Nombre de Usuario">
              <Input />
            </Form.Item>
            <Form.Item name={['usuario', 'contraseñaHash']} label="Contraseña">
              <Input.Password />
            </Form.Item>
            <Form.Item name={['usuario', 'rol']} label="Rol">
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
            Actualizar Empleado
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditarEmpleadoForm;
