import React, { Component } from 'react';
import Axios from 'axios';

class MisProductos extends Component {

    state = {
        productos:[]
    }

    async componentDidMount(){
        const res = await Axios.get('http://localhost:4000/products');
        this.setState({productos: res.data});

        console.log(this.state.productos);
    }

    render() {
        return (
            <div className="row">
                <h1>MisProductos</h1>
                {
                    this.state.productos.map(productos =>
                    <li>
                        {productos.nombre}
                        <img src={'http://localhost:4000/products/get-image/'+productos.image} alt={productos.nombre} width="100"></img>
                        {productos.descripcion}
                    </li>
                    )
                }
            </div>
        )}

}
export default MisProductos;