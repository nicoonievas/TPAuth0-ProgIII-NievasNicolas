import React, { useState } from 'react';
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ToolOutlined, UserOutlined, RobotOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import CrearUser from './CrearUser';
import { useAuth0 } from '@auth0/auth0-react';
import CrearTasks from './CrearTasks';
import TablaTasks from './TablaTasks';
import TablaUsers from './TablaUsers';

const { Header, Sider, Content } = Layout;

const LeftMenu = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const { user, isAuthenticated, logout } = useAuth0();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item
            icon={<RobotOutlined style={{ fontSize: '25px', display: 'block', margin: '0 auto' }} />}
            style={{ height: '70px', textAlign: 'center', pointerEvents: 'none' }}
          >Robotin System</Menu.Item>
          <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/home">Home</Link></Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}><Link to="/verUsers">Ver Users</Link></Menu.Item>
          <Menu.Item key="3" icon={<ToolOutlined />}><Link to="/verTasks">Ver Tasks</Link></Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}><Link to="/agregarUsuario">Add Users</Link></Menu.Item>
          <Menu.Item key="5" icon={<ToolOutlined />}><Link to="/agregarTasks">Add Tasks</Link></Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '16px' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className="Container" style={{ display: 'flex', alignItems: 'center' }}>
              {isAuthenticated && (
                <div className="UserInfo" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={user.picture} alt={user.name} style={{ width: '40px', borderRadius: '50%', marginRight: '10px' }} />
                  <span>{user.name}</span>
                  <Button
                    type="primary"
                    onClick={() => logout({ returnTo: window.location.origin })}
                    style={{ marginLeft: '10px' }}
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            marginTop: '20px', // Agregar separación
          }}
        >
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/agregarUsuario" element={<CrearUser />} />
            <Route path="/agregarTasks" element={<CrearTasks />} />
            <Route path="/verTasks" element={<TablaTasks />} />
            <Route path="/verUsers" element={<TablaUsers />} />

          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LeftMenu;

