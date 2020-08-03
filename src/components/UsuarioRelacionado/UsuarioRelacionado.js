import React, { Component } from 'react'
import { Comment, Form, Button, Input, Rate, Tooltip } from 'antd';
import moment from 'moment';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const { TextArea } = Input;
  
  const Editor = ({ onChange, onSubmit, submitting, value,setValoracion, valoracion }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button Type="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
        <span style={{float: 'right', marginRight:'10px'}}>Añade una valoracion para este usuarios <Rate  allowHalf onChange={setValoracion} value={valoracion} /></span>
      </Form.Item>
      
    </>
  );

export default class UsuarioRelacionado extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
        valoracion: 2.5,
        valoracionMedia: 0
      };
      componentDidMount= async()=>{
          var vMedia = await axios.get('http://localhost:4000/comentarios/valoracion/'+this.props.location.state.id);
          var comen =  await axios.get('http://localhost:4000/comentarios/'+this.props.location.state.id);
          this.setState({valoracionMedia:vMedia.data});
          this.setState({comments: comen.data})
          console.log(comen)
      }
      handleSubmit = async() => {
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
      onClick = e =>{
        console.log(e.target.value);
      };
      setValoracion = e =>{
        console.log(e);
        this.setState({
            valoracion: e,
          });
        
      }
    render() {
        const { submitting, value, valoracion } = this.state;
        return (
            <div>
                Usuario de un producto y comentarios
                {this.props.location.state.id}
                valoracion del usuario 
                <Rate disabled allowHalf  value={this.state.valoracionMedia} />
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
            <Comment 
                style={{position: 'absolute',bottom: '0',width:'100%'}}
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
