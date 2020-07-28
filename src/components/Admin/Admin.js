import React, { Component } from 'react'
import { login } from './AdminFunctions'

class Admin extends Component {

  state = {
      name: '',
      password: '',
      errors: {}
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    console.log([e.target.name]+ e.target.value )
  }
  onSubmit = e => {
    e.preventDefault()
    const admin = {
      name: this.state.name,
      password: this.state.password
    }

    login(admin).then(res => {
      if (res) {
        if(res.error === 'Admin does not exist'){
          this.props.history.push(`/Admin`);
          alert(res.error);
        }else{
          this.props.history.push(`/InfoAdmin`);
        }

      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Acceder como administrador</h1>
              <div className="form-group">
                <label htmlFor="name">nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="nombre"
                  value={this.state.name}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
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
                className="btn btn-lg btn-primary btn-block">
                Acceder
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Admin;