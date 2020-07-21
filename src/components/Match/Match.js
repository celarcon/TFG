import React, { Component } from 'react';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';

export default class Match extends Component {
    state={

        relacionados:[]
    }

    componentDidMount= async()=>{
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);

        var rel = await Axios.get('http://localhost:4000/relacionados/' + decoded._id);
        console.log(rel.data);
        //var prod1 =
        //var prod2 =
    }
    render() {
        return (
            <div>
                Estos siran los productos con Match
            </div>
        )
    }
}
