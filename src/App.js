import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AñadirProductos from './components/AñadirProducto/AñadirProducto';
import MisProductos from './components/MisProductos/MisProductos';

function App() {
  return (
    <Router>
       <div className="App">
         <Navbar/>
         <Route exact path="/" component={Login}/>
         <div className="container">
           <Route  path="/register" component={Register} />
           <Route  path="/home" component={Landing} />
           <Route  path="/profile" component={Profile} />
           <Route  path="/AñadirProducto" component={AñadirProductos} />
           <Route  path="/MisProductos" component={MisProductos}/>
         </div>
       </div>
    </Router>
  );
}

export default App;
