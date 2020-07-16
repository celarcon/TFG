import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import logo from '../imagenes/logoTRADEAPP.svg';

class Landing extends Component {
  
  logOut= e =>{
    e.preventDefault();
    localStorage.removeItem('usertoken');
    this.props.history.push(`/`);
  }

  render() {
    const loginRegLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Registrarse
          </Link>
        </li>
      </ul>
    )

    const userLink = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/home" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Usuario
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/AñadirProducto" className="nav-link">
            Añadir Producto
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/MisProductos" className="nav-link">
            Mis Producto
          </Link>
        </li>
        <li className="nav-item">
          <Link to ="/" onClick={this.logOut.bind(this)} className="nav-link">
            Salir
          </Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor:"#002140"}}>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        {localStorage.usertoken ?
        <Link to="/home">
          <img src={logo} alt="logo" style={{width:"20px"}}/> <span style={{color:"white", fontSize:"20px"}}>TRADEAPP</span>
        </Link>
        :
        <Link to="/">
          <img src={logo} alt="logo" style={{width:"20px"}}/> <span style={{color:"white", fontSize:"20px"}}>TRADEAPP</span>
        </Link>
        }
        <div className="collapse navbar-collapse justify-content-md-center" id="navbar" >
          {localStorage.usertoken ? userLink : loginRegLink}
        </div>
      </nav>
    )
  }
}

export default withRouter(Landing);