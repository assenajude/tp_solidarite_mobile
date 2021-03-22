import React from 'react';
import {Modal, View} from 'react-native'
import * as Progress from 'react-native-progress'
import colors from "../utilities/colors";
import LottieView from "lottie-react-native";
import AppButton from "./AppButton";

function AppUploadProgress({startProgress, progress=0, dismissUploadModal}) {
    return (
        <Modal visible={startProgress} transparent>
            <View  style={{
                backgroundColor: colors.blanc,
                width: '100%',
                height: '80%',
                alignItems: 'center',
                marginTop: 60
            }}>
            <View style={{alignSelf: 'flex-end'}}>
                <AppButton title='fermer' style={{margin: 20}} onPress={dismissUploadModal}/>
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <LottieView style={{ width: 300}} autoPlay={true} loop={true} source={require('../assets/animations/loading')}/>
                <Progress.Bar progress={progress} color={colors.rougeBordeau}/>
            </View>
            </View>
        </Modal>
    );
}

export default AppUploadProgress;