import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    cities: []
  }

  componentDidMount() {
    this.getCities();
  }

  getCities = _ => {
    fetch('http://localhost:3003/cities')
      .then(res => res.json())
      .then(res => this.setState({ cities: res }))
      .catch(err => console.log(err))
  }

  renderCities = ({ name, district, population }) => (
    <div className="city-details">
      <div>{name}</div>
      <div>{district}</div>
      <div>{population}</div>
    </div>
  )

  render() {
    const { cities } = this.state;
    return (
      <div className="App">
        {cities.map(this.renderCities)}
      </div>
    );
  }
}

export default App;
