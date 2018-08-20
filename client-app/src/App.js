import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    cities: [],
    city: {
      name: '',
      district: '',
      population: 0
    }
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

  addCity = _ => {
    const { city } = this.state;
    fetch('http://localhost:3003/city_create', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        create_name: city.name,
        create_district: city.district,
        create_population: city.population
      })
    })
      .then(res => {
        console.log(res);
        this.getCities;
      })
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
    const { cities, city } = this.state;
    return (
      <div className="App">
        <div>
          Enter info for new City:
          <hr />

          <input type="text" placeholder="Name" name="name"
            value={city.name}
            onChange={e => this.setState({ city: { ...city, name: e.target.value } })} />

          <input type="text" placeholder="District" name="district"
            value={city.district}
            onChange={e => this.setState({ city: { ...city, district: e.target.value } })} />

          <input type="number" placeholder="Population" name="population"
            value={city.population}
            onChange={e => this.setState({ city: { ...city, population: e.target.value } })} />

          <button onClick={this.addCity}>Add City</button>
        </div>
        <br />
        {cities.map(this.renderCities)}
      </div>
    );
  }
}

export default App;
