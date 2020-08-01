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

        var correo1 =await Axios.get('http://localhost:4000/users/correo/' + rel.data.idUsuario1)
        var correo2 =await Axios.get('http://localhost:4000/users/correo/' + rel.data.idUsuario2)
        console.log(correo1.data+correo2.data);

        await Axios.post('http://localhost:4000/users/enviarEmail',{
            email:correo1.data
        });
        await Axios.post('http://localhost:4000/users/enviarEmail',{
            email:correo2.data
        });
    }
    eliminaProd = async(e) => {
        await Axios.delete('http://localhost:4000/relacionados/' + e);
        console.log(e)
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
