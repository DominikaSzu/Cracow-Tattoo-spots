import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Foursquare from './Foursquare.js';
import logo from './logo.png';
import './App.css';

export default class MapContainer extends Component {
              
    state={
            locations: [
            {name: 'Pimiento', location: { lat: 50.059784, lng: 19.938652}, id: 1, venueID: '4cc884e241e75481702a5784'},
            {name: 'La Grande Mamma', location: { lat: 50.061245, lng: 19.935592}, id: 2, venueID: '53edf52a498e8d4bb322446f'},
            {name: 'Farina', location: { lat: 50.063931, lng: 19.939795}, id: 3, venueID: '4dc6ad07887717c88041ae1e'},
            {name: 'Moo Moo Steak & Burger Club', location: { lat: 50.062208, lng: 19.942640}, id: 4, venueID: '5a8b1ac97247501bc1266044'},
            {name: 'Del Papa Ristorante', location: { lat: 50.063918, lng: 19.936661}, id: 5, venueID: '4d7396c127ddb60c3925de1b'}
        ],
        markers: [],
        query: '',
        infowindow: new this.props.google.maps.InfoWindow()
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
                
                const styles = [
                    {
                        "featureType": "all",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "hue": "#ffaa00"
                            }
                        ]
                    }
                ];
                
                const mapRef = this.refs.map;
                
                let zoom = 14;
                let lat = 50.061599;
                let lng = 19.937331;
                const center = new maps.LatLng(lat, lng);
                const mapConfig = Object.assign({}, {
                    center: center,
                    zoom: zoom,
                    styles: styles
                })
                this.map = new maps.Map(mapRef, mapConfig);
                this.createMarkers();
                this.listControl();
            }
        }

    
    // click on list element
    
    listControl = () => {
        let {markers, infowindow} = this.state;
        let that = this;
        let defaultMarker = this.makeMarkerDefault();
        
        let elements = document.querySelector('.spot-list');
        
        elements.addEventListener('click', function(event){
            markers.forEach(marker => marker.setIcon(defaultMarker));
            if(event.target && event.target.nodeName === 'LI') {
                let num = markers.findIndex(mar=> mar.title.toLowerCase() === event.target.innerText.toLowerCase())
                that.populateInfoWindow(markers[num], infowindow);
            }
        })
        
    };

    // Function which updates the query with info inserted by user
    updateQuery = (event) => {
        this.setState({ query: event.target.value });
    };
    
    createMarkers = () => {
        const {locations, markers, infowindow} = this.state;
        const {google} = this.props;
        let defaultMarker = this.makeMarkerDefault();

        locations.forEach((location) => {
            let marker = new google.maps.Marker({
                position: location.location,
                map: this.map,
                title: location.name,
                icon: defaultMarker,
                venueID: location.venueID,
            });

            markers.push(marker);
            
            marker.addListener('click', () => {
                markers.forEach(marker => marker.setIcon(defaultMarker));
                this.populateInfoWindow(marker, infowindow);
            })
        })
        
        this.setState({ markers });
    };

    populateInfoWindow = (marker, infowindow) => {
           
            let clickedMarker = this.makeMarkerClicked();
            let defaultMarker = this.makeMarkerDefault();
            
        if (infowindow.marker !== marker) {
            
            infowindow.marker = null;            
            infowindow.marker = marker;
            let latInf = marker.position.lat();
            let lngIng = marker.position.lng();           
            
            
           //fetching details from api
            
            let infoBox = document.createElement('div');
            let infoPlace = document.querySelector('.info-place');
            infoPlace.innerHTML= '';
            let foursquareInfo = <Foursquare venueID={marker.venueID} latInf={latInf} lngInf={lngIng} markerTitle={marker.title} />;
            ReactDOM.render(foursquareInfo, infoBox);
            
            infoPlace.appendChild(infoBox);
            infowindow.setContent('<div>' + marker.title + '</div>');
            
            infowindow.open(this.map, marker);
            
            marker.setIcon(clickedMarker);
            
            infowindow.addListener('closeclick', () => {
                marker.setIcon(defaultMarker);
                infowindow.marker = null;
                infoPlace.innerHTML = '';
            });
            
            //when user clicks on map, infowindow closes
            this.map.addListener('click', () => {
                infowindow.close();
                infowindow.marker = null;
                marker.setIcon(defaultMarker);
                infoPlace.innerHTML= '';
            });

        } else {
            marker.setIcon(defaultMarker);
        }
        
    }
    
    // Styles the marker with default style
    
    makeMarkerDefault = () => {
            const {google} = this.props;
            let markerImage = new google.maps.MarkerImage(
            'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FA8FC0')
        
        return markerImage;
    }
    
    // Styles the marker when it's clicked
    
    makeMarkerClicked = () => {
        const {google} = this.props;
        let markerImage = new google.maps.MarkerImage(
            'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0D81')
        
        return markerImage;
    }

    
    render() {

        let {query, markers, locations, infowindow} = this.state;

        if (query !== '') {
            
            locations.forEach((location, i) => {
                if (location.name.toLowerCase().includes(query.toLowerCase())) {
                    markers[i].setVisible(true);
                } else {      
                if (infowindow.marker === markers[i]) {
                    infowindow.close();
                }
                markers[i].setVisible(false);
                }
            })

        } else {
                locations.forEach((location, i) => {
                    if (markers.length && markers[i]) {
                        markers[i].setVisible(true);
                    }
                })
        }
        
        return(
            
        <div className="container">
            <div className="spots-filter">
            <p tabIndex='0'>Where you want eat?</p>
                <input role="search" type="text" className="input-space" id="input-space" placeholder="Wanna go to..." value={this.state.query} onChange={this.updateQuery} />
                <ul className="spot-list">
                    {markers.filter(marker => marker.getVisible()).map((marker, i) => (
                    <li key={i} tabIndex='0'>{marker.title}</li>
                    ))}
                </ul>
                <div className="info-place" tabIndex='0'>
                </div>
                <img src={logo} alt='Foursquare Logo' width='50px' />
            </div>
            <div role="application" className="map-container" ref="map">
                Map will go here
            </div>
        </div>
        );
    }
}  

