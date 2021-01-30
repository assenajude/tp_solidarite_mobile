import React, {useEffect} from 'react';
import {View, TouchableOpacity, ScrollView, StyleSheet, Animated, Image} from "react-native";
import {Modal} from "react-native";
import { Entypo, AntDesign} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'

import AppButton from "../AppButton";
import colors from "../../utilities/colors";
import AppText from "../AppText";
import AppLabelLink from "../AppLabelLink";
import {useSelector} from "react-redux";


function ProfileImagePicker({showPickerModal,onChangeImage,onChangePhoto,changeProfileAvatar,
                                dismissPickerModal, getPickerModalShown, imageUrl,deleteAvatar
}) {

    const user = useSelector(state => state.auth.user)

    const chooseImage = async() => {
        try {
        const result = await ImagePicker.requestCameraRollPermissionsAsync()
        if(!result.granted) {
            alert("Vous devez accepter pour choisir l'image.")
            return ;
        }
        const selectedImage = await ImagePicker.launchImageLibraryAsync()

        if(selectedImage.cancelled) {
            return ;
        }
        onChangeImage(selectedImage.uri)

        } catch (e) {
           console.log(e)
        }

    }

    const takePhoto = async () => {
        try {
        const result  = await ImagePicker.requestCameraRollPermissionsAsync()
        if(!result.granted) {
            alert('Vous devez accepter pour prendre la photo')
            return ;
        }
        const photo = await ImagePicker.launchCameraAsync()
        if(photo.cancelled) {
            return;
        }
        onChangePhoto(photo.uri)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <ScrollView>
            <View style={{
                flexDirection: 'row'
            }}>
                {imageUrl && <Image source={imageUrl} style={{height: 60, width: 60, margin: 20}}/>}
            <TouchableOpacity onPress={getPickerModalShown}>
                <View style={{
                    width: 60,
                    height: 60,
                    margin: 20,
                    backgroundColor: colors.blanc,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Entypo name="camera" size={40} color="black" />
                </View>
            </TouchableOpacity>
            </View>
                <AppButton title='valider la photo' style={{width: '40%', margin: 20}} onPress={changeProfileAvatar}/>
                <View style={{borderTopWidth: 1, width: '100%'}}>
                    <View style={{alignSelf: 'center', backgroundColor: colors.rougeBordeau}}>
                        <AppText style={{color: colors.blanc}}>Vos infos</AppText>
                    </View>

                </View>
            </ScrollView>
            <Modal animated animationType='slide' transparent visible={showPickerModal}>
                <View style={styles.overlay}>
                    <Animated.View style={[styles.contentContainer]}>
                    <View style={{
                        alignSelf: 'flex-end'
                    }}>
                        <TouchableOpacity onPress={dismissPickerModal}>
                        <AntDesign name="closecircle" size={40} color={colors.rougeBordeau} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: "center"
                    }}>
                        <AppLabelLink content='prendre une photo'  handleLink={takePhoto}/>
                        <AppLabelLink content='Choisir une image'  handleLink={chooseImage}/>
                        <AppLabelLink content='Supprimer la photo' handleLink={deleteAvatar}/>
                    </View>
                    </Animated.View>
                </View>

            </Modal>
        </>
    );
}


const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    contentContainer: {
        backgroundColor: colors.blanc,
        paddingTop: 12,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12
    }
})

export default ProfileImagePicker;