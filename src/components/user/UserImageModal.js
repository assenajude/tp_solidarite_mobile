import React from 'react';
import {View, Modal, Animated, TouchableOpacity, StyleSheet} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import colors from "../../utilities/colors";
import AppLabelLink from "../AppLabelLink";

function UserImageModal({imageModalVisible, dismissImageModal, takePhoto, chooseImage, deleteImage}) {
    return (
        <Modal animated animationType='slide'  transparent visible={imageModalVisible}>
            <View style={styles.overlay}>
                <Animated.View style={styles.modalContainer} >
                    <View style={{
                        alignSelf: 'flex-end'
                    }}>
                        <TouchableOpacity onPress={dismissImageModal}>
                            <AntDesign name="closecircle" size={40} color={colors.rougeBordeau} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: "center"
                    }}>
                        <AppLabelLink content='prendre une photo'  handleLink={takePhoto}/>
                        <AppLabelLink content='Choisir une image'  handleLink={chooseImage}/>
                        <AppLabelLink content='Supprimer la photo' handleLink={deleteImage}/>
                    </View>
                </Animated.View>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContainer: {
        backgroundColor: colors.blanc,
        paddingBottom: 20
    }
})

export default UserImageModal;