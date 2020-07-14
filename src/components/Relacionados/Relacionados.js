import React, { Component } from 'react';

class Relacionados extends Component {
    render() {
        return (
            <div>
                soy los productos reclacionados con : {this.props.hola} 
            </div>
        )
    }
}

export default Relacionados;