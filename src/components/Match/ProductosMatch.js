import React, { Component } from 'react';
import Axios from 'axios';

export default class ProductosMatch extends Component {
    state={
        prod1:' ',
        prod2: ' '
    }
    componentDidMount = async() =>{
        console.log(this.props.prod.idProducto1);
        var prod1 = await Axios.get('http://localhost:4000/products/'+this.props.prod.idProducto1);
        var prod2 = await Axios.get('http://localhost:4000/products/'+this.props.prod.idProducto2);
        console.log(prod1.data);
        this.setState({prod1: prod1.data, prod2: prod2.data})
    }

    render() {
        return (
            <div>
                {this.state.prod1.nombre} - 
                {this.state.prod2.nombre}
                <button>contactar</button>
            </div>
        )
    }
}
