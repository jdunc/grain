import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  AlertIOS,
  PushNotificationIOS,
  TabBarIOS,
  AsyncStorage,
  Image,
  Dimensions,
  ActionSheetIOS,
  Share
} from 'react-native';
import RNShakeEventIOS from 'react-native-shake-event';
import NotificationsIOS from 'react-native-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextFit from "react-native-textfit"
let grains = require('../grains');

export default class Home extends Component {

  constructor (props) {
    super(props)

    let category = this.props.grainCategory;
    let grainsText = grains.filter(function( grain ){
        return grain.category === category;
      });
    let newNumber = Math.floor(Math.random() * grainsText.length);

      this.state = {
        grains: grains,
        grainCategory: this.props.grainCategory,
        grainsText: grainsText,
        welcomeBoxheight: 100,
        welcomeBoxwidth: 100,
        bgColor: 'rgba(0,0,0,0)',
        newNumber: newNumber,
        favoriteGrainStatusColor: 'white',
        favoriteGrains: [],
      }
    this.changeGrain = this.changeGrain.bind(this);
  }
  

  
  componentWillMount() {
  
  }
  
  componentDidMount () {
    console.log(this.state.grainsText.length);
    this.changeGrain();
    RNShakeEventIOS.addEventListener('shake', () => {
      this.changeGrain();      
    });
    AsyncStorage.getItem("favoriteGrains").then((value) => {
      console.log('favorite grains are: ', value);
      if(value){
        this.setState({
          "favoriteGrains": value,
        });
      }
   }).done(()=>{
     console.log('component mounted: ', this.state.favoriteGrains);
   });

  }

  componentWillUnmount() {
      // Don't forget to remove the event listeners to prevent memory leaks! 
      AsyncStorage.setItem("lastGrainNumber", JSON.stringify(this.state.newNumber));
      AsyncStorage.setItem("favoriteGrains", JSON.stringify(this.state.favoriteGrains));
  }
  
  changeGrain() {
    console.log('grain changed');
    console.log('length: ', this.state.grainsText.length)
    this.setState({
      newNumber: Math.floor(Math.random() * this.state.grainsText.length),
    });
    console.log(this.state.newNumber)
    if(this.state.favoriteGrains.indexOf(this.state.newNumber) === -1){
      this.setState({
        favoriteGrainStatusColor: 'white',
      });
    }
  }
  shareSheet(){
    let message = this.state.grainsText[this.state.newNumber].text;
    Share.share({'message': `take some time to ${message} - from your friends at grain :) `, url: 'http://www.grainapp.co'});
    // ActionSheetIOS.showShareActionSheetWithOptions({
    //   'message': message,
    // }, function(){}, function(){})
  }
  _handler(){
    this.setState({
      bgColor: "red",
    })
    this.props.changeTab('categories');
  }

props: Props

  render(): React$Element<any> {
    return (
      <Image 
        source={require('../img/grainBackground.jpg')}
        style={styles.backgroundImage}>
        <View style={styles.header}>
          <Icon.Button name="home" backgroundColor={this.state.bgColor} onPress = {()=>{this._handler()}}>
          </Icon.Button>
          <Icon.Button name="arrow-right" backgroundColor="rgba(0,0,0,0)" onPress={this.changeGrain}>
          </Icon.Button>
        </View>
          <View 
          style={styles.welcomeBox}
          onLayout={(event) => {
            this.setState({
              welcomeBoxwidth: event.nativeEvent.layout.width,
              welcomeBoxheight: event.nativeEvent.layout.height
            });
            console.log('layout log' + event.nativeEvent.layout.width);
          // let {welcomeBoxx, welcomeBoxy, welcomeBoxwidth, welcomeBoxheight} = event.nativeEvent.layout;
        }}>
          <Text
            adjustsFontSizeToFit={true}
            style={styles.welcome}
            >
              {this.state.grainsText[this.state.newNumber].text}
          </Text>
        </View>
        <View style={styles.footer}>
          <Icon.Button name="heart" color={this.state.favoriteGrainStatusColor} backgroundColor='rgba(0,0,0,0)' onPress={this.toggleFavoriteGrain}>
          </Icon.Button>
          <Icon.Button name="share" backgroundColor="rgba(0,0,0,0)" 
            onPress={()=>{this.shareSheet()}}>
          </Icon.Button>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
  },
  header: {
    marginTop: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
  },
  container: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    width: null,
    height: null,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  welcomeBox: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  welcome: {
    fontSize: 80,
    textAlign: 'center',
    margin: 10,
    padding: 25,
    paddingTop: 100,
    paddingBottom: 100,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  nextGrain: {
    flex: 5
  },
});