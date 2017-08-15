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
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from './components/home'
import Schedule from './components/schedule'
import Menu from './components/menu'
import Categories from './components/categories'
import TextFit from "react-native-textfit"

export default class grain extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedTab: 'home',
      notificationNumber: -1,
      grainCategory: 'surprise'
      
    }
    this._toggleScreen = this._toggleScreen.bind(this);
    this.toggleSchedule = this.toggleSchedule.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }
  
  onNotificationReceivedForeground(notification) {
    console.log("Notification Received - Foreground", notification);
    this.setState({
      notificationNumber: notification._data.grainNumber
    });
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
  }

  componentWillUnmount() {
      // Don't forget to remove the event listeners to prevent memory leaks! 
      PushNotificationIOS.removeEventListener('localNotification', this.onNotificationReceivedForeground.bind(this));
  }


  
  toggleSchedule = () => {
    console.log('main page, toggleSchedule')
    this.setState({
      selectedTab: 'schedule',
    })
  }

  _toggleScreen() {
      this.setState({
        selectedTab: 'categories',
      })
  }
  
  changeTab(category, grainCategory) {
  this.setState({
    selectedTab: category,
    grainCategory: grainCategory
  })
}

  render(): React$Element<any> {    
    function MainContent(props) {
      const selectedTab = props.selectedTab;
      if (selectedTab === 'home') {
        return <Home changeTab={props.changeTab} grainCategory={props.grainCategory} />;
      }
      else if (selectedTab === 'categories') {
        return <Categories changeTab={props.changeTab} />;
      }
      
      return <Schedule />;
    }
    
    return (
      <View style={styles.container}>
          <MainContent selectedTab={this.state.selectedTab} style={styles.content} changeTab={this.changeTab} grainCategory={this.state.grainCategory}/>
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
  content: {
    flex: 20,
    width: '100%'
  },
  menu: {
    flex: 4,
  },
});

AppRegistry.registerComponent('grain', () => grain);
