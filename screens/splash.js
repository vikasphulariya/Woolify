import {View, Text, Image} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import Animated, {
  FadeIn,
  PinwheelIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';

const Splash = ({navigation}) => {
  setTimeout(() => {
    if (auth().currentUser !== null) {
      if (auth().currentUser.emailVerified) {
        // console.log('going to Home page');
        navigation.replace('DashBoard');
      }
    } else {
      navigation.replace('login');
    }
  }, 2000);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.Image
        entering={PinwheelIn.delay().duration(2000).springify().damping(7)}
        source={require('./img/splash.png')}
        style={{width: '50%', height: undefined, aspectRatio: 1}}
      />
      <Animated.Text
        entering={FadeInUp.delay(500).duration(1000).springify()}
        style={{color: '#000', fontWeight: '900', fontSize: 24}}>
        Woolify
      </Animated.Text>
    </View>
  );
};

export default Splash;
