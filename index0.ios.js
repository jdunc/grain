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
  Button
} from 'react-native';
import RNShakeEventIOS from 'react-native-shake-event';
import NotificationsIOS from 'react-native-notifications';

export default class grain extends Component {

  constructor (props) {
    super(props)
    NotificationsIOS.addEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.addEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    NotificationsIOS.addEventListener('notificationOpened', this.onNotificationOpened.bind(this));
    this.state = {
      grains: [
'brush your teeth with the opposite hand ','lay down on the ground and say "I got this" really loudly','only make left turns for 30 minutes','Pay for a strangers coffee','shake hands with somone for 3 seconds too long','Dont shake hands for a day',' bow appropriately (video link)','Send a message to somone who you havent spoken to in over a year','Do the hokey pokey (video)','Lip sync for 30 seconds to a song your vibing with right now','Laugh for no reason for 15 seconds','Go for a morning walk in silence','Have a cold shower','Spend a few minutes looking at your own eyes in the mirror','Think only good throughts before going to bed','Write down nagging thoughts and throw them away','Ask people what your strenghs and weaknesses are','Stop waiting around for the right time','Take a photo a day on your way to work for a month',
      ],
      displayNumber: 0,
    }
    this.changeGrain = this.changeGrain.bind(this);
  }
  onNotificationReceivedForeground(notification) {
    console.log("Notification Received - Foreground", notification);
  }
   
  onNotificationReceivedBackground(notification) {
      console.log("Notification Received - Background", notification);
  }
   
  onNotificationOpened(notification) {
      console.log("Notification opened by device user", notification);
  }
  changeGrain() {
    this.setState({
      newNumber: Math.floor(Math.random() * this.state.grains.length),
    });
    NotificationsIOS.localNotification({
      alertBody: "Local notificiation!",
      alertTitle: "Local Notification Title",
      alertAction: "Click here to open",
      soundName: "chime.aiff",
      category: "SOME_CATEGORY",
      userInfo: { }
    });
  }
  
  componentWillMount() {
   RNShakeEventIOS.addEventListener('shake', () => {      
     this.changeGrain();
   });
  }
  
  componentDidMount () {
    let firstGrain = Math.floor(Math.random() * this.state.grains.length)
    this.setState({
    newNumber: Math.floor(Math.random() * this.state.grains.length),
    }) 
  }

  componentWillUnmount() {
      // Don't forget to remove the event listeners to prevent memory leaks! 
      NotificationsIOS.removeEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
      NotificationsIOS.removeEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
      NotificationsIOS.removeEventListener('notificationOpened', this.onNotificationOpened.bind(this));
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
    flex: 1,
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
  }
});

AppRegistry.registerComponent('grain', () => grain);
