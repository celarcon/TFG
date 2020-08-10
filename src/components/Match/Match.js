import React, { Component } from 'react';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';
import ProductosMatch from './ProductosMatch';

import { notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

const openNotification = () => {
  notification.open({
    message: 'Revisa tu correo',
    description:
      'Genial!, has contactado con un usuarion mira en tu correo te habrá llegado un correo con información del contacto',
    icon: <SmileOutlined style={{ color: '#0069CC' }} />,
  });
};
const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
 };

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
        openNotification();

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
            image1: prod2.data.image,
            image2: prod1.data.image
        });
        await Axios.post('http://localhost:4000/users/enviarEmail',{
            email:correo2.data.email,
            contacto:correo1.data.email,
            nombre: correo1.data.first_name+" "+correo1.data.last_name,
            producto1:prod2.data.nombre,
            producto2:prod1.data.nombre,
            image1: prod1.data.image,
            image2: prod2.data.image
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
                <h1>Tus productos relacionados</h1>
                {this.state.relacionados.map((rel,i)=>
                    <ProductosMatch 
                    contactar={this.contactar}
                    eliminaProd={this.eliminaProd} prod={rel} key={i} />
                )}
                <button className="goTop" onClick={scrollTop}>
                    <svg width="3.5em" height="3.5em" viewBox="0 0 16 16" class="bi bi-arrow-up-circle-fill" fill="rgb(0,40,77)" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-10.646.354a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 6.207V11a.5.5 0 0 1-1 0V6.207L5.354 8.354z"/>
                    </svg>
                </button>
            </div>
        )
    }
}
