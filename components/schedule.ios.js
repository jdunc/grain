import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  PushNotificationIOS,
  PickerIOS,
  DatePickerIOS
} from 'react-native';
import RNShakeEventIOS from 'react-native-shake-event';
import NotificationsIOS from 'react-native-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
let grains = require('../grains');
const notificationOptions = ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
var PickerItemIOS = PickerIOS.Item;

export default class Schedule extends Component {

  constructor (props) {
    super(props)
    this.state = {
      numberOfNotifications: '0',
      grains: grains,
      date: new Date(),
      date2: new Date(),
      
    }
  }
  onNotificationReceivedForeground(notification) {
    console.log("Notification Received - Foreground", notification);
    this.setState({
      newNumber: notification._data.grainNumber
    });
  }
   
  onNotificationReceivedBackground(notification) {
  }
   
  onNotificationOpened(notification) {
  }
  
  componentWillMount() {
  }
  
  componentDidMount () {
  }

  componentWillUnmount() {
  }
  
  onDateChange = (date) => {
  this.setState({date: date});
};

  onDateChange2 = (date2) => {
  this.setState({date2: date2});
};
  

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollview}>
          <Text style={styles.welcome}>I want to receive:</Text>
          <PickerIOS
            itemStyle={styles.picker}
            selectedValue={this.state.numberOfNotifications}
            onValueChange={(number) => this.setState({numberOfNotifications: number})}>
            {notificationOptions.map((number) => (
              <PickerItemIOS
                key= {number}
                value= {number}
                label= {number}
              />
            ))}
          </PickerIOS>
          {/* <PickerIOS
            selectedValue={this.state.numberOfNotifications}
            onValueChange={(carMake) => this.setState({carMake, modelIndex: 0})}>
            {notificationOptions.map((number) => (
              <PickerItemIOS
                key={number}
                value={number}
                label={number}
              />
            ))}
          </PickerIOS> */}
          <Text style={styles.welcome}>
          notifications between
          </Text>  
          <DatePickerIOS
                   date={this.state.date}
                   mode="time"
                   timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                   onDateChange={this.onDateChange}
                   minuteInterval={10}
                 />
          <Text style={styles.welcome}>
          and
          </Text>  
          <DatePickerIOS
                   date={this.state.date2}
                   mode="time"
                   timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                   onDateChange={this.onDateChange2}
                   minuteInterval={10}
                 />
          <Text style={styles.welcome}>
          on
          </Text>  
          <Text style={styles.welcome}>
          Thursday
          </Text>  
          <Text style={styles.welcome}>
          Friday
          </Text>  
          <Text style={styles.welcome}>
          Saturday
          </Text>  
          <Text style={styles.welcome}>
          Sunday
          </Text>  
          <Text style={styles.welcome}>
          Monday
          </Text>  
          <Text style={styles.welcome}>
          Tuesday
          </Text>  
          <Text style={styles.welcome}>
          Wednesday
          </Text>  
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    width: '100%',
    paddingTop: 50,
  },
  welcomeBox: {
    flex: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  picker: {
    fontSize: 15,
  },
  scrollview: {
    width: '100%',
  }
});