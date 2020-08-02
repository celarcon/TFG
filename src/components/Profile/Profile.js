import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Comment, Rate, Tooltip } from 'antd';
import moment from 'moment';

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      errors: {}
    }
  }

  componentDidMount = () => {
    var token = localStorage.usertoken;
    var decoded = jwt_decode(token);
    this.setState({
      id: decoded._id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    })
  }

  render() {
    return (
      <div className="container" >
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">Perfil</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>id</td>
              <td>{this.state.id}</td>
            </tr>
            <tr>
              <td>Fist Name</td>
              <td>{this.state.first_name}</td>
            </tr>
            <tr>
              <td>Last Name</td>
              <td>{this.state.last_name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{this.state.email}</td>
            </tr>
            <tr>
              <td>valoración</td>
              <td><Rate disabled defaultValue={2} /></td>
            </tr>
          </tbody>
        </table>
        <h2>Comentarios en tu perfil</h2>
        <Comment
            author= "Han Solo"
            content={
                <p>
                  We supply a series of design principles, practical patterns and high quality design
                  resources (Sketch and Axure), to help people create their product prototypes beautifully
                  and efficiently.
                </p>
              }
              datetime={
                <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment().fromNow()}</span>
                </Tooltip>
              }
            />
      </div>
    )
  }
}

export default Profile;