import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import jwt_decode from 'jwt-decode';

import Sidebar from './Sidebar/Sidebar';
import Usuario from './Profile';
import AñadirProducto from './AñadirProducto/AñadirProducto';
import Relacionados from './Relacionados/Relacionados';

class Landing extends Component {
  
  state={
    idProdSelecionado: null
  };

  prodSelecionado = (e)=>{
    //this.setState({idProdSelecionado: e.key});
    alert(e);
  }

  render() {
    return (
      <div>
        {localStorage.usertoken ?
        <Router>
          <Sidebar prodSelecionado={this.prodSelecionado}/>
          <Switch>
            <Route path="/home/AñadirProducto"  component={AñadirProducto} />
            <Route path="/profile" component={Usuario} />
            <Relacionados/>
          </Switch>
        </Router>
        :this.props.history.push(`/`) }
      </div >
    )
  }
}

export default Landing;