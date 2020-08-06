import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { Comment, Rate, Tooltip } from 'antd';
import moment from 'moment';
import axios from 'axios';


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      first_name: '',
      last_name: '',
      email: '',
      comments:[],
      valoracionMedia: 0,
      errors: {}
    }
  }

  componentDidMount = async() => {
    var token = localStorage.usertoken;
    var decoded = jwt_decode(token);
    this.setState({
      id: decoded._id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email
    })
    var vMedia = await axios.get('http://localhost:4000/comentarios/valoracion/'+decoded._id);
    var comen =  await axios.get('http://localhost:4000/comentarios/'+decoded._id);
    this.setState({valoracionMedia:vMedia.data});
    console.log(vMedia.data)
    this.setState({comments: comen.data})
  }

  render() {
    return (
      <div className="container paddingMobile">
        <div className="col-sm-8 justify-content-center align-self-center">
          <h1 className="text-center perfil">Perfil</h1>
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
              <td><Rate disabled allowHalf value={this.state.valoracionMedia} /></td>
            </tr>
          </tbody>
        </table>
        <h2>Comentarios en tu perfil</h2>
        <div className="scrollPerfil">
        {this.state.comments.map(comen =>
                <Comment
                style={{marginLeft:'20px'}}
                author= {comen.nombre}
                content={
                    <p>
                    {comen.comentario}
                    </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{comen.updatedAt}</span>
                    </Tooltip>
                }
                />
            )}
      </div>
      </div>
    )
  }
}

export default Profile;