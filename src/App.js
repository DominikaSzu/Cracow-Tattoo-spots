import React, { Component } from 'react';
import './App.css';
import MapContainer from './MapContainer.js';


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

export default App;

