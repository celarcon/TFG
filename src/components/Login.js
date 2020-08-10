import React, { Component } from 'react'
import { login } from './UserFunctions'
import logo from '../imagenes/logoTRADEAPP.svg';

class Login extends Component {

  state = {
      email: '',
      password: '',
      errors: {}
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = e => {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    login(user).then(res => {
      if (res) {
        if(res.error === 'User does not exist'){
          this.props.history.push(`/`);
          alert(res.error);
        }else{
          this.props.history.push(`/home`);
        }

      }
    })
  }

  render() {
    return (
      <div className="container" style={{paddingTop:'10%'}}>
        <div className="row">
        <div className="col-md-6 col-sm-12 mx-auto">
          <p className="logoLogin">
          <img src={logo} alt="logo" style={{width:"200px"}}/>
          </p>
          <p className="txtLogin">
             Tu página de intercambio, sube tus productos, encuentra relacionados, ponte en contacto con ellos.
             Dale una segunda vida a tus objetos.
          </p>
        </div>
          <div className="col-md-6 col-sm-12">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Acceder a TradeApp</h1>
              <div className="form-group">
                <label className="txtNegrita" htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label className="txtNegrita" htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Contraseña"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btnAccesoRegistro btn-block">
                Acceder
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;