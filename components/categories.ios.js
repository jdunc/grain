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
import TextFit from "react-native-textfit";


export default class Categories extends Component {

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
        source={require('../img/background.png')} 
        style={styles.backgroundImage}
      >
        <View style={styles.allCategoriesHeadingView}>
          <Text style={styles.allCategoriesHeading}>
            which grains do you want to explore?
          </Text>
        </View>
        <View style={styles.allGrainCategories}>
          <View style={styles.categoriesContainerRow}>
            <View style={styles.grainCategory}>
              <Text style={styles.categoryHeading}>
                inner life
              </Text>
            </View>
            <View style={styles.grainCategory}>
              <Text style={styles.categoryHeading}>
                creativity
              </Text>
            </View>
          </View>
          <View style={styles.categoriesContainerRow}>
            <View style={styles.grainCategory}>
              <Text style={styles.categoryHeading}>
                home life
              </Text>
            </View>
            <View style={styles.grainCategory}>
              <Text style={styles.categoryHeading}>
                education
              </Text>
            </View>
          </View>
          <View style={styles.categoriesContainerRow}>
            <View style={styles.grainCategory}>
              <Text style={styles.categoryHeading}>
                relationships
              </Text>
            </View>
            <View style={styles.grainCategory}>
              <Text style={styles.categoryHeading}>
                physical health
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.surpriseGrainCategory}>
          <Text style={styles.surpriseCategoryHeading}>
            surprise me
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.surpriseCategoryHeading}>
          </Text>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  surpriseCategoryHeading:{
    fontSize: 20,
    textAlign: 'center',
  },
  surpriseGrainCategory: {
    borderRadius: 10,
    flex: 2,
    flexDirection: 'row',
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(123, 129, 137)',
    backgroundColor: 'rgba(255,255,255,0)',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '-10%',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  allCategoriesHeadingView:{
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '7.5%',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  allCategoriesHeading:{
    fontSize: 20,
    textAlign: 'center',
  },
  categoryHeading:{
    fontSize: 20,
    textAlign: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
    width: null,
    height: null,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  grainCategory: {
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(123, 129, 137)',
    backgroundColor: 'rgba(255,255,255,0)',
    padding: 2,
  },
  categoriesContainerRow: {
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row',
    height: '25%',
    width: '80%',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  allGrainCategories: {
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0)',
    flex: 10,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
    

  },
});