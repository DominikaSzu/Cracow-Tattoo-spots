import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class MapContainer extends Component {
    
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
 
    
    // click on list element
    
    listControl = () => {
        let {markers, infowindow, locations} = this.state;
        let clickedMarker = this.makeMarkerClicked();
        let defaultMarker = this.makeMarkerDefault();
        let that = this;
        
        let elements = document.querySelector('.spot-list');
        
        elements.addEventListener('click', function(event){
            if(event.target && event.target.nodeName === 'LI') {
                let num = markers.findIndex(mar=> mar.title.toLowerCase() === event.target.innerText.toLowerCase())
                that.populateInfoWindow(markers[num], infowindow);
            }
        })
        
    };

    // Function which updates the query with info inserted by user
    updateQuery = (event) => {
        this.setState({ query: event.target.value });
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
            
            markers.push(marker)
            
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
        console.log(markers)
        if (query !== '') {
            
//            for (let i=0; i < markers.length; i++) {
//                markers[i].setVisible(false);
//            }
            
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
            <p>Where you want to get a tattoo?</p>
                <input type="text" className="input-space" id="input-space" placeholder="Wanna go to..." value={this.state.query} onChange={this.updateQuery} />
                <ul className="spot-list">
                {markers.filter(marker => marker.getVisible()).map((marker, i) => (
                <li key={i}>{marker.title}</li>
                ))}
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

