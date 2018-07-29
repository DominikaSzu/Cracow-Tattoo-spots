import React, { Component } from 'react';
import './App.css';
import { withGoogleMap, GoogleMap } from "react-google-maps";

class Map extends Component {
    render() {
        
        const AppGoogleMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = {{ lat: 50.049683, lng: 19.944544 }}
        defaultZoom = { 8 }
      >
      </GoogleMap>
   ));
        
        return (
            <AppGoogleMap
          containerElement={ <div style={{ height: `100vh`, width: '80vw' }} /> }
          mapElement={ <div style={{ height: `100vh` }} /> }
        />
        );
    }   
}

export default Map