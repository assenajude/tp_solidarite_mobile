import React, {useState} from 'react';
import { View, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Entypo} from '@expo/vector-icons'
import AppButton from "./AppButton";
import * as ImagePicker from 'expo-image-picker';
import AppText from "./AppText";
import colors from "../utilities/colors";

function AppImagePicker({selectedImage,onChangeImage }) {

    const chooseImage = async() => {
        const result = await ImagePicker.requestCameraRollPermissionsAsync();
        if (!result.granted) {
            alert('Vous devez acceptez la permission pour choisir une image');
            return;
        }
        const pickImage = await ImagePicker.launchImageLibraryAsync();
        if (pickImage.cancelled) {
            return;
        }
        onChangeImage(pickImage.uri);
    }

    if(!selectedImage) {
        return (
            <View style={styles.videContainer}>
                <AppText style={{fontWeight: 'bold', marginRight: 20}}>Image:</AppText>

                    <TouchableOpacity onPress={chooseImage}>
                        <View style={styles.cameraStyle}>
                            <Entypo name='camera' size={40} color={colors.dark}/>
                        </View>
                    </TouchableOpacity>

                {/*<View style={styles.videImage}>
                    <AppText>Aucune image</AppText>
                    <AppButton title='choisir' onPress={chooseImage} />
                </View>*/}
            </View>

        )
    }


    return (
        <View>
            <View>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 30
                }}>
                <View style={{
                    flexDirection: 'row',
                }}>

                    {selectedImage && <Image style={styles.imageStyle} source={{uri: selectedImage}} />}
                    <TouchableOpacity style={{marginLeft: 30}} onPress={chooseImage}>
                        <View style={styles.cameraStyle}>
                            <Entypo name='camera' size={40} color={colors.dark}/>
                        </View>
                    </TouchableOpacity>
                </View>
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        width: 80,
        height: 80
    },
    imageContainer: {
       flexDirection: 'row',
        alignItems: 'center'
    },
    videImage: {
        justifyContent: 'space-between',
        height: 100,
        width: 100,
        borderWidth: 0.2
    },
    videContainer: {
        flexDirection: 'row',
        marginBottom: 40
    },

    cameraStyle: {
        borderWidth: 0.5,
        padding: 15,
        backgroundColor: colors.blanc
    }
})

export default AppImagePicker;