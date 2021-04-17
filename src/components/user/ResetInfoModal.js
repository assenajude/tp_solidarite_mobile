import React from 'react';
import {View, Modal, TextInput, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import AppButton from "../AppButton";
import colors from "../../utilities/colors";
import AppText from "../AppText";
import {AntDesign} from "@expo/vector-icons";

function ResetInfoModal({resetModalVisible, resetValue,onChangeResetValue, sendResetMail, isKeyboadShown, closeResetModal}) {
    return (
        <Modal visible={resetModalVisible} transparent>
            <View style={{
                backgroundColor: colors.dark,
                opacity: 0.4,
                width: '100%',
                height: '87%',
                top: 50
            }}>
            </View>
            <View style={{
                backgroundColor: colors.blanc,
                position: 'absolute',
                width: '100%',
                height:isKeyboadShown?'70%' : '45%',
                top:isKeyboadShown?'15%':'30%',
                paddingTop:isKeyboadShown? 0:20,
                alignItems: "center"
            }}>
                <View style={{alignSelf: 'flex-end', marginRight: 10}}>
                    <TouchableWithoutFeedback onPress={closeResetModal}>
                        <AntDesign name="close" size={20} color={colors.rougeBordeau} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 10, marginBottom: 10, marginLeft: 10}}>
                    <AntDesign name="infocirlceo" size={20} color={colors.bleuFbi} />
                    <AppText style={{color: colors.bleuFbi, marginLeft: 10}}>Veuillez entrer l'adresse email qui a servi à la creation de votre compte</AppText>
                </View>
                <TextInput keyboardType="email-address" style={{borderWidth: 1,width: '80%', paddingLeft: 5, borderRadius: 10, paddingTop: 5,paddingBottom: 5}} value={resetValue} onChangeText={onChangeResetValue}/>
                <TouchableOpacity onPress={sendResetMail}>
                    <AppText style={{color: colors.bleuFbi, marginTop: 10}}>Renvoyer le code</AppText>
                </TouchableOpacity>
                <AppButton style={{width: '50%', padding: 10, marginTop: 20}} title='envoyer' onPress={sendResetMail}/>
            </View>
        </Modal>
    );
}

export default ResetInfoModal;