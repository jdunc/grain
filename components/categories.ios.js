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
} from 'react-native';
import RNShakeEventIOS from 'react-native-shake-event';
import NotificationsIOS from 'react-native-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Menu extends Component {

  constructor (props) {
    super(props)
    this.state = {
      selectedTab: this.props.selectedTab,
      notificationColor: 'white',
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
      <Image 
        source={require('../img/waterLeaf.png')} 
        style={styles.backgroundImage}
      >
        <View style={styles.wholePage}>
          <View style={[styles.categories, styles.innerLife]}>
            <Image 
              source={require('../img/innerLife.png')} 
              style={styles.categoryIcon}
            />
            <Text
              adjustsFontSizeToFit={true}
              style={styles.categoryLabel}
              >
                Inner Life
              </Text>
          </View>
          <View style={[styles.categories, styles.art]}>
            <Image 
              source={require('../img/art.png')} 
              style={styles.categoryIcon}
            />
            <Text
              adjustsFontSizeToFit={true}
              style={styles.categoryLabel}
              >
                Creativity
              </Text>
          </View>
          <View style={[styles.categories, styles.professional]}>
            <Image 
              source={require('../img/home.png')} 
              style={styles.categoryIcon}
            />
            <Text
              adjustsFontSizeToFit={true}
              style={styles.categoryLabel}
              >
                Home
              </Text>
          </View>
          <View style={[styles.categories, styles.intellectual]}>
            <Image 
              source={require('../img/idea.png')} 
              style={styles.categoryIcon}
            />
            <Text
              adjustsFontSizeToFit={true}
              style={styles.categoryLabel}
              >
                Education
              </Text>
          </View>
          <View style={[styles.categories, styles.social]}>
            <Image 
              source={require('../img/heart.png')} 
              style={styles.categoryIcon}
            />
            <Text
              adjustsFontSizeToFit={true}
              style={styles.categoryLabel}
              >
                Relationships
              </Text>
          </View>
          <View style={[styles.categories, styles.health]}>
            <Image 
              source={require('../img/health.png')} 
              style={styles.categoryIcon}
            />
            <Text
              adjustsFontSizeToFit={true}
              style={styles.categoryLabel}
              >
                Health
              </Text>
          </View>
          <View style={[styles.categories, styles.random]}>
            <Image 
              source={require('../img/random.png')} 
              style={styles.randomIcon}
            />
            <Text
              adjustsFontSizeToFit={true}
              style={styles.randomLabel}
              >
                Random!
              </Text>
          </View>
          <View style={[styles.settings]}>
            <Icon
              title="notifications"
              name="circle"
              size={20}
              style={styles.notificationIcon}
              color={this.state.notificationColor}
            /> 
            <Text
              adjustsFontSizeToFit={true}
              style={styles.settingsLabel}
              >
                Notifications
              </Text>
          </View>
          <View style={[styles.settings]}>
            <Icon
              title="heart"
              name="heart"
              size={20}
              style={styles.icon}
            /> 
            <Text
              adjustsFontSizeToFit={true}
              style={styles.settingsLabel}
              >
                Favorites
              </Text>
          </View>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  wholePage: {
    flex: 15,
    // backgroundColor: '#F5FCFF',
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categories: {
    width: '40%',
    height: '15%',
    // backgroundColor: 'blue',
    marginTop: '10%',
    marginLeft: '7.5%',
    borderRadius: 30,
    flexDirection: 'column',
    alignItems: 'center',
  },
  settings: {
    width: '35%',
    height: '10%',
    // backgroundColor: 'blue',
    marginTop: '7.5%',
    marginLeft: '11.5%',
    borderRadius: 30,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.75)'
  },
  innerLife: {
    backgroundColor: 'rgba(232,92,213,0.75)',
  },
  art: {
    backgroundColor: 'rgba(114,255,183,0.75)',
  },
  professional: {
    backgroundColor: 'rgba(232,229,103,0.75)',
  },
  intellectual: {
    backgroundColor: 'rgba(255,178,114,0.75)',
  },
  social: {
    backgroundColor: 'rgba(255,0,0,0.75)',
  },
  health: {
    backgroundColor: 'rgba(114,146,255,0.75)',
  },
  random: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '90%'
  },
  menu: {
    flex: 1,
    width: '100%',
    backgroundColor: 'yellow',
  },
  backgroundImage: {
    flex: 1,
    width: null,
    resizeMode: 'cover',
  },
  categoryIcon: {
    marginTop: '5%',
    width: 60,
    height: 60,
  },
  settingsIcon: {
    marginTop: '5%',
    width: 30,
    height: 30,
  },
  categoryLabel: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '2.5%',
    height: '30%',
    width: '100%',
    color: 'white',
    // backgroundColor: 'blue',
  },
  settingsLabel: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: '5%',
    height: '30%',
    width: '100%',
    color: 'black',
    // backgroundColor: 'blue',
  },
  randomIcon: {
    marginTop: '2.5%',
    width: 60,
    height: 60,
  },
  randomLabel: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: '0%',
    height: '30%',
    width: '100%',
    color: 'white',
    // backgroundColor: 'blue',
  },
  categoriesLabel: {
    fontSize: 100,
    textAlign: 'center',
    marginTop: 30,
    marginLeft: '5%',
    height: '10%',
    width: '90%',
    color: 'white',
    // backgroundColor: 'blue',
  },
  notificationIcon: {
    marginTop: '7.5%',
    backgroundColor: 'rgba(0,0,0,0)',
    width: 30,
  },
  icon: {
    marginTop: '7.5%',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    width: 30,
    
  },
});