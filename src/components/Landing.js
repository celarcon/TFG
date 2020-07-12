import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import jwt_decode from 'jwt-decode';

import Sidebar from './Sidebar/Sidebar';
import Usuario from './Profile';
import AñadirProducto from './AñadirProducto/AñadirProducto';

class Landing extends Component {
  render() {
    return (
      <div>
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/AñadirProducto" component={AñadirProducto} />
            <Route path="/profile" component={Usuario} />
          </Switch>
        </Router>
      </div >
    )
  }
}

export default Landing;