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
  TouchableHighlight,
  ActionSheetIOS
} from 'react-native';
import RNShakeEventIOS from 'react-native-shake-event';
import NotificationsIOS from 'react-native-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
let grains = require('../grains');
var {windowHeight, windowWidth} = Dimensions.get('window');


export default class Home extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      grains: grains,
      welcomeBoxheight: 100,
      welcomeBoxwidth: 100,
      notificationColor: 'white',
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
      if (parseInt(value) >= 0) {
        console.log('asyncvalue:' + value);
        this.setState({
          lastGrainNumber: parseInt(value),
          newNumber: parseInt(value),
        });
      } else{
        this.changeGrain();
      }
    }).done();
    AsyncStorage.getItem("notifications").then((value) => {
      if (value === true || value === false) {
        this.setState({
          notifications: value,
        });
      }
      else {
        this.setState({
          notifications: false,
        });
      }
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
  
  shareScreen() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      message: 'I just used the grain app to ' + this.state.grains[this.state.newNumber],
      subject: '~ reconnecting with the flow ~'
    }, () => {}, () => {})
  }
  
  toggleNotifications() {
    // this.setState({
    //   notifications: !this.state.notifications,
    // });
    // AsyncStorage.setItem("notifications", this.state.notifications);
    if (this.state.notificationColor === 'white') {
      this.setState({
        notificationColor: 'red',
      });
    }
    else {
      this.setState({
        notificationColor: 'white',
      });
    }
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
              <View style={styles.bottomMenu}>
                {/* <Button 
                  onPress={this.changeGrain}
                  title="Next Grain"
                  color="#841584"
                  style={styles.nextGrain}
                /> */}
                <TouchableHighlight
                  onPress={() => {this.toggleNotifications()}}
                  >
                    <Icon
                      title="notifications"
                      name="circle"
                      size={20}
                      style={styles.notificationIcon}
                      color={this.state.notificationColor}
                    /> 
                  </TouchableHighlight>
                  <Icon
                    title="heart"
                    name="heart"
                    size={20}
                    style={styles.icon}
                  /> 
                  <TouchableHighlight
                    onPress={() => {this.shareScreen()}}
                    >
                      <Icon
                        title="share"
                        name="share"
                        size={20}
                        style={styles.icon}
                      /> 
                    </TouchableHighlight>
                  </View>
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
          bottomMenu: {
            flex: 1,
            flexDirection: 'row', 
            justifyContent: 'space-between',
            width: '100%',
            paddingLeft: 10,
            paddingRight: 10,
          },
          nextGrain: {
            width: 50,
          },
          icon: {
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'white',
            width: 30,
            
          },
          notificationIcon: {
            backgroundColor: 'rgba(0,0,0,0)',
            width: 30,
          },
        });