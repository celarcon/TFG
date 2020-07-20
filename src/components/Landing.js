import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import Relacionados from './Relacionados/Relacionados';
import { Layout } from 'antd';


import Sidebar from './Sidebar/Sidebar';
import Usuario from './Profile/Profile';
import AñadirProducto from './AñadirProducto/AñadirProducto';

class Landing extends Component {

  state = {
    producto: null,
    relaciondos: []
  };
  prodSelec = async e => {
    //this.setState({idProdSelect: e.key});
    const res = await Axios.get('http://localhost:4000/products/' + e);
    const rel = await Axios.get('http://localhost:4000/products/relacionados/' + res.data._id)
    this.setState({ producto: res.data });
    this.setState({relaciondos: rel.data.prodsRela});
  };

  anadirInteresado = async e =>{
    //añadimos a interesados
    await Axios.post('http://localhost:4000/interesados/' + this.state.producto._id,
    {
      idInteresado: e
    }
    );
    //comprobamos si el otro producto esta interesado en el nuestro de ser asi lo añadimos a relacionados
    var cond = await Axios.get('http://localhost:4000/interesados/' + this.state.producto._id,
    {
      idInteresado: e
    })
    console.log(cond.data)
    /*if(cond.data === true)
    {
      console.log("productos relacionados");
      
      var usu1 =  await Axios.get('http://localhost:4000/products/'+ this.state.producto._id);
      console.log(usu1);
      var usu2 =  await Axios.get('http://localhost:4000/products/'+ e);
      await Axios.post('http://localhost:4000/relacionados/',{
        idUsuario1: usu1.idPropietario,
        idUsuario2: usu2.idPropietario,
        idProd1: this.state.producto._id,
        idProd2: e
      })
    }else{ console.log("productos no relacionados")}*/
  };

  render() {
    return (
      <div>
        {localStorage.usertoken ?
          <Router>
            <Layout>
            <Switch >
              <Route path="/home/AñadirProducto" component={AñadirProducto} />
              <Route path="/Usuario" component={Usuario} />
              <Relacionados ProdSelecionado={this.state.producto} ProdRelacionados={this.state.relaciondos} anadirInteresado={this.anadirInteresado}/>
            </Switch>
            <Sidebar prodSelecionado={this.prodSelec} />
            </Layout>
          </Router>
          : this.props.history.push(`/`)}
      </div >
    )
  }
}

export default Landing;