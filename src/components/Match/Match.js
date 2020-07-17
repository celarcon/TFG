import React, { Component } from 'react';
import { Link} from 'react-router-dom';

export default class Match extends Component {

    render() {
        return (
            <div>
                Estos siran los productos con Match
                <Link to="/Match/ProductoMatch" >
                    Chat
                </Link>
            </div>
        )
    }
}
