'use strict'

import React, { Component } from 'react';
import{
	AppRegistry,
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';

// the array of weather icons corresponding to their
// openweathermap equivalent code. you can see the weather icons at
// http://openweathermap.org/weather-conditions
var weatherIconArray = [];
weatherIconArray["01n"] = require("image!weather_clear");
weatherIconArray["01d"] = require("image!weather_clear");
weatherIconArray["02n"] = require("image!weather_fewclouds");
weatherIconArray["02d"] = require("image!weather_fewclouds");
weatherIconArray["03n"] = require("image!weather_scatteredcloud");
weatherIconArray["03d"] = require("image!weather_scatteredcloud");
weatherIconArray["04n"] = require("image!weather_brokenclouds");
weatherIconArray["04d"] = require("image!weather_brokenclouds");
weatherIconArray["09n"] = require("image!weather_drizzle");
weatherIconArray["09d"] = require("image!weather_drizzle");
weatherIconArray["10n"] = require("image!weather_rain");
weatherIconArray["10d"] = require("image!weather_rain");
weatherIconArray["11n"] = require("image!weather_thunderstorm");
weatherIconArray["11d"] = require("image!weather_thunderstorm");
weatherIconArray["13n"] = require("image!weather_snow");
weatherIconArray["13d"] = require("image!weather_snow");
weatherIconArray["50n"] = require("image!weather_mist");
weatherIconArray["50d"] = require("image!weather_mist");

// the components class register
class WeatherView extends React.Component{

	constructor(props){
		super(props);
	}

	render() {
		let sunrise = new Date(this.props.sunrise*1000);
		let sunset = new Date(this.props.sunset*1000);

		// following are very sloppy ways of getting time string in 2 digit format.
		sunrise = ("0" + sunrise.getHours()).slice(-2) + " : " + ("0" + sunrise.getMinutes()).slice(-2);
		sunset = ("0" + sunset.getHours()).slice(-2) + " : " + ("0" + sunset.getMinutes()).slice(-2);

		return (
			<View style={styles.centreContainer}>
				<Image source={weatherIconArray[this.props.weather]} style={styles.weatherIcon} />
				<Text style={styles.weatherTextMedium}>{this.props.description}</Text>
				<Text style={styles.weatherTextLarge}>{this.props.temperature}&deg;</Text>
				<Text style={styles.weatherTextMedium}>{this.props.city}, {this.props.country}</Text>
				<Text style={styles.weatherTextSmall}>Sunrise : {sunrise}</Text>
				<Text style={styles.weatherTextSmall}>Sunset  : {sunset}</Text>
			</View>
    )
  }
};


// the state variables that will be used but
// also declaration of the propTypes the variables
// are expected to be
WeatherView.propTypes = {
	weather: React.PropTypes.string,
	temperature: React.PropTypes.string,
	description: React.PropTypes.string,
	city: React.PropTypes.string,
	country: React.PropTypes.string,
	sunset: React.PropTypes.number,
	sunrise: React.PropTypes.number,
}

// the components Styles
const styles = StyleSheet.create({
	centreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
	weatherIcon: {
    width: 132,
    height: 132,
  },
  weatherTextLarge: {
    fontSize: 56,
    fontWeight: "bold",
    color: "#FFFFFF",
		textAlign: "center",
  },
  weatherTextMedium: {
    fontSize: 24,
    fontWeight: "normal",
    color: "#FFFFFF",
		textAlign: "center",
  },
	weatherTextSmall:{
		fontSize: 16,
		fontWeight: "normal",
		color: "#FFFFFF",
		textAlign: "center",
	},
});

// this components export name is WeatherView
module.exports = WeatherView;
