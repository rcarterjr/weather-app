import React, { Component } from 'react'
import Title from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'
import './App.css'

// https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables
const API_KEY = process.env.REACT_APP_NOT_SECRET_CODE

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
  }

  getWeather = async e => {
    e.preventDefault() // prevents a full page refresh so we can see the object in console
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    var api_call = null
    var data = null

    try {
      api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=imperial`
      ) // change 'weather' to 'forcast' in url for more info!!
      data = await api_call.json()

      // saves the page from breaking if user presses button before defining
      if (city && country) {
        console.log(data)
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: '',
        })
      } else {
        this.setState({
          error: 'Please enter the city and country',
        })
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.setState({
        error: data.message,
      })
    }
  }
  render() {
    return (
      <div>
        <Title />
        <Form getWeather={this.getWeather} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          error={this.state.error}
        />
      </div>
    )
  }
}

export default App
