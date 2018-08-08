import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './App.css';

let foursquare = require('react-foursquare')({
    clientID: 'GWNXWL2MJUSFRH1HRFGMNBMCDFKMZDA1EFGOCUKWDJ4UCCVJ',
    clientSecret: 'Y1KJKAYQ3F3VIWJS12KYCBCKYL4SPSYBBPQCW5UUSSV35ME4'
});

let params = {
    
}

export default class Foursquare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: []
        };
    }
    
    componentDidMount() {
        foursquare.venues.getVenues(params)
        .then(res => {
            this.setState({
                items: res.response.venues
            });
        });
    }

render() {
    return(
    <div className="picture-box">
        {this.state.picture}
    </div>
    )
}
}