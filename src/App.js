import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile/Profile';
import AñadirProductos from './components/AñadirProducto/AñadirProducto';
import MisProductos from './components/MisProductos/MisProductos';
import Match from './components/Match/Match';
import EditarProductos from './components/MisProductos/EditarProductos'

function App() {
  return (
    <Router>
       <div className="App">
         <Navbar/>
         <Route exact path="/" component={Login}/>
         <div className="container">
           <Route  path="/Registro" component={Register} />
           <Route  path="/Home" component={Landing} />
           <Route  path="/Usuario" component={Profile} />
           <Route  path="/AñadirProducto" component={AñadirProductos} />
           <Route  path="/MisProductos" component={MisProductos}/>
           <Route  path="/Match" component={Match}/>
           <Route path="/EditarProducto" component={EditarProductos}/>
         </div>
       </div>
    </Router>
  );
}

export default App;
