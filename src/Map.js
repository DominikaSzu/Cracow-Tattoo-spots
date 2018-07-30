import React, { Component } from 'react';
import './App.css';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

class Map extends Component {
     state = {
        locations: [
            {name: 'Rock’n’Ink', location: { lat: 50.065207, lng: 19.938842}, id: 1},
            {name: 'Crazy Tattoo', location: { lat: 50.059621, lng: 19.937855}, id: 2},
            {name: 'Retro Ink Tattoo', location: { lat: 50.062594, lng: 19.934261}, id: 3},
            {name: 'Kult Tattoo Fest', location: { lat: 50.062911, lng: 19.941253}, id: 4},
            {name: 'Hardcore Tattoo', location: { lat: 50.063879, lng: 19.937382}, id: 5}
        ]
    }
    
    render() {
        let locations = this.state.locations;
        const AppGoogleMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = {{ lat: 50.061599, lng: 19.937331 }}
        defaultZoom = { 15 }
      >
        {locations.map(location => 
        <Marker 
            position={location.location}
            key={location.id}>
            <InfoWindow>
            <p>Elo</p>
            </InfoWindow>
        </Marker>
            )}
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