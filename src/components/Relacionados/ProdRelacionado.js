import React, { Component } from 'react'
import Axios from 'axios';
import { notification } from 'antd';
import { Link } from 'react-router-dom';

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

class ProdRelacionado extends Component {
    state = {
        interesado: ''
    }
    componentDidMount = async () => {
        this.setState({ idProdSelect: this.props.ProdSelecionado._id });
        //comprobamos si el producto seleccionado esta interesado en el producto relacionado
        var cond = await Axios.get('http://localhost:4000/interesados/' +  this.props.ProdSelecionado._id + "&" + this.props.rel._id);
        this.setState({ interesado: null });
        this.setState({ interesado: cond.data });
        this.cantidadInteresados();
    }
    elimiarInteresado = async () => {
        this.props.elimiarInteresado(this.props.rel._id);
        var cond = await Axios.get('http://localhost:4000/interesados/' + this.state.idProdSelect + "&" + this.props.rel._id);
        this.setState({ interesado: cond.data });
        openNotificationDelete();
        this.componentDidMount();
    }
    anadirInteresado = async () => {
        this.props.anadirInteresado(this.props.rel._id);
        var cond = await Axios.get('http://localhost:4000/interesados/' + this.state.idProdSelect + "&" + this.props.rel._id);
        this.setState({ interesado: cond.data });
        openNotificationSuccess();
        this.componentDidMount();
    }
    cantidadInteresados= async()=>{
        var inter = await Axios.get('http://localhost:4000/interesados/numeroInteresados/'+this.props.rel._id);
        this.setState({numerInteresados:inter.data})
     }
    render() {
        return (
            <div className="row" style={{
                 padding: '10px',
                 display:'flex',
                 alignItems:'center',
                 backgroundColor:'white',
                 marginBottom:'20px'}}>
                <div className="col-sm-12 col-md-12 col-lg-4">
                    <img src={'http://localhost:4000/products/get-image/' + this.props.rel.image} alt={this.props.rel.nombre} width="100" height="100"></img>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-4">
                    <Link to={{pathname:"/UsuarioRelacionado", state:{id:this.props.rel.idPropietario}}}>
                        ver perfil
                    </Link>
                    <p>Nombre:{this.props.rel.nombre}</p>
                    <p>Definición:{this.props.rel.nombre}</p>
                   <p>Numero de interesados:{this.state.numerInteresados}</p> 
                </div>
                {this.state.interesado ?
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <button key={this.props.i} onClick={this.elimiarInteresado} >Ya no me interesa</button>
                    </div>
                    :
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <button key={this.props.rel._id} onClick={this.anadirInteresado}>Me interesa</button>
                    </div>}
            </div>
        )
    }
}
export default ProdRelacionado;