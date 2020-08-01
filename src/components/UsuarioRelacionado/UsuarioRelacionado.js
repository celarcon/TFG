import React, { Component } from 'react'
import { Comment, Form, Button, Input, Rate, Tooltip } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
  
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          Add Comment
        </Button>
        <Rate allowHalf defaultValue={2.5} />
      </Form.Item>
    </>
  );

export default class UsuarioRelacionado extends Component {
    state = {
        comments: [],
        submitting: false,
        value: '',
      };
    
      handleSubmit = () => {
        if (!this.state.value) {
          return;
        }
    
        this.setState({
          submitting: true,
        });
    
        setTimeout(() => {
          this.setState({
            submitting: false,
            value: '',
            comments: [
              {
                author: 'Han Solo',
                content: <p>{this.state.value}</p>,
                datetime: moment().fromNow(),
              },
              this.state.comments,
            ],
          });
        }, 1000);
      };
    
      handleChange = e => {
        this.setState({
          value: e.target.value,
        });
        console.log(e.target.value);
      };
    
    render() {
        const { submitting, value } = this.state;
        return (
            <div>
                Usuario de un producto y comentarios
                {this.props.location.state.id}
                valoracion del usuario 
                <Rate disabled defaultValue={2} />
            <Comment
            style={{overflow:'hidden',overflowY: 'scroll'}}
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
            <Comment 
                style={{position: 'absolute',bottom: '0',width:'100%'}}
                content={
                <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
            />}
            />
            </div>
            
        )
    }
}
