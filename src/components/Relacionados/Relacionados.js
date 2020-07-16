import React, { Component } from 'react';

class Relacionados extends Component {

    componentDidUpdate(){
        console.log(this.props.ProdSelecionado);
    }
   
    render() {
        return (
            <div>
                {/*
                 <ul className="list-group">
                    <li className="list-group-item" key="miProducto" >
                        {  this.state.producto.nombre}
                        <img src={'http://localhost:4000/products/get-image/' +  this.state.producto.image} alt={ this.state.producto.nombre} width="100"></img>
                        { this.state.producto.descripcion}
                    </li>
                </ul>
                */}
            </div>
        )
    }
}

export default Relacionados;