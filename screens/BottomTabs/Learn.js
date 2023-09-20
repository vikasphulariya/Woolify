import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import YoutubeIframePlayer from 'react-native-youtube-iframe-player';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Header from '../common/Header';
// import YoutubeIframePlayer from 'react-native-youtube-iframe-player';
import YtTile from '../common/YtTile';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  BounceInUp,
  BounceInDown,
  FadeInRight,
} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
const Learn = () => {
  const focused = useIsFocused();
  const [YtData, setYtData] = useState([]);
  useEffect(() => {
    console.log('Use effect');
    const unsubscribe = firestore()
      .collection('Learn')
      .onSnapshot(onResult, onError);
    return () => unsubscribe();
    // getItem();
  }, []);
  function onResult(querySnapshot) {
    console.log('Got Users collection result.');
    // saveToDevice(querySnapshot);
    getItem(querySnapshot);
  }

  function onError(error) {
    console.error('ss', error);
  }

  const getItem = async querySnapshot => {
    let temp = [];
    querySnapshot.forEach(documentSnapshot => {
      temp.push({
        id: documentSnapshot.id,
        data: documentSnapshot.data(),
      });
    });
    // console.log('temp', temp);
    setYtData(temp);
  };
  return (
    <View style={{marginBottom: 60}} className="px-3">
      <Header />
      {/* <Text>Learn</Text> */}
      {focused ? (
        <FlatList
          data={YtData}
          renderItem={({item, index}) => {
            console.log(item.data);
            return (
              <Animated.View
                entering={FadeInRight.delay(index * 200).duration(800)}>
                <YtTile details={item.data} />
              </Animated.View>
            );
          }}
        />
      ) : null}
     
      {/* <YtTile /> */}
    </View>
  );
};

export default Learn;
