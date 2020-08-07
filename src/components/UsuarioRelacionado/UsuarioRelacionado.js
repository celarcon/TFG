import React, { Component } from 'react'
import { Comment, Form, Button, Input, Rate, Tooltip } from 'antd';
import moment from 'moment';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value, setValoracion, valoracion }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
       <span style={{ float: 'right', marginRight: '10px' }}>Añade una valoracion para este usuarios <Rate allowHalf onChange={setValoracion} value={valoracion} /></span>
      <Button Type="submit" loading={submitting} onClick={onSubmit} type="primary">
        Añadir comentario
        </Button>
    </Form.Item>

  </>
);

export default class UsuarioRelacionado extends Component {
  state = {
    miId: null,
    nombre: null,
    comments: [],
    submitting: false,
    value: '',
    valoracion: 2.5,
    valoracionMedia: 0
  };
  componentDidMount = async () => {
    var token = localStorage.usertoken;
    var decoded = jwt_decode(token);
    var vMedia = await axios.get('http://localhost:4000/comentarios/valoracion/' + this.props.location.state.id);
    var comen = await axios.get('http://localhost:4000/comentarios/' + this.props.location.state.id);
    var nombre = await axios.get('http://localhost:4000/users/' + this.props.location.state.id);
    this.setState({ nombre: nombre.data.first_name+' '+nombre.data.last_name });
    this.setState({ valoracionMedia: vMedia.data });
    this.setState({ comments: comen.data });
    this.setState({ miId: decoded._id })
    console.log(comen)
  }
  handleSubmit = async () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });
    var token = localStorage.usertoken;
    var decoded = jwt_decode(token);
    await axios.post('http://localhost:4000/comentarios', {
      idPropietario: this.props.location.state.id,
      idComUsu: decoded._id,
      nombre: decoded.first_name,
      comentario: this.state.value,
      valoracion: this.state.valoracion
    });
    setTimeout(() => {
      this.componentDidMount();
      this.setState({
        submitting: false,
        value: '',
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
    console.log(e.target.value);
  };
  onClick = e => {
    console.log(e.target.value);
  };
  setValoracion = e => {
    console.log(e);
    this.setState({
      valoracion: e,
    });

  }

  elimaComentario = async e => {
    await axios.delete('http://localhost:4000/comentarios/' + e);
    this.componentDidMount();

  }
  render() {
    const { submitting, value, valoracion } = this.state;
    return (
      <div  style={{width: '100%'}}>
        <div style={{margin:'auto', width: '50%'}}>
          <h2>Usuario</h2>
          <div className="w-100"></div>
          <h3>{this.state.nombre}</h3>
          <div className="w-100 "></div>
            <span className="txtNegrita">valoracion del usuario</span>
          <div className="w-100"></div>      
          <p><Rate disabled allowHalf value={this.state.valoracionMedia} /></p>
          <h2>Comentarios</h2>      
        </div>
        <div className="scrollComentarios">
        {this.state.comments.map(comen =>
          <div className="paddingDefaul ">
            <Comment
              style={{ marginLeft: '20px' }}
              author={comen.nombre}
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
            {comen.idComUsu === this.state.miId &&
              <button className="eliminaComentario col-md-5 offset-md-7" onClick={() => this.elimaComentario(comen._id)}>Eliminar Comentario</button>
            }
          </div>
        )}
        </div>
        <Comment
          className="paddingDefaul"
          style={{ position: 'absolute', bottom: '0', width: '100%',paddingRight:'20px' }}
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              setValoracion={this.setValoracion}
              submitting={submitting}
              value={value}
              valoracion={valoracion}
            />}
        />
      </div>

    )
  }
}
