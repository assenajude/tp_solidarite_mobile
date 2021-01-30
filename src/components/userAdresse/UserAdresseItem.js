import React from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import AppText from "../AppText";
import colors from "../../utilities/colors";
import AppLabelWithValue from "../AppLabelWithValue";
import { AntDesign } from '@expo/vector-icons';

function UserAdresseItem({adresseName, villeName, telephone, otherAdresse,
                             email, getAdresseEdit, getAdresseDelete}) {
    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <AppText style={{
                    color: colors.vert,
                    fontWeight: 'bold',
                    fontSize: 20,
                    marginRight: 5

                }}>Bienvenue</AppText>
                <AppText>à</AppText>
                <AppText style={{fontWeight: 'bold'}}>{villeName}</AppText>
            </View>
            <View>
                <AppText style={{
                    color: colors.or,
                    fontWeight: 'bold',
                    fontSize: 15
                }}>{adresseName}</AppText>
                <AppLabelWithValue label='Tel: ' labelValue={telephone}/>
                <AppLabelWithValue label='E-mail: ' labelValue={email}/>
                <AppLabelWithValue label='Adresses: ' labelValue={otherAdresse}/>
            </View>
            <View style={styles.editButton}>
                <TouchableOpacity onPress={getAdresseEdit}>
                    <AntDesign name="edit" size={20} color="black" />
                </TouchableOpacity>
                <View style={{marginTop: 10}}>
                <TouchableOpacity onPress={getAdresseDelete}>
                    <AntDesign name="delete" size={20} color={colors.rougeBordeau} />
                </TouchableOpacity>
                </View>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colors.blanc,
        margin:5,
        marginTop: 20,
        padding: 10
    },
    welcome: {
        backgroundColor: colors.blanc,
        height: 100,
        width: 130,
        borderWidth: 1
    },
    editButton: {
        position: 'absolute',
        top: 10,
        right: 10
    }
})

export default UserAdresseItem;