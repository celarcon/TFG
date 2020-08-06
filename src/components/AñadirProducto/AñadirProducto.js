import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

//antDesing
import { Slider, InputNumber } from 'antd';//Para el slider
import 'antd/dist/antd.css';

export default class AñadirProducto extends Component {
    state = {
            id: ' ',
            idPropietario: ' ',
            nombre: ' ',
            descripcion: ' ',
            precioMin: '0',
            precioMax: '500',
            selectedFile: null
        }


    componentDidMount= ()=> {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
          idPropietario: decoded._id
        });
    };

     handleSubmit = async (e) => {
        //e.prevenetDefault();
        var res = await axios.post('http://localhost:4000/products', { 
            idPropietario: this.state.idPropietario,
            nombre: this.state.nombre, 
            descripcion: this.state.descripcion,
            precioMin: this.state.precioMin,
            precioMax: this.state.precioMax,
        });
        this.setState({id:res.data._id});

        //subir archivo
        if(this.state.selectedFile !== null){
            
            //var productoId = this.state.idPropietario;
            
            const formData = new FormData();

            formData.append(
                'file0',
                this.state.selectedFile,
                this.state.selectedFile.name
            );

            await axios.post('http://localhost:4000/products/upload-image/'+ res.data._id, formData);
        }
        console.log('el id de mi producto '+this.state.id);
    };

    handleInputChange= e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
        console.log(value, name);
    };
    
    onChange= e => {
        console.log('onChange: ', e);
        this.setState({precioMin: e[0]});
        this.setState({precioMax: e[1]});
        console.log('precioMax: ', this.state.precioMax);
      };
    inputNumberMin = e =>{
        console.log(e);
        this.setState({precioMin: e});
    }
    inputNumberMax = e =>{
        console.log(e);
        this.setState({precioMax: e});
    }

    fileChange = (e) =>{
        this.setState({
            selectedFile: e.target.files[0]
        });
      };

    render() {
        const {precioMin} = this.state;
        const {precioMax} = this.state;
        return (
            <div className="container paddingMobile">
                <div className="row text-center justify-content-center align-self-center">
                    <form  onSubmit={this.handleSubmit}>
                        <h1 >Producto</h1>
                        <label >Nombre producto</label>
                        <input type="text" name="nombre" onChange={this.handleInputChange} className="form-control" placeholder="Nombre producto" required autoFocus="" />
                        <label >Descripcion</label>
                        <textarea name="descripcion" onChange={this.handleInputChange} className="form-control mb-3" placeholder="Descripcion producto" required />
                        <label >Rango precio</label><br/>
                        <InputNumber
                            min={0}
                            style={{ marginRight: '50px' }}
                            value={precioMin}
                            onChange={this.inputNumberMin}
                        />

                        <InputNumber
                            min={precioMin}
                            max={500}
                            style={{ marginLeft: '50px' }}
                            value={precioMax}
                            onChange={this.inputNumberMax}
                        />

                        <Slider
                            range
                            step={1}
                            defaultValue={[0, 500]}
                            min={0}
                            max={500}
                            value={[this.state.precioMin,this.state.precioMax]}
                            onChange={this.onChange}
                            required
                        />
                        <input type="file" name="file0" onChange={this.fileChange}></input>
                        <br/><br/>
                        <button className="btn btn-primary btn-block" type="submit">Añadir producto</button>
                    </form>
                </div>
            </div>
        )
    }
}