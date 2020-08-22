import React, { Component } from 'react'
import { register } from './UserFunctions'

class Register extends Component {

  state = {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      errors: {}
    }

  onChange = e =>{
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit = e =>{
    e.preventDefault()

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    }

    register(newUser).then(res => {
      this.props.history.push(`/`)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Registro</h1>
              <div className="form-group">
                <label className="txtNegrita" htmlFor="name">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  placeholder="Nombre"
                  value={this.state.first_name}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="txtNegrita" htmlFor="name">Apodo</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  placeholder="Apodo"
                  value={this.state.last_name}
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="txtNegrita" htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  required
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
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btnAccesoRegistro btn-block">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;