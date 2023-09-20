import {View, Text, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../common/Header';
import firestore from '@react-native-firebase/firestore';
import PriceTile from '../common/PriceTile';
import {useIsFocused} from '@react-navigation/native';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeInUp,
    BounceInUp,
    BounceInDown,
    FadeInRight,
  } from 'react-native-reanimated';
const Price = () => {
  const focused = useIsFocused();
  const [wareData, setWareData] = useState([]);
  useEffect(() => {
    console.log('Use effect');
    const unsubscribe = firestore()
      .collection('WareHouse')
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
    setWareData(temp);
  };
  return (
    <View>
      <Header />
      <Text className="text-black self-center text-2xl font-bold">
        State Wise Wool Price's
      </Text>
      {focused ? (
        <FlatList
          data={wareData}
          renderItem={({item, index}) => {
            return (
                <Animated.View
                entering={FadeInRight.delay(index * 50).duration(200)}>
                <PriceTile data={item} />
              </Animated.View>
            );
          }}
        />
      ) : null}
      {/* <PriceTile /> */}
    </View>
  );
};

export default Price;
