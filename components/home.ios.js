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
  Dimensions
} from 'react-native';
import RNShakeEventIOS from 'react-native-shake-event';
import NotificationsIOS from 'react-native-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
let grains = require('../grains');
import TextFit from "react-native-textfit"
var {windowHeight, windowWidth} = Dimensions.get('window');

export default class Home extends Component {

  constructor (props) {
    super(props)
    this.state = {
      grains: grains,
      welcomeBoxheight: 100,
      welcomeBoxwidth: 100,
      newNumber: 0,
    }
    this.changeGrain = this.changeGrain.bind(this);
  }
  onNotificationReceivedForeground(notification) {
    console.log("Notification Received - Foreground", notification);
    this.setState({
      newNumber: notification._data.grainNumber
    });
    // AlertIOS.alert(
    //   'Try This!',
    //   this.state.grains[notification.grainNumber],
    //   [{
    //     text: 'Dismiss',
    //     onPress: null,
    //   }]
    // );
  }
   
  onNotificationReceivedBackground(notification) {
      console.log("Notification Received - Background", notification);
  }
   
  onNotificationOpened(notification) {
      console.log("Notification opened by device user", notification);
  }
  
  componentWillMount() {
    PushNotificationIOS.addEventListener('localNotification', this.onNotificationReceivedForeground.bind(this));

  }
  
  componentDidMount () {
    NotificationsIOS.requestPermissions();
    RNShakeEventIOS.addEventListener('shake', () => {
      this.changeGrain();      
    });
    AsyncStorage.getItem("lastGrainNumber").then((value) => {
      console.log('asyncvalue:' + value);
        this.setState({
          lastGrainNumber: parseInt(value),
          newNumber: parseInt(value),
        });
    }).done();
    console.log('this.state.newNumber')
    console.log('componentDidMount')
  }

  componentWillUnmount() {
      // Don't forget to remove the event listeners to prevent memory leaks! 
      PushNotificationIOS.removeEventListener('localNotification', this.onNotificationReceivedForeground.bind(this));
      AsyncStorage.setItem("lastGrainNumber", JSON.stringify(this.state.newNumber));
  }
  
  changeGrain() {
    console.log('grain changed');
    this.setState({
      newNumber: Math.floor(Math.random() * this.state.grains.length),
    });
    console.log(this.state.newNumber)
  }

  render() {
    return (
      <Image 
        source={require('../img/sunset.png')} 
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
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
                {this.state.grains[this.state.newNumber]}
            </Text>
          </View>
            <Button 
              onPress={this.changeGrain}
              title="Next Grain"
              color="#841584"
              style={styles.nextGrain}
            />
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0)',

  },
  welcomeBox: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    resizeMode: 'cover',
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
    color: 'white',
    // backgroundColor: 'blue',
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