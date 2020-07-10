import React, { Component } from 'react';

class MisProductos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ' ',
            nombre: ' ',
            descripcion: ' ',
            precioMin: ' ',
            precioMax: ' '
        };
    }
    render() {
        return (
            <div className="container">
                Mis Productos
            </div>
        )}

}
export default MisProductos;