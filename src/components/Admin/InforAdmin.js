import React, { Component } from 'react';
import axios from 'axios';

export default class InforAdmin extends Component {
    state={
        interesados: null,
        relacionados: null,
        productos: null,
        usuarios: null
    }
    logOut= e =>{
        e.preventDefault();
        localStorage.removeItem('admintoken');
        this.props.history.push(`/`);
      }
      componentDidMount=async()=>{
        var usuarios = await axios.get('http://localhost:4000/users');
        var productos = await axios.get('http://localhost:4000/products/count');
        var interesados = await axios.get('http://localhost:4000/interesados');
        var relacionados = await axios.get('http://localhost:4000/relacionados');
        this.setState({interesados: interesados.data});
        this.setState({relacionados: relacionados.data});
        this.setState({usuarios: usuarios.data});
        this.setState({productos: productos.data});
      }
    render() {
        return (
            <div>
                {localStorage.admintoken ?
                <div className="container">
                    <h1>InforAdmin</h1>
                    <p>Numero de usuarios: {this.state.usuarios}</p>
                    <p>Numero de productos: {this.state.productos}</p>
                    <p>Numero de productos interesados: {this.state.interesados}</p>
                    <p>Numero de productos relacionados: {this.state.relacionados}</p>
                    <button onClick={this.logOut.bind(this)}>Cerrar sesion admin</button>
                </div>
                :
                this.props.history.push(`/Admin`)}
            </div>
        )
    }
}
