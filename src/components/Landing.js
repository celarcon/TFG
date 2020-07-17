import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import Relacionados from './Relacionados/Relacionados';

//import jwt_decode from 'jwt-decode';

import Sidebar from './Sidebar/Sidebar';
import Usuario from './Profile/Profile';
import AñadirProducto from './AñadirProducto/AñadirProducto';

class Landing extends Component {

  state = {
    producto: null,
    relaciondos: []
  };
  prodSelec = async e => {
    //this.setState({idProdSelect: e.key});
    const res = await Axios.get('http://localhost:4000/products/' + e);
    this.setState({ producto: res.data });
    console.log(res.data._id);
  };

  render() {
    return (
      <div>
        {localStorage.usertoken ?
          <Router>
            <Sidebar prodSelecionado={this.prodSelec} />
            <Switch>
              <Route path="/home/AñadirProducto" component={AñadirProducto} />
              <Route path="/Usuario" component={Usuario} />
              <Relacionados ProdSelecionado={this.state.producto} />
            </Switch>
          </Router>
          : this.props.history.push(`/`)}
      </div >
    )
  }
}

export default Landing;