import React, { Component } from 'react';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import ProductosMatch from './ProductosMatch';

export default class Match extends Component {
    state={
        relacionados:[]
    }

    componentDidMount = async()=>{
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);

        var rel = await Axios.get('http://localhost:4000/relacionados/' + decoded._id);
        this.setState({relacionados: rel.data});
    }
    contactar = async(e)=>{
        
        var rel = await Axios.get('http://localhost:4000/relacionados/relacionado/' + e);
        var prod1 = await Axios.get('http://localhost:4000/products/'+  rel.data.idProducto1);
        var prod2 = await Axios.get('http://localhost:4000/products/'+  rel.data.idProducto2);
        var correo1 =await Axios.get('http://localhost:4000/users/' + rel.data.idUsuario1)
        var correo2 =await Axios.get('http://localhost:4000/users/' + rel.data.idUsuario2)
        console.log(correo1.data.email+correo2.data.email);

        await Axios.post('http://localhost:4000/users/enviarEmail',{
            email:correo1.data.email,
            contacto:correo2.data.email,
            nombre: correo2.data.first_name+" "+correo2.data.last_name,
            producto1:prod1.data.nombre,
            producto2:prod2.data.nombre,
            image: prod2.data.image
        });
        await Axios.post('http://localhost:4000/users/enviarEmail',{
            email:correo2.data.email,
            contacto:correo1.data.email,
            nombre: correo1.data.first_name+" "+correo1.data.last_name,
            producto1:prod2.data.nombre,
            producto2:prod1.data.nombre,
            image: prod1.data.image
        });
    }
    eliminaProd = async(e) => {
        var del = await Axios.delete('http://localhost:4000/relacionados/' + e);
        await Axios.delete('http://localhost:4000/interesados/'+del.data.rel.idProducto1+'&'+del.data.rel.idProducto2);
        await Axios.delete('http://localhost:4000/interesados/'+del.data.rel.idProducto2+'&'+del.data.rel.idProducto1);
        
        console.log("botonpulsado")
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({relacionados:[]});
        var rel = await Axios.get('http://localhost:4000/relacionados/' + decoded._id);
        this.setState({relacionados: rel.data});       
    }
    render() {
        return (
            <div>
                <h2>Tus productos relacionados</h2>
                {this.state.relacionados.map((rel,i)=>
                    <ProductosMatch 
                    contactar={this.contactar}
                    eliminaProd={this.eliminaProd} prod={rel} key={i} />
                )}
            </div>
        )
    }
}
