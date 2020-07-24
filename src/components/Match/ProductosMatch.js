import React, { Component } from 'react';
import Axios from 'axios';

export default class ProductosMatch extends Component {
    state={
        prod1:' ',
        prod2: ' ',
        id: ' '
    }
    componentDidMount = async() =>{
        
        var prod1 = await Axios.get('http://localhost:4000/products/'+this.props.prod.idProducto1);
        var prod2 = await Axios.get('http://localhost:4000/products/'+this.props.prod.idProducto2);
        console.log(prod1.data);
        console.log(prod2.data);
        this.setState({prod1: prod1.data, prod2: prod2.data})

        this.setState({id:this.props.prod._id})
        console.log(this.props.prod._id);
        console.log(this.state.id);
       
    }

    render() {
        return (
            <div style={{marginTop:'50px'}}>
                {this.state.prod1.nombre} - 
                {this.state.prod2.nombre}
                <button>Contactar</button>
                <button onClick={()=>this.props.eliminaProd(this.state.id)}>Elminar</button>
            </div>
        )
    }
}
