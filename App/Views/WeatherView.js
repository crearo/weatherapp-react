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
var WeatherView = React.createClass({

	// the state variables that will be used but
	// also declaration of the propTypes the variables
	// are expected to be
	propTypes: {
		weather: React.PropTypes.string,
		temperature: React.PropTypes.int,
		city: React.PropTypes.string,
		country: React.PropTypes.string
  },

	// the views render method
	render: function() {
		return (
			<View style={styles.centreContainer}>
				<Image source={weatherIconArray[this.props.weather]} style={styles.weatherIcon} />
				<Text style={styles.weatherText}>{this.props.temperature}&deg;</Text>
				<Text style={styles.weatherTextLight}>{this.props.city},</Text>
				<Text style={styles.weatherTextLight}>{this.props.country}</Text>
			</View>
    )
  }
});

// the components Styles
var styles = StyleSheet.create({
	centreContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
	weatherIcon: {
    width: 132,
    height: 132,
  },
  weatherText: {
    fontSize: 62,
    fontWeight: "bold",
    color: "#FFFFFF",
		textAlign: "center"
  },
  weatherTextLight: {
    fontSize: 32,
    fontWeight: "100",
    color: "#FFFFFF",
		textAlign: "center"
  }
});

// this components export name is WeatherView
module.exports = WeatherView;