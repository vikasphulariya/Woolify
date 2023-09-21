import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import YoutubeIframePlayer from 'react-native-youtube-iframe-player';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import YoutubePlayer from 'react-native-youtube-iframe';
const YtTile = ({details}) => {
  return (
    <View className="rounded-2xl mb-5">
      {/* <YoutubeIframePlayer
        videoUrl={details.Yturl}
        height={200}
        width="100%"
        locale="en"
        durationFontSize={15}
        containerStyle={{borderRadius: 10}}
        
        // style={{bordert}}
      /> */}
      <YoutubePlayer height={200} play={false} videoId={details.Yturl} />
      {/* <Text className="text-black self-center mt-3 text-lg text-center font-bold">
          How can traditional sheep wool rearing protect
        </Text> */}
      <Text className="text-black mt-3 text-base text-justify px-1">
        {details.Info}
      </Text>
    </View>
  );
};

export default YtTile;
