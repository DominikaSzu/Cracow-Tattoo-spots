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
        query: '',
//        placeMarkers: []
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
//                this.handleSearching();
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
            
            if (infowindow.marker.title == marker.title) {
                //it will bounce bounce
                console.log(infowindow.marker.title)
                console.log(marker.title)
            }
            
        }
    };

//    handleSearching = () => {
//        const {google} = this.props;
//        const {placeMarkers} = this.state;
//
//        const searchBox = new google.maps.places.SearchBox(
//            document.getElementById('input-space'));
//        searchBox.setBounds(this.map.getBounds());
//        
//        // Function fires when user selects a place from list
//        searchBox.addListener('places_changed', function() {
//           this.searchBoxPlace(this); 
//        });
//    
//        
//    }
    // Function to hide markers
//    hideMarkers = (markers) => {
//        for (let i=0; i < markers.length; i++) {
//            markers[i].setMap(null);
//        }
//    }
//    
//    searchBoxPlace = (searchBox) => {
//            let places = searchBox.getPlace();
//            
//            if (places.length == 0) {
//                window.alert('We are sorry, but there is no place matching your search!');
//            }
//    }
    
    updateQuery = (event) => {
        this.setState({ query: event.target.value });
    }
    
    render() {
        if(!this.props.loaded) {
            return <div>Soon there will be a map... </div>
        }

        let {query, markers, locations} = this.state;
        
        if (query != '') {
            
            for (let i=0; i < markers.length; i++) {
                markers[i].setVisible(false);
            }
            
            locations.forEach((location) => {
                if (location.name.toLowerCase().includes(query.toLowerCase())) {
                    for (let i =0; i < markers.length; i++) {
                        if (markers[i].title == location.name) {
                            markers[i].setVisible(true)
                        }
                    }
                }
            })

        } else {
            for (let i=0; i < markers.length; i++) {
                markers[i].setVisible(true);
            }
        }
        
        console.log(this.state.markers)
        
        return(
        <div className="container">
            <div className="spots-filter">
            <p>Where you want to get a tattoo?</p>
                <input type="text" className="input-space" id="input-space" placeholder="Wanna go to..." value={this.state.query} onChange={this.updateQuery} />
                <ul>
                There will be a list of spots
                </ul>
                <div className="info-place">
                Place x fetch api infooo
                </div>
            </div>
            <div className="map-container" ref="map">
                Map will go here
            </div>
        </div>
        );
    }
}  

