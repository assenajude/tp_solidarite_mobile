import React from 'react';
import {TouchableOpacity, View} from "react-native";
import AppText from "../AppText";
import { MaterialIcons } from '@expo/vector-icons';
import colors from "../../utilities/colors";
import AppButton from "../AppButton";
import useAuth from "../../hooks/useAuth";

function FaqListItem({itemLabel, showResponse, response, showQuestionResponse, editQuestion,addResponse}) {
    const {userRoleAdmin} = useAuth()
    return (
        <View style={{
            backgroundColor: colors.blanc,
            padding: 10,
            marginTop: 20
        }}>
        <TouchableOpacity onPress={showQuestionResponse}>
            <View style={{flexDirection: 'row', padding: 10}}>
                <AppText style={{fontWeight: 'bold'}}>{itemLabel}</AppText>
                {!showResponse && <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />}
                {showResponse && <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />}
            </View>
            {showResponse && <View style={{
                paddingRight: 10,
                paddingLeft: 10
            }}>
                {response.length === 0 && <AppText>Aucune response trouvée.</AppText>}
                {response.map((item, index) => <AppText key={index.toString()}>{item.content}</AppText>)}
                {userRoleAdmin() && <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }}>
                    <AppButton title='editer la question' onPress={editQuestion}/>
                    <AppButton title='ajouter une reponse' onPress={addResponse}/>
                </View>}
            </View>}
        </TouchableOpacity>
        </View>
    );
}

export default FaqListItem;