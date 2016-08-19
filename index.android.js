'use strict';

import React, { Component } from 'react';
import{
	Alert,
	AppRegistry,
	NetInfo,
	StyleSheet,
	Text,
	TextInput,
	View
} from 'react-native';

// component declaration
let WeatherView = require('./App/Views/WeatherView.js');
let ConnectionLostView = require('./App/Views/ConnectionLostView.js');

// constants used for background colors
const BG_HOT  = "#fb9f4d";
const BG_WARM = "#fbd84d";
const BG_COLD = "#00abe6";

const REQUEST_URL = "http://api.openweathermap.org/data/2.5/weather?units=metric&";
const APPID = "0a96c94fea51e8d1d858f902ee9dfc64";

const TYPE_BY_LATLON = "bylatlong";
const TYPE_BY_NAME = "byplace";

// Application class
class WeatherApp extends React.Component {

  // returns initial state variables
  // in this case we have weatherData which will hold the API response
  // and backgroundColor which is the state variable for the colour set by the temperature
	constructor(props){
		super(props);
		this.handleTextEntered = this.handleTextEntered.bind(this);
		this.state = {
			isConnected : true,
			isLoading : true,
			citySearched : null,
			weatherData: null,
      backgroundColor: "#FFFFFF"
		};
	}

  // this method is invoked automatically when the class (or module)
  // is mounted successfully. In this instance, we use it to query the
  // navigator to get the current geolocation latitude and longitude
  componentDidMount() {
		this.displayAndFetchWeatherData();
  }

  displayAndFetchWeatherData(){
		if (!this.state.citySearched) {
			console.log("City is null, searching by latlon");
	    navigator.geolocation.getCurrentPosition(
				location => {
					let uri = {
						"type" : TYPE_BY_LATLON,
						"lat" : location.coords.latitude,
						"lon" : location.coords.longitude
					};
					let formattedURL = this.buildRequestURL(uri);
		      console.log(formattedURL);
		      this.fetchData(formattedURL);
		      },
	    	error => {
	    		// Display dialog if unable to get current location
	      	console.log(error);
	      	Alert.alert(
	      		"Unable to fetch location.",
	      		"Please turn on GPS to get weather information of your locality. Currently displaying location of New Delhi, India.",
	      		[
							{text:'Turn On GPS', onPress: () => {
								this.setState({citySearched : "india"});
								this.displayAndFetchWeatherData();
							}},
							{text:'Okay', onPress: () => {
									this.setState({citySearched : "india"});
									this.displayAndFetchWeatherData();
								}
							}
	      		]
	      	);
	    });
		} else {
			console.log("City searched not null, is " + this.state.citySearched);
			let uri = {
				"type" : TYPE_BY_NAME,
				"cityName" : this.state.citySearched
			};
			let formattedURL = this.buildRequestURL(uri);
			console.log(formattedURL);
			this.fetchData(formattedURL);
		}
	}

	buildRequestURL(uri) {
		if(uri.type == TYPE_BY_LATLON)
			return REQUEST_URL + "lat=" + uri.lat + "&lon=" + uri.lon + "&APPID=" + APPID;
		else if(uri.type == TYPE_BY_NAME)
			return REQUEST_URL + "q=" + uri.cityName + "&APPID=" + APPID;
		else return REQUEST_URL + "&APPID=" + APPID;
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
		        let bg;
						let temp = parseInt(responseData.main.temp);
						let cityName = responseData.name

		        if(temp < 14) {
		          bg = BG_COLD;
		        } else if(temp >= 14 && temp < 25) {
		          bg = BG_WARM;
		        } else if(temp >= 25) {
		          bg = BG_HOT;
		        }

		        // update the state with weatherData and a set backgroundColor
		        this.setState({
							isConnected:true,
							citySearched:cityName,
		          weatherData: responseData,
		          backgroundColor: bg
		        });
		      })
		      .done();
			} else {
				Alert.alert(
					'Connectivity Issues',
					'Please connect to the internet to get weather information.',
					[{
							text:'Retry', onPress: () => {
								this.setState({isConnected:false}, () => {
									// console.log("Set state to false");
									this.displayAndFetchWeatherData();
								});
							}
					}]
				);
			}
		});
  }

	renderConnectionLostView(){
		return (
			<View>
				<ConnectionLostView retry={this.displayAndFetchWeatherData}>
    		</ConnectionLostView>
   		</View>
		);
	}

  renderLoadingView() {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Loading Weather Information
        </Text>
      </View>
    );
  }

	handleTextEntered(text){
		console.log(this.state.citySearched);
		this.setState({citySearched:text}, () => {
			console.log('from cb' + this.state.citySearched);
			this.displayAndFetchWeatherData();
		});
	}

  render() {
    // check if weather data is available
    // if not, render the loading view
    if (!this.state.weatherData) {
      return this.renderLoadingView();
    }

    // format text used in the state.weatherData variable as these
    // are passed to the WeatherView component
    let city = this.state.weatherData.name.toUpperCase();
    let country = this.state.weatherData.sys.country.toUpperCase();
    let temp = parseInt(this.state.weatherData.main.temp).toFixed(0);
    let weather = this.state.weatherData.weather[0].icon.toString();
		let description = this.state.weatherData.weather[0].description.toString();
		let sunrise = this.state.weatherData.sys.sunrise;
		let sunset = this.state.weatherData.sys.sunset;

    // render
    return (
      <View style={[styles.container, {backgroundColor: this.state.backgroundColor}]}>
          <WeatherView
                weather={weather}
                temperature={temp}
                city={city}
								description={description}
                country={country}
								sunset={sunset}
								sunrise={sunrise} />

					<TextInput
						style={styles.searchBar}
						placeHolder="Enter place name here"
						autoCorrect={false}
						defaultValue={this.state.citySearched}
						onSubmitEditing={(event) => this.handleTextEntered(event.nativeEvent.text)}
					/>
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
    alignItems: "center",
  },
  loadingText: {
    fontSize: 32,
    fontWeight: "100",
    color: "#666666",
    textAlign: "center",
  },
	searchBar:{
		fontSize: 16,
		borderColor: 'black',
		borderRadius: 20,
		borderWidth : 5,
		height:48,
		backgroundColor: 'white',
		margin: 8,
		padding: 4,

	}

});

AppRegistry.registerComponent('AwesomeProject', () => WeatherApp);
