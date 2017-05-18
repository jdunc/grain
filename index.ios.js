/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  AlertIOS,
  PushNotificationIOS
} from 'react-native';
import RNShakeEventIOS from 'react-native-shake-event';
import NotificationsIOS from 'react-native-notifications';
// import Icon from 'react-native-vector-icons/FontAwesome';
let grains = require('./grains');

export default class grain extends Component {

  constructor (props) {
    super(props)
    this.state = {
      grains: grains,
      displayNumber: 0,
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
    
  changeGrain() {
    console.log('grain changed')

    this.setState({
      newNumber: Math.floor(Math.random() * this.state.grains.length),
    });
    // PushNotificationIOS.scheduleLocalNotification({
    //   fireDate: new Date(Date.now() + (1 * 1000)).getTime(),
    //   alertBody: 'in this moment, rediscover your presence: ' + this.state.grains[this.state.newNumber],
    //   alertTitle: "~ enter the flow ~",
    //   alertAction: "Click here to open",
    //   soundName: "chime.aiff",
    //   category: "actionItem",
    //   userInfo: { 
    //   'grainNumber': this.state.newNumber,
    //   },
    // })
  }
  
  componentWillMount() {
    PushNotificationIOS.addEventListener('localNotification', this.onNotificationReceivedForeground.bind(this));
     RNShakeEventIOS.addEventListener('shake', () => {      
       this.changeGrain();
     });
  }
  
  componentDidMount () {
    let firstGrain = Math.floor(Math.random() * this.state.grains.length)
    this.setState({
    newNumber: Math.floor(Math.random() * this.state.grains.length),
    }) 
    NotificationsIOS.requestPermissions();
    console.log('componentDidMount')
  }

  componentWillUnmount() {
      // Don't forget to remove the event listeners to prevent memory leaks! 
      PushNotificationIOS.removeEventListener('localNotification', this.onNotificationReceivedForeground.bind(this));
  }
  
  _sendLocalNotification() {
  require('RCTDeviceEventEmitter').emit('localNotificationReceived', {
    aps: {
      alert: 'Sample local notification',
      badge: '+1',
      sound: 'default',
      category: 'REACT_NATIVE'
    },
  });
}

_onLocalNotification(notification){
  console.log('local scheduled');
  AlertIOS.alert(
    'Try This!',
    this.state.grains[this.state.newNumber],
    [{
      text: 'Dismiss',
      onPress: null,
    }]
  );
}

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeBox}>
          <Text style={styles.welcome}>
            {this.state.grains[this.state.newNumber]}
          </Text>  
        </View>
          <Button 
            onPress={this.changeGrain}
            title="Next Grain"
            color="#841584"
            style={styles.nextGrain}
          />
          <View style={styles.menu}>
            {/* <Icon name="rocket" size={30} color="#900" /> */}

          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcomeBox: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  nextGrain: {
    flex: 2
  },
  menu: {
    flex: 1,
    width: '100%',
    backgroundColor: 'orange',
  }
});

AppRegistry.registerComponent('grain', () => grain);
