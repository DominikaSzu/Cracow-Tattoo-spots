import React, {Component} from 'react';
import './App.css';

let foursquare = require('react-foursquare')({
    clientID: 'GWNXWL2MJUSFRH1HRFGMNBMCDFKMZDA1EFGOCUKWDJ4UCCVJ',
    clientSecret: 'Y1KJKAYQ3F3VIWJS12KYCBCKYL4SPSYBBPQCW5UUSSV35ME4'
}); 

// Fetching data from Foursquare API

class Foursquare extends Component {

    state = {
            info: null,
            venueID: { 'venue_id': this.props.venueID },
            params: {
            'll': this.props.latInf.toString() + ',' + this.props.lngInf.toString(), 
            'query': this.props.markerTitle
            }
        };
    
    componentDidMount() {
        
        foursquare.venues.getVenues(this.state.params)
            .then(res => {
                this.setState({
                    info: res.response.venues[0].location.address });
            
            }).catch(error => alert('Sorry, there is some problem with Foursquare API, try to reload the page'));        
        }

render() {
    let addressInfo;
    if (this.state.info !== null) {
        addressInfo = this.state.info
        
    return(
    <p>
        {addressInfo}
    </p>
    )
    } else {
        addressInfo = null
        return 'Loading is on...'
    }
}
}

export default Foursquare