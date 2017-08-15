import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AlertIOS,
  PushNotificationIOS,
  TabBarIOS,
  Image,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
  Alert
} from 'react-native';
import Video from 'react-native-video';
import RNShakeEventIOS from 'react-native-shake-event';
import NotificationsIOS from 'react-native-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
import TextFit from "react-native-textfit";
let grains = require('../grains');
const styles = require('./style/categories.js');

export default class Categories extends Component {

  constructor (props) {
    
    super(props)

    let newNumber = Math.floor(Math.random() * grains.length);
      
    NotificationsIOS.addEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
    NotificationsIOS.addEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
    NotificationsIOS.addEventListener('notificationOpened', this.onNotificationOpened.bind(this));
    
    this.state = {
      selectedTab: this.props.selectedTab,
      notificationColor: 'white',
      underlay: "rgba(255,255,255,.5)",
      grains: grains,
      newNumber: newNumber,
    }
  }
    
    
onNotificationReceivedForeground(notification) {
     console.log("Notification Received - Foreground", notification);
     console.log("TOGGLE TOGGLE TOGGLE Notification Received - Foreground ", this.state.toggleNotificationsWord);
     this.setState({
       "notificationStatus": 'on',
       "toggleNotificationsWord": "Off",
     });

}

onNotificationReceivedBackground(notification) {
	console.log("Notification Received - Background", notification);
  this.setState({
    "notificationStatus": 'on',
    "toggleNotificationsWord": "Off",
  });
}

onNotificationOpened(notification) {
	console.log("Notification opened by device user", notification);
  this.setState({
    "notificationStatus": 'on',
    "toggleNotificationsWord": "Off",
  });
}

  componentWillMount() {
    
    
  }
  
  componentDidMount () {
    AsyncStorage.getItem("notificationStatus").then((value) => {
      console.log('componentDidMount, in async, notifications are currently: ', value)
      if (value === 'on') {
        this.setState({
          "notificationStatus": 'on',
          "toggleNotificationsWord": "Off",
        });
      } else{
        this.setState({
          "notificationStatus": 'off',
          "toggleNotificationsWord": "On",

        });
      }
   }).done(()=>{
     console.log('component mounted: ', this.state.notificationStatus);
   });
   
   
  }

  componentWillUnmount() {
    console.log('component will unmount');
    // Don't forget to remove the event listeners to prevent memory leaks!
      NotificationsIOS.removeEventListener('notificationReceivedForeground', this.onNotificationReceivedForeground.bind(this));
      NotificationsIOS.removeEventListener('notificationReceivedBackground', this.onNotificationReceivedBackground.bind(this));
      NotificationsIOS.removeEventListener('notificationOpened', this.onNotificationOpened.bind(this));
  }

_onPressCategoryeButton = (category) => {
  
  this.props.changeTab('home', category);
}

_toggleNotifications = () => {  
  
  if(this.state.notificationStatus === 'on'){
    
    this.setState({
      "notificationStatus": 'off',
      "toggleNotificationsWord": "On",
    }, ()=>{
      console.log('clicked off, notifications are', this.state.notificationStatus, 'and the word is, ', this.state.toggleNotificationsWord);
      AsyncStorage.setItem("notificationStatus", this.state.notificationStatus, (error) => {});
      AsyncStorage.setItem("toggleNotificationsWord", this.state.toggleNotificationsWord, (error) => {});
      AsyncStorage.getItem('notificationStatus', (err, result) => {
          console.log('clicked off, notifications are ', result);
      });
      
    });
    
    PushNotificationIOS.cancelAllLocalNotifications();  
    
  } else{
    this.setState({
      "notificationStatus": 'on',
      "toggleNotificationsWord": "Off",
    });
    let $this = this;
    PushNotificationIOS.checkPermissions( (permissions)=>{$this._turnOnNotifications(permissions)} );
    
  }
}

_turnOnNotifications(permissions){
  
  let areNotificationsEnabled = false;
  
  if(!permissions.alert && !permissions.badge ){
    Alert.alert('Notifications Disabled', 'Please enable notifications under settings->Notifications->Grain to receive daily updates from us :)')
    
  } else {
    
    areNotificationsEnabled = true;
    
  }
  
  if (areNotificationsEnabled){
    
    console.log('toggleNotWord', this.state.toggleNotificationsWord);
    this._scheduleNotifications();
  
  }
  
}

_scheduleNotifications(){
  console.log('inside schedule, toggleNotWord: ', this.state.toggleNotificationsWord);
  console.log('inside schedule, notStatus: ', this.state.notificationStatus);

  AsyncStorage.setItem("notificationStatus", this.state.notificationStatus, () => {});
  AsyncStorage.setItem("toggleNotificationsWord", this.state.toggleNotificationsWord, () => {});
  AsyncStorage.getItem('notificationStatus', (err, result) => {
      console.log('c will i ', result);
  });
  let rightNow = new Date();
  let scheduledTime = new Date();
  scheduledTime.setDate(rightNow.getDate()+1)
  console.log('scheduledTime, ', rightNow, scheduledTime);
  let startHour = 8;
  for(var i = 0; i < 10; i++){
    let hour = Math.floor(Math.random() * ((startHour + 3) - startHour + 1)) + startHour;
    let minute = Math.floor(Math.random() * (61) );
    let thisTime = scheduledTime.setHours(hour,minute,0,0);
    console.log('thisTime ',thisTime);
    PushNotificationIOS.scheduleLocalNotification({
      fireDate: thisTime,
      alertBody: this.state.grains[this.state.newNumber].text,
      alertTitle: "take a moment",
      alertAction: "Click here to open",
      soundName: "chime.aiff",
      category: this.state.grains[this.state.newNumber].category,
    });
    if (startHour <=13){
      startHour+=3;
    } else{
      scheduledTime.setDate(scheduledTime.getDate() + 1);
      startHour = 8;
    }
    this.changeGrain();
  }
  PushNotificationIOS.getScheduledLocalNotifications((scheduledNotifications)=>{
    console.log('scheduled: ', scheduledNotifications);
  })
}

changeGrain() {
  console.log('grain changed');
  console.log('length: ', this.state.grains.length)
  this.setState({
    newNumber: Math.floor(Math.random() * this.state.grains.length),
  });
  console.log(this.state.newNumber)
}

  render() {
    return (
      <Image 
        source={require('../img/background.png')} 
        style={styles.backgroundImage}
      >
      {/* // <Video source={{uri: "background", mainVer: 1, patchVer: 0}} // Looks for .mp4 file (background.mp4) in the given expansion version. 
      //  rate={1.0}                   // 0 is paused, 1 is normal. 
      //  volume={1.0}                 // 0 is muted, 1 is normal. 
      //  muted={false}                // Mutes the audio entirely. 
      //  paused={false}               // Pauses playback entirely. 
      //  resizeMode="cover"           // Fill the whole screen at aspect ratio. 
      //  repeat={true}                // Repeat forever. 
      //  onLoadStart={this.loadStart} // Callback when video starts to load 
      //  onLoad={this.setDuration}    // Callback when video loads 
      //  onProgress={this.setTime}    // Callback every ~250ms with currentTime 
      //  onEnd={this.onEnd}           // Callback when playback finishes 
      //  onError={this.videoError}    // Callback when video cannot be loaded 
      //  style={styles.backgroundVideo}
      //  > */}
       
        <View style={styles.header}>
        </View>
        <View style={styles.allCategoriesHeadingView}>
          <Text style={styles.allCategoriesHeading}>
            which grains do you want to explore?
          </Text>
        </View>
        <View style={styles.allGrainCategories}>
          <View style={styles.categoriesContainerRow}>
            <TouchableHighlight underlayColor={this.state.underlay} activeOpacity={1} style={styles.grainCategory} onPress={()=>{this._onPressCategoryeButton('inner')}}>
              <Text style={styles.categoryHeading}>
                inner life
              </Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={this.state.underlay} activeOpacity={1} style={styles.grainCategory} onPress={()=>{this._onPressCategoryeButton('creativity')}}>
              <Text style={styles.categoryHeading}>
                creativity
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.categoriesContainerRow}>
            <TouchableHighlight underlayColor={this.state.underlay} activeOpacity={1} style={styles.grainCategory} onPress={()=>{this._onPressCategoryeButton('home')}}>
              <Text style={styles.categoryHeading}>
                home life
              </Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={this.state.underlay} activeOpacity={1} style={styles.grainCategory} onPress={()=>{this._onPressCategoryeButton('education')}}>
              <Text style={styles.categoryHeading}>
                education
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.categoriesContainerRow}>
            <TouchableHighlight underlayColor={this.state.underlay} activeOpacity={1} style={styles.grainCategory} onPress={()=>{this._onPressCategoryeButton('relationships')}}> 
              <Text style={styles.categoryHeading}>
                relationships
              </Text>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={this.state.underlay} activeOpacity={1} style={styles.grainCategory} onPress={()=>{this._onPressCategoryeButton('physical')}}>
              <Text style={styles.categoryHeading}>
                physical health
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        <TouchableHighlight underlayColor={this.state.underlay} activeOpacity={1} style={styles.surpriseGrainCategory} onPress={()=>{this._onPressCategoryeButton('surprise')}}>
            <Text style={styles.surpriseCategoryHeading}>
              surprise me
            </Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor={this.state.underlay} activeOpacity={1} style={styles.notifications} onPress={()=>{this._toggleNotifications()}}>
            <Text style={styles.surpriseCategoryHeading}>
              Turn Notifications {this.state.toggleNotificationsWord}
            </Text>
        </TouchableHighlight>
        <View style={styles.footer}>
          <Text style={styles.surpriseCategoryHeading}>
          </Text>
        </View>
    {/* </Video> */}
      </Image>
    )
  }
}