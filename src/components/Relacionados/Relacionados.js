import React, { Component } from 'react';
import ProdRelacionado from './ProdRelacionado';

class Relacionados extends Component {
    state={
        busqueda:[],
        text: ''
    }
    filter(event){
        var text = event.target.value
        if(text.length>0){
        const data = this.props.ProdRelacionados;
        const newData = data.filter(function(item){
            const itemData = item.nombre.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        console.log(newData);
        this.setState({busqueda: newData})
        this.setState({text: text})
        }else{
        this.setState({busqueda: []})
        this.setState({text: text})
        }
     }

    render() {
        return (
            <div >
                {this.props.ProdSelecionado ?
                    <div> 
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <div>
                                Producto seleccionado
                            </div>
                                <div>
                                    <img src={'http://localhost:4000/products/get-image/' + this.props.ProdSelecionado.image} alt={this.props.ProdSelecionado.nombre} width="100"></img>
                                    <p>nombre:{this.props.ProdSelecionado.nombre}</p>
                                    <p>descripcion:{this.props.ProdSelecionado.descripcion}</p>
                                </div>
                            <div >
                                Productos relacionados:
                            </div>
                            <input className="form-control"  value={this.state.text} onChange={(text) => this.filter(text)}/>
                        </div>
                        <div style={{
                            height: '70vh',
                            width: '100%',
                            overflow:'hidden',
                            overflowY: 'scroll',
                            position: 'absolute',
                            bottom: '0',
                            textAlign:'center'
                            }}>
                                {this.state.text.length>0 ?
                                this.state.busqueda.map((rel, i)=>
                                <ProdRelacionado key={i}
                                    rel={rel}
                                    i={i}
                                    anadirInteresado={this.props.anadirInteresado}
                                    elimiarInteresado={this.props.elimiarInteresado}
                                    ProdSelecionado={this.props.ProdSelecionado}
                                />):
                        this.props.ProdRelacionados ?
                            this.props.ProdRelacionados.map((rel, i) =>
                                <ProdRelacionado key={i}
                                    rel={rel}
                                    i={i}
                                    anadirInteresado={this.props.anadirInteresado}
                                    elimiarInteresado={this.props.elimiarInteresado}
                                    ProdSelecionado={this.props.ProdSelecionado}
                                />
                            ) :
                            <h1>No hay relacionados</h1>
                        }
                        </div>
                    </div>
                    :
                    <h1>No hay ningun producto seleccionado</h1>
                }
            </div>
            
        )
    }
}

export default Relacionados;