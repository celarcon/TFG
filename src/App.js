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
import EditarProductos from './components/MisProductos/EditarProductos';
import Admin from './components/Admin/Admin';
import InfoAdmin from './components/Admin/InforAdmin';

function App() {
  return (
    <Router>
       <div className="App">
         <Navbar/>
         <Route exact path="/" component={Login}/>
         <div>
           <Route  path="/Registro" component={Register} />
           <Route  path="/Home" component={Landing} />
           <Route  path="/Usuario" component={Profile} />
           <Route  path="/AñadirProducto" component={AñadirProductos} />
           <Route  path="/MisProductos" component={MisProductos}/>
           <Route  path="/Match" component={Match}/>
           <Route path="/EditarProducto" component={EditarProductos}/>
           <Route path="/Admin" component={Admin}/>
           <Route path="/InfoAdmin" component={InfoAdmin}/>
         </div>
       </div>
    </Router>
  );
}

export default App;
