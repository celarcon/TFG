import React, { Component } from 'react';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    UploadOutlined,
    TagOutlined 
  } from '@ant-design/icons';


const { Sider } = Layout;

class Sidebar extends Component {

    state = {
        collapsed: false,
        productos:[]
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    // prodSelec = async e =>{
    //   this.props.prodSelecionado(e);
    // };

    componentDidMount= async ()=>{

      console.log(this.props)

        //sacamos el id del propietario
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
          idPropietario: decoded._id
        });
        console.log(this.state.idPropietario);
        const res = await Axios.get('http://localhost:4000/products/misProductos/' + decoded._id);
        this.setState({productos: res.data});

        //console.log(this.state.idPropietario);
    };

render(){
    return(
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
          collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>

          <div className="logo"/>
          <Menu theme="dark" mode="inline">{/* defaultSelectedKeys={['user']}>*/} 
          <Menu.Item defaultChecked key="user" icon={<UserOutlined />}>
          <Link to="/Usuario">
                Perfil
              </Link>
            </Menu.Item>
          {
            this.state.productos.map(producto =>
                <Menu.Item key={producto._id} onClick={()=>this.props.prodSelecionado(producto._id)} icon={<TagOutlined />}>
                  <Link to="/relacionados">
                  {producto.nombre} 
                  </Link>
                </Menu.Item>)
          }
            <Menu.Item key="upload" icon={<UploadOutlined />}>
                <Link to="/home/AñadirProducto">
                    Añadir Producto 
                </Link>
            </Menu.Item>
          </Menu>
        </Sider>   
    );
};
}

export default Sidebar;