import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';

const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
 };

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
                <h1>Mis Productos</h1>
                <ul className="list-group">
                    {
                        this.state.productos.map((productos, i) =>
                            <li className="list-group-item" key={i} >
                                <div className="row">
                                    <div className="col-sm-12 col-md-2">
                                        <img src={'http://localhost:4000/products/get-image/' + productos.image} alt={productos.nombre} width="100"></img>
                                    </div>
                                    <div className="col-sm-12 col-md-10">
                                        <p><span className="txtNegrita">Nombre:</span> {productos.nombre}</p>
                                        <p><span className="txtNegrita">Descripción: </span>{productos.descripcion}</p>
                                        <p><span className="txtNegrita">Precio mínimo: </span>{productos.precioMin}€ - <span className="txtNegrita">Precio máximo: </span> {productos.precioMax}€</p>
                                        <p><span className="txtNegrita">Fecha de subida: </span>{productos.createdAt}</p>
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
                <button className="goTop" onClick={scrollTop}>
                <svg width="3.5em" height="3.5em" viewBox="0 0 16 16" class="bi bi-arrow-up-circle-fill" fill="rgb(0,40,77)" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-10.646.354a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 6.207V11a.5.5 0 0 1-1 0V6.207L5.354 8.354z"/>
                </svg>
                </button>
            </div>
        )
    }

}
export default MisProductos;