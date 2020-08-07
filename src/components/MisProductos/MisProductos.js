import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';


class MisProductos extends Component {

    state = {
        productos: [],
        idPropietario: ' '
    }

    componentDidMount = async () => {

        if (!localStorage.usertoken)
            this.props.history.push(`/`);

        //sacamos el id del propietario
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
            idPropietario: decoded._id
        });

        const res = await Axios.get('http://localhost:4000/products/misProductos/' + decoded._id);
        this.setState({ productos: res.data });
    }

    eliminaProd = async (e) => {
        console.log(e);
        await Axios.delete('http://localhost:4000/products/' + e);
        const res = await Axios.get('http://localhost:4000/products/misProductos/' + this.state.idPropietario);
        this.setState({ productos: res.data });
    }

    render() {
        return (
            <div className="col-md-12">
                <h1>MisProductos</h1>
                <ul className="list-group">
                    {
                        this.state.productos.map((productos, i) =>
                            <li className="list-group-item" key={i} >
                                <div className="row">
                                    <div className="col-sm-12 col-md-2">
                                        <img src={'http://localhost:4000/products/get-image/' + productos.image} alt={productos.nombre} width="100"></img>
                                    </div>
                                    <div className="col-sm-12 col-md-10">
                                        <p>Nombre: {productos.nombre}</p>
                                        <p>Descripcion: {productos.descripcion}</p>
                                        <p>Precio minimo: {productos.precioMin} - Precio Máximo {productos.precioMax}</p>
                                        <p>Fecha de subida: {productos.createdAt}</p>
                                    </div>
                                    <div className="col-md-5 offset-md-7">
                                        <button className="btnEliminar" type="submit" onClick={() => this.eliminaProd(productos._id)}>Elminar</button>
                                        <Link to={{ pathname: "/EditarProducto", state: { id: productos } }}>
                                            <button className="btnEditar">editar</button>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        )
    }

}
export default MisProductos;