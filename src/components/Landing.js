import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Axios from 'axios';
import Relacionados from './Relacionados/Relacionados';
import { Layout} from 'antd';

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
    const rel = await Axios.get('http://localhost:4000/products/relacionados/' + res.data._id);
    this.setState({ producto: null });
    this.setState({ producto: res.data });
    this.setState({relaciondos: []});
    this.setState({relaciondos: rel.data.prodsRela});
  };

  elimiarInteresado = async e =>{
    await Axios.delete('http://localhost:4000/interesados/'+this.state.producto._id+'&'+e)

    console.log("Ya no me interesa ")
  }

  anadirInteresado = async e =>{

    //añadimos a interesados
    await Axios.post('http://localhost:4000/interesados/' + this.state.producto._id,
    {
      idInteresado: e
    }
    );

    //comprobamos si el otro producto esta interesado en el nuestro de ser asi lo añadimos a relacionados
    var cond = await Axios.get('http://localhost:4000/interesados/' + e +"&"+ this.state.producto._id)
    console.log( this.state.producto._id);
    console.log(e);
    console.log(cond);
    if(cond.data === true)
    {
      console.log("productos relacionados");
      
      var usu1 =  await Axios.get('http://localhost:4000/products/'+ this.state.producto._id);
      var usu2 =  await Axios.get('http://localhost:4000/products/'+e);

      await Axios.post('http://localhost:4000/relacionados/',{
        idUsuario1: usu1.data.idPropietario,
        idUsuario2: usu2.data.idPropietario,
        idProd1: this.state.producto._id,
        idProd2: e
      })
    }else{ console.log("productos no relacionados")}
  };

  render() {
    return (
      <React.Fragment>
        {localStorage.usertoken ?
          <Router>
            <Layout>
            <Switch >
              <Route path="/home/AñadirProducto" component={AñadirProducto} />
              <Route path="/Usuario" component={Usuario} />
              <Relacionados 
                ProdSelecionado={this.state.producto} 
                ProdRelacionados={this.state.relaciondos} 
                anadirInteresado={this.anadirInteresado}
                elimiarInteresado={this.elimiarInteresado}
                />
            </Switch>
            <Sidebar prodSelecionado={this.prodSelec} />
            </Layout>
          </Router>
          : this.props.history.push(`/`)}
      </React.Fragment>
    )
  }
}

export default Landing;