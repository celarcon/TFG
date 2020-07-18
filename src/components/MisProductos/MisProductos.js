import React, { Component } from 'react';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';

class MisProductos extends Component {

    state = {
        productos:[],
        idPropietario: ' '
    }

     componentDidMount= async() =>{

        if(!localStorage.usertoken)
            this.props.history.push(`/`); 

        //sacamos el id del propietario
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
          idPropietario: decoded._id
        });
        console.log(this.state.idPropietario);
        const res = await Axios.get('http://localhost:4000/products/misProductos/' + decoded._id);
        this.setState({productos: res.data});

        //console.log(this.state.idPropietario);
    }
    eliminaProd = async (e) => {
        console.log(e);
        await Axios.delete('http://localhost:4000/products/' + e);
    }

    render() {
        return (
            <div className="col-md-8">
                <h1>MisProductos</h1>
                <ul className="list-group">
                {
                    this.state.productos.map((productos, i)=>
                    <li className="list-group-item" key={i} >
                        {productos.nombre}
                        <img src={'http://localhost:4000/products/get-image/'+productos.image} alt={productos.nombre} width="100"></img>
                        {productos.descripcion}  <br/>
                        min {productos.precioMin}   <br/>
                        max {productos.precioMax}
                        <button type="submit" onClick={()=>this.eliminaProd(productos._id)}>Elminar</button>
                    </li>
                    )
                }
                </ul>
            </div>
        )}

}
export default MisProductos;