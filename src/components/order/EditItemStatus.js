import React from 'react';
import {useStore} from "react-redux";
import {TextInput, TouchableOpacity, View} from "react-native";
import AppText from "../AppText";
import {getRoleAdmin} from "../../store/selectors/authSelector";
import {AntDesign} from "@expo/vector-icons";
import colors from "../../utilities/colors";

function EditItemStatus({labelStatus, editStatus, statusValue,
                            saveEditing,undoEditing,statusValueStyle,
                            editingStatusValue,changeEditingStatusValue, getStatusEditing}) {
    const store = useStore()
    return (
        <View style={{
            flexDirection: 'row',
            width: '65%',
            marginTop: 10,
            justifyContent: 'space-between'
        }}>
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <AppText style={{fontWeight: 'bold', fontSize:15}}>{labelStatus}:</AppText>

                    {statusValue && !editStatus && <AppText style={statusValueStyle}>{statusValue}</AppText>}
                </View>
                {editStatus && <TextInput style={{height: 40,borderRadius: 10, width: 120, borderWidth: 0.5, borderColor:'grey'}} value={editingStatusValue} onChangeText={changeEditingStatusValue}/>}
            </View>
            <TouchableOpacity onPress={getStatusEditing}>

                {getRoleAdmin(store.getState()) && !editStatus && <View>
                    <AntDesign name='edit' size={24} color='green'/>
                </View>}
            </TouchableOpacity>
            {editStatus && <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={saveEditing}>
                    <View style={{marginRight: 10, marginLeft: 10}}>
                        <AntDesign name='check' size={24} color='green'/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={undoEditing}>
                    <View style={{marginLeft: 10}}>
                        <AntDesign name='close' size={24} color={colors.rougeBordeau}/>
                    </View>
                </TouchableOpacity>
            </View>}
        </View>
    );
}

export default EditItemStatus;