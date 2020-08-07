import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

//antDesing
import { Slider, InputNumber } from 'antd';//Para el slider
import 'antd/dist/antd.css';

export class EditarProductos extends Component {
    state ={
        nombre: ' ',
        descripcion: ' ',
        precioMin: '0',
        precioMax: '500',
        selectedFile: null
    }
    handleSubmit = async (e) => {
        //e.prevenetDefault();
        console.log(this.props.location.state.id._id);
        await axios.put('http://localhost:4000/products/'+this.props.location.state.id._id ,{ 
            nombre: this.state.nombre, 
            descripcion: this.state.descripcion,
            precioMin: this.state.precioMin,
            precioMax: this.state.precioMax,
        });

        //subir archivo
        if(this.state.selectedFile !== null){
            
            //var productoId = this.state.idPropietario;
            
            const formData = new FormData();

            formData.append(
                'file0',
                this.state.selectedFile,
                this.state.selectedFile.name
            );

            await axios.post('http://localhost:4000/products/upload-image/'+ this.props.location.state.id._id, formData);
        }
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
            <div>
                <div className="container">
                <div className="row text-center justify-content-center align-self-center">
                    <form  onSubmit={this.handleSubmit}>
                        <h1 >Edita producto</h1>
                        <label >Nombre producto</label>
                        <input type="text" name="nombre"  onChange={this.handleInputChange} className="form-control" placeholder="Nombre producto" required autoFocus="" />
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
                        
                        <button className="btn btnPrimario btn-block" type="submit">Editar producto</button>
                        <Link to="/MisProductos">
                        <button className="btn btnPrimario btn-block" >Volver</button>
                        </Link>
                    </form>
            </div>
            </div>
        </div>
        )
    }
}

export default EditarProductos;
