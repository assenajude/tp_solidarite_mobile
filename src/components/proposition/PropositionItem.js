import React from 'react';
import {TouchableOpacity, Image, StyleSheet, View} from "react-native";
import colors from "../../utilities/colors";
import AppText from "../AppText";
import AppButton from "../AppButton";
import AppLabelWithValue from "../AppLabelWithValue";
import useAuth from "../../hooks/useAuth";

function PropositionItem({isPropositionImage, propositionImage,label,
                             descriptionOptions, propositionNotReady, editProposition, getPropositionOrder}) {
    const {userRoleAdmin} = useAuth()
    return (
        <TouchableOpacity>
            <View style={styles.container}>
                {isPropositionImage && <>
                    <Image  source={propositionImage} style={styles.imageStyle}/>
                    <AppText style={{fontWeight: 'bold', fontSize: 15, margin: 10}}>{label}</AppText>
                </>}
                  {!isPropositionImage &&  <View style={{
                        height: 200,
                        justifyContent: 'center',
                        alignItems: "center"
                    }}>
                        <AppText style={{fontWeight: 'bold', fontSize: 20}}>{label}</AppText>
                    </View>}

                   <View style={{alignItems: 'flex-start', marginBottom: 10}}>
                    <AppText style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>Description</AppText>
                       {descriptionOptions.map((item) => <AppLabelWithValue key={item.label} label={item.label} labelValue={item.value}/>)}
                   </View>
                {!propositionNotReady && <AppButton style={{alignSelf: 'flex-end', padding: 5}} title='commander' onPress={getPropositionOrder}/>}
            </View>
            {propositionNotReady && <View style={styles.notReady}>
                <AppText style={{color: colors.rougeBordeau, fontWeight: "bold"}}>En cours de traitement...</AppText>
            </View>}

            {propositionNotReady && <View style={styles.notReadyEdit}>
                {userRoleAdmin() && <AppButton title='Editer' onPress={editProposition}/>}
            </View>}

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.blanc,
        padding: 20,
      marginTop: 20,
      marginBottom: 20
    },
    imageStyle : {
        width: '100%',
        height: 200
    },
    notReady: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: colors.blanc,
        opacity: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notReadyEdit: {
        position: 'absolute',
        alignSelf: 'center',
        top: '40%'
    }
})
export default PropositionItem;