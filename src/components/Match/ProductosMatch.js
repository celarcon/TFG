import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class ProductosMatch extends Component {
    state = {
        prod1: ' ',
        prod2: ' ',
        id: ' '
    }
    componentDidMount = async () => {

        var prod1 = await Axios.get('http://localhost:4000/products/' + this.props.prod.idProducto1);
        var prod2 = await Axios.get('http://localhost:4000/products/' + this.props.prod.idProducto2);
        console.log(prod1.data);
        console.log(prod2.data);
        this.setState({ prod1: prod1.data, prod2: prod2.data })

        this.setState({ id: this.props.prod._id })
        console.log(this.props.prod._id);
        console.log(this.state.id);

    }

    render() {
        return (
            <div className="row justify-content-center " style={{ marginTop: '50px'}}>
                <div className="col-sm-4">
                    <Link to={{ pathname: "/UsuarioRelacionado", state: { id: this.state.prod1.idPropietario } }}>
                        ver perfil
                </Link>
                    <p>{this.state.prod1.nombre}</p>
                    <img src={'http://localhost:4000/products/get-image/' + this.state.prod1.image} alt={this.state.prod1.nombre} height="100" width="100"></img>
                    <p>{this.state.prod1.descripcion}</p>
                    <p >
                        <button onClick={() => this.props.contactar(this.state.id)}>Contactar</button>
                        <button onClick={() => this.props.eliminaProd(this.state.id)}>Elminar</button>
                    </p>
                </div>
                <div style={{display: 'flex',alignItems: 'center',paddingRight:'10px'}}>
                <svg width="50px" height="50px" viewBox="0 0 16 16" class="bi bi-arrow-left-right" fill='#002140' xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.146 7.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 11l-2.647-2.646a.5.5 0 0 1 0-.708z" />
                    <path fill-rule="evenodd" d="M2 11a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 11zm3.854-9.354a.5.5 0 0 1 0 .708L3.207 5l2.647 2.646a.5.5 0 1 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z" />
                    <path fill-rule="evenodd" d="M2.5 5a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                </svg>
                </div>
                <div className="col-sm-4">
                    <Link to={{ pathname: "/UsuarioRelacionado", state: { id: this.state.prod2.idPropietario } }}>
                        ver perfil
                </Link>
                    <p>{this.state.prod2.nombre}</p>
                    <img src={'http://localhost:4000/products/get-image/' + this.state.prod2.image} alt={this.state.prod2.nombre} height="100" width="100"></img>
                    <p>{this.state.prod2.descripcion}</p>
                </div>
            </div>
        )
    }
}
