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
import CheckBox from 'react-native-checkbox';
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
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      
      
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
  console.log('date1' + this.state.date)
};

  onDateChange2 = (date2) => {
  this.setState({date2: date2});
  console.log(Date.parse(this.state.date2))
  console.log('difference: ' + (Date.parse(this.state.date2) - Date.parse(this.state.date)))
  console.log(this.state.numberOfNotifications);
  console.log('random time every ' + ((Date.parse(this.state.date2) - Date.parse(this.state.date))/this.state.numberOfNotifications))

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
                   onDateChange={this.onDateChange}
                   minuteInterval={10}
                 />
          <Text style={styles.welcome}>
          and
          </Text>  
          <DatePickerIOS
                   date={this.state.date2}
                   mode="time"
                   onDateChange={this.onDateChange2}
                   minuteInterval={10}
                 />
          <Text style={styles.welcome}>
          on
          </Text>
          <View style={styles.checkboxes}>
            <CheckBox
              containerStyle={styles.checkboxItem}
              label='Wednesday'
              checked={this.state.wednesday}
              onChange={() => {
                this.setState({
                  wednesday: !this.state.wednesday,
                })
              }}
            /> 
            <CheckBox
              containerStyle={styles.checkboxItem}
              label='Thursday'
              checked={this.state.thursday}
              onChange={() => {
                this.setState({
                  thursday: !this.state.thursday,
                })
              }}
            /> 
            <CheckBox
              containerStyle={styles.checkboxItem}
              label='Friday'
              checked={this.state.friday}
              onChange={() => {
                this.setState({
                  friday: !this.state.friday,
                })
              }}
            /> 
            <CheckBox
              containerStyle={styles.checkboxItem}
              label='Saturday'
              checked={this.state.saturday}
              onChange={() => {
                this.setState({
                  saturday: !this.state.saturday,
                })
              }}
            /> 
            <CheckBox
              containerStyle={styles.checkboxItem}
              label='Sunday'
              checked={this.state.sunday}
              onChange={() => {
                this.setState({
                  sunday: !this.state.sunday,
                })
              }}
            /> 
            <CheckBox
              containerStyle={styles.checkboxItem}
              label='Monday'
              checked={this.state.monday}
              onChange={() => {
                this.setState({
                  monday: !this.state.monday,
                })
              }}
            /> 
            <CheckBox
              containerStyle={styles.checkboxItem}
              label='Tuesday'
              checked={this.state.tuesday}
              onChange={() => {
                this.setState({
                  tuesday: !this.state.tuesday,
                })
              }}
            /> 
          </View>
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
    // backgroundColor: 'green',
    width: '100%',
    paddingTop: 50,
    paddingBottom: 50,
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
  },
  checkboxes: {
    paddingLeft: '33%',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  checkboxItem: {
    marginBottom: 15,
  }
});