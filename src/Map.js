import React, { Component } from 'react';
import './App.css';

class Map extends Component {
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
            There will be a map
            </div>
        </div>
        );
    }
}  

export default Map;