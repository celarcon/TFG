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
                <div className="col-sm-12 col-md-12 col-lg-4" style={{paddingBottom:'10px'}}>
                    <p>
                        <img src={'http://localhost:4000/products/get-image/' + this.props.rel.image} alt={this.props.rel.nombre} width="100" height="100"></img>
                    </p>
                    <Link to={{pathname:"/UsuarioRelacionado", state:{id:this.props.rel.idPropietario}}}>
                        <span className="verPerfil">ver perfil usuario</span>
                    </Link>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-4">
                    <p><span className="txtNegrita">Nombre: </span> <br/>{this.props.rel.nombre}</p>
                    <p><span className="txtNegrita">Descripcion:</span> <br/> 
                   {this.props.rel.descripcion}</p>
                    <p><span className="txtNegrita">Fecha de subida: </span><br/>{this.props.rel.createdAt}</p>
                    <p> 
                        <span className="txtNegrita">Numero de interesados: </span>
                        <span className="numInteresados">{this.state.numerInteresados}</span>
                    </p> 
                </div>
                {this.state.interesado ?
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <button className="yaNoInteresa" key={this.props.i} onClick={this.elimiarInteresado} >Ya no me interesa</button>
                    </div>
                    :
                    <div className="col-sm-12 col-md-12 col-lg-4">
                        <button className="meInteresa" key={this.props.rel._id} onClick={this.anadirInteresado}>Me interesa</button>
                    </div>}
            </div>
        )
    }
}
export default ProdRelacionado;