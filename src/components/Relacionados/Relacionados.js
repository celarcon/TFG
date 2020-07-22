import React, { Component } from 'react';


class Relacionados extends Component {
    render() {
    return (
        <div>
            {this.props.ProdSelecionado ?
            <div>
                <h1>Mi producto</h1>
                {/*EJEMPLO LISTADO*/}
                <div className="card mb-3" style={{width:'100%'}}>
                    <div className="row no-gutters">
                        <div className="col-md-4">
                        <img src={'http://localhost:4000/products/get-image/' + this.props.ProdSelecionado.image} alt={this.props.ProdSelecionado.nombre} width="100"/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{this.props.ProdSelecionado.nombre}</h5>
                                <p className="card-text"> {this.props.ProdSelecionado.descripcion}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*EJEMPLO LISTADO*/}
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
                    this.props.ProdRelacionados.map(rel=>
                        <p>
                            {rel.nombre}
                            <button onClick={()=>this.props.anadirInteresado(rel._id)}>Me interesa</button>
                        </p>) : 
                    <h1>No hay relacionados</h1>}
                </div>
                :
                <h1>No hay ningun producto seleccionado</h1>
            }
        </div>
    )}
}

export default Relacionados;