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
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#444444"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "weight": "3.44"
                            },
                            {
                                "gamma": "1.12"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.country",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            },
                            {
                                "color": "#c36990"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.province",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#eca9c6"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 45
                            },
                            {
                                "color": "#ce96ae"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    }
                ];
                
                const mapRef = this.refs.map;
                const node = ReactDOM.findDOMNode(mapRef);
                
                let zoom = 14;
                let lat = 50.061599;
                let lng = 19.937331;
                const center = new maps.LatLng(lat, lng);
                const mapConfig = Object.assign({}, {
                    center: center,
                    zoom: zoom,
                    styles: styles
                })
                this.map = new maps.Map(node, mapConfig);
                this.createMarkers();
                this.listControl();
            }
        }
    
    createMarkers() {
        const {locations, markers, infowindow} = this.state;
        const {google} = this.props;
        let defaultMarker = this.makeMarkerDefault();

        locations.forEach((location) => {
            let marker = new google.maps.Marker({
                position: location.location,
                map: this.map,
                title: location.name,
                icon: defaultMarker
            });
            
            markers.push(marker);
            
            marker.addListener('click', () => {
                this.populateInfoWindow(marker, infowindow);
            })
        })
    };

    populateInfoWindow = (marker, infowindow) => {
           
            let clickedMarker = this.makeMarkerClicked();
            let defaultMarker = this.makeMarkerDefault();
        
        if (infowindow.marker !== marker) {
            
            marker.setIcon(clickedMarker);
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(this.map, marker);
            
            infowindow.addListener('closeclick', function() {
                infowindow.marker = null;        
            });
            
            //when user clicks on map, infowindow closes
            this.map.addListener('click', function() {
                infowindow.close();
                infowindow.marker = null;
                marker.setIcon(defaultMarker);
            });
            
            if (infowindow.marker.title === marker.title) {
                //it will bounce bounce
                console.log(infowindow.marker.title)
                console.log(marker.title)
            }
            
        }
    };

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

    // Function which updates the query with info inserted by user
    updateQuery = (event) => {
        this.setState({ query: event.target.value });
    }
    
    // click on list element
    
    listControl = () => {
        let {markers, infowindow, locations} = this.state;
        let clickedMarker = this.makeMarkerClicked();
        let defaultMarker = this.makeMarkerDefault();
        
        const element1 = document.querySelector('#element1');
        console.log(element1);
        const element2 = document.querySelector('#element2');
        console.log(element2);
        const element3 = document.querySelector('#element3');
        console.log(element3);
        const element4 = document.querySelector('#element4');
        console.log(element4);
        const element5 = document.querySelector('#element5');
        console.log(element5);
        
        element1.addEventListener('click', function(){
            markers.forEach((marker) => {
                if (marker.title == element1.innerText) {
                    marker.setIcon(clickedMarker);
                    
                    if (infowindow.marker !== marker) {
            
                    marker.setIcon(clickedMarker);
                    infowindow.marker = marker;
                    infowindow.setContent('<div>' + marker.title + '</div>');
                    infowindow.open(this.map, marker);

                    infowindow.addListener('closeclick', function() {
                        infowindow.marker = null;        
                    });

                }
                    //jeszcze trza to wylaczyc
                }
                
                element1.style.fontWeight = 'bold';
            })
        });    
        
        
        element2.addEventListener('click', function(){
            markers.forEach((marker) => {
                if (marker.title == element2.innerText) {
                    marker.setIcon(clickedMarker);
                    
                    if (infowindow.marker !== marker) {
            
                    marker.setIcon(clickedMarker);
                    infowindow.marker = marker;
                    infowindow.setContent('<div>' + marker.title + '</div>');
                    infowindow.open(this.map, marker);

                    infowindow.addListener('closeclick', function() {
                        infowindow.marker = null;        
                    });

                }
                    //jeszcze trza to wylaczyc
                }
                
                element2.style.fontWeight = 'bold';
            })
        });
        
        element3.addEventListener('click', function(){
            markers.forEach((marker) => {
                if (marker.title == element3.innerText) {
                    marker.setIcon(clickedMarker);
                    
                    if (infowindow.marker !== marker) {
            
                    marker.setIcon(clickedMarker);
                    infowindow.marker = marker;
                    infowindow.setContent('<div>' + marker.title + '</div>');
                    infowindow.open(this.map, marker);

                    infowindow.addListener('closeclick', function() {
                        infowindow.marker = null;        
                    });

                }
                    //jeszcze trza to wylaczyc
                }
                
                element3.style.fontWeight = 'bold';
            })
        });
        
        element4.addEventListener('click', function(){
            markers.forEach((marker) => {
                if (marker.title == element4.innerText) {
                    marker.setIcon(clickedMarker);
                    
                    if (infowindow.marker !== marker) {
            
                    marker.setIcon(clickedMarker);
                    infowindow.marker = marker;
                    infowindow.setContent('<div>' + marker.title + '</div>');
                    infowindow.open(this.map, marker);

                    infowindow.addListener('closeclick', function() {
                        infowindow.marker = null;        
                    });

                }
                    //jeszcze trza to wylaczyc
                }
                
                element4.style.fontWeight = 'bold';
            })
        });
        
        element5.addEventListener('click', function(){
            markers.forEach((marker) => {
                if (marker.title == element5.innerText) {
                    marker.setIcon(clickedMarker);
                    
                    if (infowindow.marker !== marker) {
            
                    marker.setIcon(clickedMarker);
                    infowindow.marker = marker;
                    infowindow.setContent('<div>' + marker.title + '</div>');
                    infowindow.open(this.map, marker);

                    infowindow.addListener('closeclick', function() {
                        infowindow.marker = null;        
                    });

                }
                    //jeszcze trza to wylaczyc
                }
                
                element5.style.fontWeight = 'bold';
            })
        });

    }
    
    render() {
        if(!this.props.loaded) {
            return <div>Soon there will be a map... </div>
        }

        let {query, markers, locations} = this.state;
        
        if (query !== '') {
            
            for (let i=0; i < markers.length; i++) {
                markers[i].setVisible(false);
            }
            
            locations.forEach((location) => {
                if (location.name.toLowerCase().includes(query.toLowerCase())) {
                    for (let i =0; i < markers.length; i++) {
                        if (markers[i].title === location.name) {
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
        
        return(
        <div className="container">
            <div className="spots-filter">
            <p>Where you want to get a tattoo?</p>
                <input type="text" className="input-space" id="input-space" placeholder="Wanna go to..." value={this.state.query} onChange={this.updateQuery} />
                <ul className="spot-list">
                <li id="element1">{locations[0].name}</li>
                <li id="element2">{locations[1].name}</li>
                <li id="element3">{locations[2].name}</li>
                <li id="element4">{locations[3].name}</li>
                <li id="element5">{locations[4].name}</li>
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

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCWSOC0yBETlxi2CaHga4MonDI1tm48PJ0',
    libraries: ['places']
})(MapContainer);