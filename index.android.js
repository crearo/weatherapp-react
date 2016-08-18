'use strict';

import React, { Component } from 'react';
import{
	Alert,
	AppRegistry,
	NetInfo,
	StyleSheet,
	Text,
	View
} from 'react-native';

// component declaration
var WeatherView = require('./App/Views/WeatherView.js');

// constants used for background colors
const BG_HOT  = "#fb9f4d";
const BG_WARM = "#fbd84d";
const BG_COLD = "#00abe6";

const REQUEST_URL = "http://api.openweathermap.org/data/2.5/weather?units=metric&";
const APPID = "0a96c94fea51e8d1d858f902ee9dfc64";

// Application class
class WeatherApp extends React.Component {

  // returns initial state variables
  // in this case we have weatherData which will hold the API response
  // and backgroundColor which is the state variable for the colour set by the temperature
	constructor(props){
		super(props);
		this.state = {
			weatherData: null,
      backgroundColor: "#FFFFFF"
		};
	}

  // this method is invoked automatically when the class (or module)
  // is mounted successfully. In this instance, we use it to query the
  // navigator to get the current geolocation latitude and longitude
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
			location => {
				var formattedURL = REQUEST_URL + "lat=" + location.coords.latitude + "&lon=" + location.coords.longitude + "&APPID=" + APPID;
	      console.log(formattedURL);
	      // get the data from the API
	      this.fetchData(formattedURL);
	      },
    	error => {
    		// Display dialog if unable to get current location
      	console.log(error);
      	Alert.alert(
      		"Unable to fetch location.",
      		"Please turn on GPS to get weather information of your locality.",
      		[
      			{text:'Ignore', onPress: () => console.log("Canceled")},
						{text:'Turn On GPS', onPress: () => console.log("Turn On GPS pressed")}
      		]
      	);
    });
  }

  // fetchdata takes the formattedURL, gets the json data and
  // sets the apps backgroundColor based on the temperature of
  // the location
  fetchData(url) {
		NetInfo.isConnected.fetch().then(isConnected => {
  		console.log('Is ' + (isConnected ? 'online' : 'offline'));
			if (isConnected) {
				fetch(url)
		      .then((response) => response.json())
		      .then((responseData) => {
		        // set the background colour of the app based on temperature
		        var bg;
						var temp = parseInt(responseData.main.temp);

		        if(temp < 14) {
		          bg = BG_COLD;
		        } else if(temp >= 14 && temp < 25) {
		          bg = BG_WARM;
		        } else if(temp >= 25) {
		          bg = BG_HOT;
		        }

		        // update the state with weatherData and a set backgroundColor
		        this.setState({
		          weatherData: responseData,
		          backgroundColor: bg
		        });
		      })
		      .done();
			} else {
				Alert.alert(
					'Unable to connect to the internet.',
					'Please connect to the internet',
					[
						{text:'Okay', onPress: () => console.log("Okayed")}
					]
				);
			}
		});
  }

  // the loading view is a temporary view used while waiting
  // for the api to return data
  // note
  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Loading Weather Information
        </Text>
      </View>
    );
  }

  render() {
    // check if weather data is available
    // if not, render the loading view
    if (!this.state.weatherData) {
      return this.renderLoadingView();
    }

    // format text used in the state.weatherData variable as these
    // are passed to the WeatherView component
    var city = this.state.weatherData.name.toUpperCase();
    var country = this.state.weatherData.sys.country.toUpperCase();
    var temp = parseInt(this.state.weatherData.main.temp).toFixed(0);
    var weather = this.state.weatherData.weather[0].icon.toString();

    // render
    return (
      <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
          <WeatherView
                weather={weather}
                temperature={temp}
                city={city}
                country={country} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    fontSize: 32,
    fontWeight: "100",
    color: "#666666",
    textAlign: "center"
  }
});

AppRegistry.registerComponent('AwesomeProject', () => WeatherApp);
