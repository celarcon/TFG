import React, { Component } from 'react';
import ProdRelacionado from './ProdRelacionado';

class Relacionados extends Component {
    render() {
        return (
            <div style={{ marginLeft: '20%' }}>
                {this.props.ProdSelecionado ?
                    <div>
                        <h1>Mi producto</h1>
                        <ul>
                            <li >
                                {this.props.ProdSelecionado.nombre}
                            </li>
                            <li>
                                <img src={'http://localhost:4000/products/get-image/' + this.props.ProdSelecionado.image} alt={this.props.ProdSelecionado.nombre} width="100"></img>
                            </li>
                            <li>
                                {this.props.ProdSelecionado.descripcion}
                            </li>
                        </ul>
                        <h1>Productos relacionados con este producto:</h1>
                        {this.props.ProdRelacionados ?
                            this.props.ProdRelacionados.map((rel, i) =>
                                <ProdRelacionado
                                    rel={rel}
                                    i={i}
                                    anadirInteresado={this.props.anadirInteresado}
                                    elimiarInteresado={this.props.elimiarInteresado}
                                    ProdSelecionado={this.props.ProdSelecionado}
                                />
                            ) :
                            <h1>No hay relacionados</h1>}
                    </div>
                    :
                    <h1>No hay ningun producto seleccionado</h1>
                }
            </div>
        )
    }
}

export default Relacionados;