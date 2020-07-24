import React, { Component } from 'react'
import Axios from 'axios';

export default class ProdRelacionado extends Component {
    state={
        interesado: '',
        idProdSelect: ' '
    }
    componentDidMount=async()=>{
        this.setState({idProdSelect: this.props.ProdSelecionado._id})
        
        //comprobamos si el producto seleccionado esta interesado en el producto relacionado
        var cond = await Axios.get('http://localhost:4000/interesados/' + this.state.idProdSelect+ "&"+ this.props.rel._id);
        console.log(cond.data)
        this.setState({interesado: cond.data})
    }

 elimiarInteresado=async()=>{
    this.props.elimiarInteresado(this.props.rel._id);
    var cond = await Axios.get('http://localhost:4000/interesados/' + this.state.idProdSelect+ "&"+ this.props.rel._id);
    this.setState({interesado: cond.data})

 }
 anadirInteresado=async()=>{
    this.props.anadirInteresado(this.props.rel._id);
    var cond = await Axios.get('http://localhost:4000/interesados/' + this.state.idProdSelect+ "&"+ this.props.rel._id);
    this.setState({interesado: cond.data})
}
    render() {
        return (
            <div>
                {this.props.rel.nombre}
                    <img src={'http://localhost:4000/products/get-image/' + this.props.rel.image} alt={this.props.rel.nombre} width="100"></img>
                                
                    {this.state.interesado?
                        <p>
                           <button key={this.props.i}onClick={this.elimiarInteresado} >Ya no me interesa</button>
                        </p>
                        :
                        <p>
                             <button key={this.props.rel._id} onClick={this.anadirInteresado}>Me interesa</button>
                        </p>}
            </div>
        )
    }
}
