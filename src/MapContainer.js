import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'

class MapContainer extends Component {
    
    state = {
        locations: [
            {name: 'Rock’n’Ink', location: { lat: 50.065207, lng: 19.938842}},
            {name: 'Crazy Tattoo', location: { lat: 50.059621, lng: 19.937855}},
            {name: 'Retro Ink Tattoo', location: { lat: 50.062594, lng: 19.934261}},
            {name: 'Kult Tattoo Fest', location: { lat: 50.062911, lng: 19.941253}},
            {name: 'Hardcore Tattoo', location: { lat: 50.063879, lng: 19.937382}}
        ]
    }
    
    render() {
        return(
        <div className="container">
            <div className="spots-filter">
                <input />
                <ul>
                There will be a list of spots
                </ul>
            </div>
            <div className="map-container">
                <Map />
            </div>
        </div>
        );
    }
}  

export default MapContainer;