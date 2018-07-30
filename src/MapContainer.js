import React, { Component } from 'react';
import './App.css';
import Map from './Map.js'

class MapContainer extends Component {
    
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