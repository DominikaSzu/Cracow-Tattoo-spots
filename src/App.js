import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer.js'
import { GoogleApiWrapper } from 'google-maps-react'


class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Cracow Tattoo Spots</h1>
        </header>
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCWSOC0yBETlxi2CaHga4MonDI1tm48PJ0'
})(MapContainer);

