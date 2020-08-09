import React, { Component } from 'react';
import ProdRelacionado from './ProdRelacionado';

class Relacionados extends Component {
    state = {
        busqueda: [],
        text: ''
    }
    filter(event) {
        var text = event.target.value
        if (text.length > 0) {
            const data = this.props.ProdRelacionados;
            const newData = data.filter(function (item) {
                const itemData = item.nombre.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1
            })
            console.log(newData);
            this.setState({ busqueda: newData });
            this.setState({ text: text });
        } else {
            this.setState({ busqueda: [] });
            this.setState({ text: text });
        }
    }

    render() {
        return (
            <div className="prodSeleccionado">
                {this.props.ProdSelecionado ?
                    <div>
                        <div className="paddingRelacionados">
                            <div className="col-sm-12">
                                <h2>Producto seleccionado</h2>
                            </div>
                            <table style={{margin:'0 auto'}}>
                                <tr>
                                    <td> <img src={'http://localhost:4000/products/get-image/' + this.props.ProdSelecionado.image} alt={this.props.ProdSelecionado.nombre} height="100" width="100"></img></td>
                                    <td>
                                        <p><span className="txtNegrita" >Nombre: </span>{this.props.ProdSelecionado.nombre}</p>
                                        <p><span className="txtNegrita" >Descripción: </span><br/>{this.props.ProdSelecionado.descripcion}</p>
                                    </td>
                                </tr>
                            </table>
                            <div className="col-sm-12">
                                <h3>Productos relacionados:</h3>
                            </div>
                        </div>
                        <div className="buscador paddingMobile">
                            Buscador:<input className="form-control" value={this.state.text} onChange={(text) => this.filter(text)} />
                        </div>
                        <div className="scrollRelacionados paddingRelacionados">
                            {this.state.text.length > 0 ?
                                this.state.busqueda.map((rel, i) =>
                                    <ProdRelacionado key={rel._id}
                                        rel={rel}
                                        i={rel._id}
                                        anadirInteresado={this.props.anadirInteresado}
                                        elimiarInteresado={this.props.elimiarInteresado}
                                        ProdSelecionado={this.props.ProdSelecionado}
                                    />) :
                                this.props.ProdRelacionados ?
                                    this.props.ProdRelacionados.map((rel, i) =>
                                        <ProdRelacionado key={rel._id}
                                            rel={rel}
                                            i={rel._id}
                                            anadirInteresado={this.props.anadirInteresado}
                                            elimiarInteresado={this.props.elimiarInteresado}
                                            ProdSelecionado={this.props.ProdSelecionado}
                                        />
                                    ) :
                                    <h1 className="paddingMobile"> No hay relacionados</h1>
                            }
                        </div>
                    </div>
                    :
                    <h1 className="paddingMobile"> No hay ningun producto seleccionado</h1>
                }
            </div>

        )
    }
}

export default Relacionados;