import React from 'react';
import {View} from "react-native";
import AppText from "../AppText";
import LottieView from "lottie-react-native";

function ContratWatch({autoPlay,loop}) {
    return (
        <View style={{
            justifyContent: 'flex-start'
        }}>
            <LottieView style={{ width: 150}} autoPlay={autoPlay} loop={loop} source={require('../../assets/animations/data_watch')}/>
        </View>
    );
}

export default ContratWatch;