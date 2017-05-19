import React, { Component } from 'react';
import {
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


export default class Menu extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedTab: this.props.selectedTab
    }
  }
    
  componentWillMount() {
  }
  
  componentDidMount () {
  }

  componentWillUnmount() {
  }
  
  _onPressHomeButton = () => {

  this.props.toggleHomeProp()

}
_onPressScheduleButton = () => {
  
  console.log('menu page, toggleSchedule')
  this.props.toggleScheduleProp()

}

  render() {
    return (
      <TabBarIOS 
        style={styles.menu}
        tintColor="darkslateblue"
        >
        <Icon.TabBarItemIOS
          title="Home"
          iconName="home"
          iconSize={20}
          style={styles.icon}
          selected={this.state.selectedTab === 'home'}
          onPress={() => {
            if(this.state.selectedTab !== 'home'){
              this._onPressHomeButton();
              this.setState({
                selectedTab: 'home',
              });
            }
          }}>
          <View />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Notifications"
          iconName="calendar"
          iconSize={20}
          style={styles.icon}
          selected={this.state.selectedTab === 'schedule'}
          onPress={() => {
            if(this.state.selectedTab !== 'schedule'){
              this._onPressScheduleButton();
              this.setState({
                selectedTab: 'schedule',
              });
            }
          }}>
          <View />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Achievements"
          iconName="star"
          iconSize={20}
          style={styles.icon}
          selected={this.state.selectedTab === 'star'}
          onPress={() => {
            this.setState({
              selectedTab: 'star',
            });
          }}>
          <View />
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Feedback"
          iconName="comments"
          iconSize={20}
          style={styles.icon}
          selected={this.state.selectedTab === 'comments'}
          onPress={() => {
            this.setState({
              selectedTab: 'comments',
            });
          }}>
          <View />
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: '100%',
    backgroundColor: 'gray',
  },
});