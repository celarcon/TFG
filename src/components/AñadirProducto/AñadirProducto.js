import React, { Component } from 'react';
import axios from 'axios';

import { Slider } from 'antd';//Para el slider
import jwt_decode from 'jwt-decode';
import 'antd/dist/antd.css';

export default class AñadirProducto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ' ',
            nombre: ' ',
            descripcion: ' ',
            precioMin: '0',
            precioMax: '500'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAfterChange = this.onAfterChange.bind(this);
    };
    componentDidMount() {
        const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
          id: decoded._id,
        })
      }
    async handleSubmit(e) {
        //e.prevenetDefault();
        const res = await axios.post('http://localhost:4000/products', { 
            idPropietario:this.state.id,
            nombre: this.state.nombre, 
            descripcion: this.state.descripcion,
            precioMin: this.state.precioMin,
            precioMax: this.state.precioMax
        });
        console.log(res.data);
    };
    handleInputChange(e) {
        const { value, name } = e.target;
        this.setState({ [name]: value });
        console.log(value, name);
    };
    onChange(e) {
        console.log('onChange: ', e);
        this.setState({precioMin: e[0]});
        this.setState({precioMax: e[1]});
        console.log('precioMax: ', this.state.precioMax);
      };
      
    onAfterChange(value) {
        console.log('onAfterChange: ', value);
      };
    render() {
        return (
            <div className="container">
                <div className="row text-center justify-content-center align-self-center">
                    <form className="col-3" onSubmit={this.handleSubmit}>
                        <h1 className="h3 font-weight-normal">Producto</h1>
                        <label >Nombre producto</label>
                        <input type="text" name="nombre" onChange={this.handleInputChange} className="form-control" placeholder="Nombre producto" required autoFocus="" />
                        <label >Descripcion</label>
                        <textarea name="descripcion" onChange={this.handleInputChange} className="form-control mb-3" placeholder="Descripcion producto" required />
                        <label >Rango precio</label>
                        <Slider
                            range
                            step={1}
                            defaultValue={[0, 500]}
                            max={500}
                            onChange={this.onChange}
                            onAfterChange={this.onAfterChange}
                            required
                        />
                        <button className="btn btn-primary btn-block" type="submit">Añadir producto</button>
                    </form>
                </div>
            </div>
        )
    }
}