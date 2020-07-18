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
    const rel = await Axios.get('http://localhost:4000/products/relacionados/' + res.data._id)
    this.setState({ producto: res.data });
    this.setState({relaciondos: rel.data.prodsRela});
  };

  render() {
    return (
      <div>
        {localStorage.usertoken ?
          <Router>
            <Sidebar prodSelecionado={this.prodSelec} />
            <Switch style={{ paddingLeft: '20%' }}>
              <Route path="/home/AñadirProducto" component={AñadirProducto} />
              <Route path="/Usuario" component={Usuario} />
              <Relacionados ProdSelecionado={this.state.producto} ProdRelacionados={this.state.relaciondos}/>
            </Switch>
          </Router>
          : this.props.history.push(`/`)}
      </div >
    )
  }
}

export default Landing;