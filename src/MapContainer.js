import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom'

export default class MapContainer extends Component {
    
    componentDidUpdate(prevProps, prevState) {
            if (prevProps.google !== this.props.google) {
                this.loadMap();
            }
        }
       
    componentDidMount() {
        this.loadMap();
    }
    
        loadMap() {
            if (this.props && this.props.google) {
                //control if the google api is available                
                const {google} = this.props;
                const maps = google.maps;
                
                const mapRef = this.refs.map;
                const node = ReactDOM.findDOMNode(mapRef);
                
                let zoom = 15;
                let lat = 50.061599;
                let lng = 19.937331;
                const center = new maps.LatLng(lat, lng);
                const mapConfig = Object.assign({}, {
                    center: center,
                    zoom: zoom
                })
                this.map = new maps.Map(node, mapConfig);
            }
        }
    
    
    
    render() {
        if(!this.props.loaded) {
            return <div>Soon there will be a map... </div>
        }

        
        return(
        <div className="container">
            <div className="spots-filter">
                <input />
                <ul>
                There will be a list of spots
                </ul>
            </div>
            <div className="map-container" ref="map">
                Map will go here
            </div>
        </div>
        );
    }
}  
