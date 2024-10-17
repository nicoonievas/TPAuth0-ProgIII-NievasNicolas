import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, notification } from 'antd';
import axios from 'axios';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} es requerido!',
};

const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

const CrearTasks = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('https://prog-iii-swagger-nievas-nicolas.vercel.app/api/user');
        if (response.data.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        } else {
          console.error('Data is not in expected format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsuarios();
  }, []);

  const onFinish = async (values) => {
    const taskData = {
      name: values.name,
      description: values.description,
      resume: values.resume,
      user: selectedUser?._id,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        'https://prog-iii-swagger-nievas-nicolas.vercel.app/api/task',
        taskData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.status === 200 && !response.status === 201) {
        throw new Error('Error al crear la tarea');
      }

      openNotificationWithIcon('success', 'Tarea agregada', 'La tarea ha sido agregada exitosamente.');
      form.resetFields(); // Limpiar el formulario
      setSelectedUser(null); // Limpiar usuario seleccionado
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      openNotificationWithIcon('error', 'Error', 'Hubo un problema al guardar la tarea.');
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (userId) => {
    const selected = users.find((user) => user._id === userId);
    setSelectedUser(selected);
  };

  return (
    <Form
      {...layout}
      form={form}
      name="crear-tasks"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="name"
        label="Nombre de la Tarea"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Descripción de la tarea"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="resume"
        label="Resumen de la tarea"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="user"
        label="Usuario Seleccionado"
        rules={[{ required: true, message: 'Debe seleccionar un usuario' }]}
      >
        <Select
          showSearch
          placeholder="Buscar usuario"
          optionFilterProp="children"
          onChange={handleUserSelect}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {users.map((user) => (
            <Option key={user._id} value={user._id}>
              {`${user.username} - ${user.documento}`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{ ...layout.wrapperCol, offset: 8 }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          Guardar Tarea
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CrearTasks;
