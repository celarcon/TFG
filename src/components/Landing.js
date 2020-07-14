import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import jwt_decode from 'jwt-decode';

import Sidebar from './Sidebar/Sidebar';
import Usuario from './Profile';
import AñadirProducto from './AñadirProducto/AñadirProducto';
import Relacionados from './Relacionados/Relacionados';

class Landing extends Component {

  render() {
    return (
      <div>
        {localStorage.usertoken ?
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/home/AñadirProducto"  component={AñadirProducto} />
            <Route path="/profile" component={Usuario} />
            <Route path="/relacionados" component={Relacionados} />
          </Switch>
        </Router>
        :this.props.history.push(`/`) }
      </div >
    )
  }
}

export default Landing;