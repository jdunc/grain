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
} from 'react-native';
import RNShakeEventIOS from 'react-native-shake-event';
import NotificationsIOS from 'react-native-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './components/home'
import Schedule from './components/schedule'
import Menu from './components/menu'

export default class grain extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'home',
      notificationNumber: -1,
    }
  }
  onNotificationReceivedForeground(notification) {
    console.log("Notification Received - Foreground", notification);
    this.setState({
      notificationNumber: notification._data.grainNumber
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
    console.log('componentDidMount')
  }

  componentWillUnmount() {
      // Don't forget to remove the event listeners to prevent memory leaks! 
      PushNotificationIOS.removeEventListener('localNotification', this.onNotificationReceivedForeground.bind(this));
  }

  toggleHome = () => {
    this.setState({
      selectedTab: 'home',
    })
  }
  toggleSchedule = () => {
    console.log('main page, toggleSchedule')
    this.setState({
      selectedTab: 'schedule',
    })
  }

  render() {
    function MainContent(props) {
      const selectedTab = props.selectedTab;
      if (selectedTab === 'home') {
        return <Home />;
      }
      return <Schedule />;
    }
    return (
      <View style={styles.container}>
          <MainContent selectedTab={this.state.selectedTab} style={styles.content}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  content: {
    flex: 20,
    width: '100%'
  },
  menu: {
    flex: 4,
  },
});

AppRegistry.registerComponent('grain', () => grain);
