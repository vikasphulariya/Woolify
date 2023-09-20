import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../common/Header';
import BuyTile from '../common/BuyTile';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  BounceInUp,
  BounceInDown,
  FadeInRight,
} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';

const Buy = () => {
  const focused = useIsFocused();
  const [sellAds, setSellAds] = useState([]);
  useEffect(() => {
    console.log('Use effect');
    const unsubscribe = firestore()
      .collection('Posts')
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
      if (
        documentSnapshot.data().email !== auth().currentUser.email &&
        documentSnapshot.data().Status === 'Active'
      )
        temp.push({
          id: documentSnapshot.id,
          data: documentSnapshot.data(),
        });
    });
    console.log('temp', temp);
    setSellAds(temp);
  };
  return (
    <View style={{marginBottom: 60}}>
      <Header />
      {/* <Text>Buy</Text> */}
      {focused ? (
        <FlatList
          data={sellAds}
          renderItem={({item, index}) => {
            // console.log(item);s
            return (
              <Animated.View
                entering={FadeInRight.delay(index * 50).duration(200)}>
                <BuyTile propsData={item} />
                {/* <Text className="text-black">{index + 1}</Text> */}
              </Animated.View>
            );
          }}
        />
      ) : null}
      {/* <BuyTile /> */}
    </View>
  );
};

export default Buy;
