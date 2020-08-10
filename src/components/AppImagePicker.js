import React, {useState} from 'react';
import { View, Image, StyleSheet} from 'react-native'
import AppButton from "./AppButton";
import * as ImagePicker from 'expo-image-picker';
import AppText from "./AppText";

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
                <View style={styles.videImage}>
                    <AppText>Aucune image</AppText>
                    <AppButton title='choisir' onPress={chooseImage} />
                </View>
            </View>

        )
    }


    return (
        <View style={styles.imageContainer}>
            <View style={styles.secondImageContainer}>
                <AppText style={{fontWeight: 'bold', marginRight: 20}}>Image</AppText>
                <View >
                    {selectedImage && <Image style={styles.imageStyle} source={{uri: selectedImage}} />}
                    <AppButton title='Changer' onPress={chooseImage} />
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        width: 100,
        height: 100
    },
    imageContainer: {
        height: 100,
        width: 100,
        margin: 20,
        marginBottom: 40
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
    secondImageContainer: {
        flexDirection: 'row'
    }
})

export default AppImagePicker;