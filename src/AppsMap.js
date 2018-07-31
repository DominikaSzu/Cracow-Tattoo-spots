import React, { Component } from 'react';
import './App.css';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state={
            locations: [
            {name: 'Rock’n’Ink', location: { lat: 50.065207, lng: 19.938842}, id: 1},
            {name: 'Crazy Tattoo', location: { lat: 50.059621, lng: 19.937855}, id: 2},
            {name: 'Retro Ink Tattoo', location: { lat: 50.062594, lng: 19.934261}, id: 3},
            {name: 'Kult Tattoo Fest', location: { lat: 50.062911, lng: 19.941253}, id: 4},
            {name: 'Hardcore Tattoo', location: { lat: 50.063879, lng: 19.937382}, id: 5}
        ], 
         showingInfoWindow: false,
         activeMarker: {},
         seletedPlace: {}
        }
        
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClicked = this.onMapClicked.bind(this);
    }

    onMarkerClick = (props, marker, e) => {
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
        console.log(props)
        console.log(this.state.showingInfoWindow)
        console.log(this.state.activeMarker)
    }
    
    render() {
        let locations = this.state.locations;
        const AppGoogleMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = {{ lat: 50.061599, lng: 19.937331 }}
        defaultZoom = { 15 }
        onClick={this.onMapClicked}
      >
        {locations.map(location => 
        <Marker 
            position={location.location}
            key={location.id} 
            onClick={this.onMarkerClick}>
            <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                <p>{location.name}</p>
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

