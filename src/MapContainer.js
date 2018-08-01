import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { GoogleApiWrapper } from 'google-maps-react'

class MapContainer extends Component {
    
    state={
            locations: [
            {name: 'Rock’n’Ink', location: { lat: 50.065207, lng: 19.938842}, id: 1},
            {name: 'Crazy Tattoo', location: { lat: 50.059621, lng: 19.937855}, id: 2},
            {name: 'Retro Ink Tattoo', location: { lat: 50.062594, lng: 19.934261}, id: 3},
            {name: 'Kult Tattoo Fest', location: { lat: 50.062911, lng: 19.941253}, id: 4},
            {name: 'Hardcore Tattoo', location: { lat: 50.063879, lng: 19.937382}, id: 5}
        ],
        markers: [],
        query: ''
    }
    
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
                this.createMarkers();
                this.handleSearching();
            }
        }
    
    createMarkers() {
        const {locations} = this.state;
        const {google} = this.props;
        const {markers} = this.state;
        locations.forEach((location) => {
            let marker = new google.maps.Marker({
                position: location.location,
                map: this.map,
                title: location.name
            });
            
            markers.push(marker);
            
            let newInfoWindow = new google.maps.InfoWindow();
            
            marker.addListener('click', () => {
                this.populateInfoWindow(marker, newInfoWindow);
            })
        })
    };

    populateInfoWindow = (marker, infowindow) => {
        if (infowindow.marker !== marker) {
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(this.map, marker);
            
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;        
            });
            //when user clicks on map, infowindow closes
            this.map.addListener('click', function() {
                infowindow.close();
            });
            
        }
    };

    handleSearching = () => {
        const {google} = this.props;
        const inputAutocomplete = new google.maps.places.Autocomplete(
        document.getElementById('input-space'));
        
        inputAutocomplete.bindTo('bounds', this.map);
    }
    
    render() {
        if(!this.props.loaded) {
            return <div>Soon there will be a map... </div>
        }

        
        return(
        <div className="container">
            <div className="spots-filter">
                <input className="input-space" id="input-space"/>
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

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCWSOC0yBETlxi2CaHga4MonDI1tm48PJ0',
    libraries: ['places']
})(MapContainer);