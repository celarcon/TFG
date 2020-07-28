import React, { Component } from 'react'
import Axios from 'axios';
import {  notification } from 'antd';


const openNotificationSuccess = () => {
  notification['success']({
    message: `Añadido a interesados `,
    description:
      'Has añadido un producto a tu lista de interesados,'+
       'si a este producto tambien le interesa el tuyo podras contactar con el en la pestaña de Productos con Match',
       style: {
        width: 300,
      }
  });
};

const openNotificationDelete = () => {
    notification['error']({
      message: `Eliminado de interesados `,
      description:
        'Este producto ha sido eliminado de tu lista de interesados de tu producto seleccionado ,',
         style: {
          width: 300,
        }
    });
  };

export default class ProdRelacionado extends Component {
    state = {
        interesado: '',
        idProdSelect: ' '
    }
    componentWillMount = async () => {
        this.setState({ idProdSelect: this.props.ProdSelecionado._id })
        //comprobamos si el producto seleccionado esta interesado en el producto relacionado
        var cond = await Axios.get('http://localhost:4000/interesados/' +  this.props.ProdSelecionado._id + "&" + this.props.rel._id);
        console.log(this.state.idProdSelect+"&"+this.props.rel._id+cond.data);
        this.setState({ interesado: null })
        this.setState({ interesado: cond.data })
    }

    elimiarInteresado = async () => {
        this.props.elimiarInteresado(this.props.rel._id);
        var cond = await Axios.get('http://localhost:4000/interesados/' + this.state.idProdSelect + "&" + this.props.rel._id);
        this.setState({ interesado: cond.data });
        openNotificationDelete();
    }
    anadirInteresado = async () => {
        this.props.anadirInteresado(this.props.rel._id);
        var cond = await Axios.get('http://localhost:4000/interesados/' + this.state.idProdSelect + "&" + this.props.rel._id);
        this.setState({ interesado: cond.data });
        openNotificationSuccess();
    }
    render() {
        return (
            <div className="row" style={
                {border:'0.5px solid #002140',
                padding: '10px',
                 display:'flex',
                 alignItems:'center',
                 backgroundColor:'white',
                 marginBottom:'20px'}}>
                <div className="col-sm-12 col-md-12 col-lg-4">
                    <img src={'http://localhost:4000/products/get-image/' + this.props.rel.image} alt={this.props.rel.nombre} height="100"></img>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4">
                    <p>Nombre:{this.props.rel.nombre}</p>
                    <p>Definición:{this.props.rel.nombre}</p>
                </div>
                {this.state.interesado ?
                    <div className="col-sm-12 col-md-8 col-lg-4">
                        <button key={this.props.i} onClick={this.elimiarInteresado} >Ya no me interesa</button>
                    </div>
                    :
                    <div className="col-sm-12 col-md-8 col-lg-4">
                        <button key={this.props.rel._id} onClick={this.anadirInteresado}>Me interesa</button>
                    </div>}
            </div>
        )
    }
}
