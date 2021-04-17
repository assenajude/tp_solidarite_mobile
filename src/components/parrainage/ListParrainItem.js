import React from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import {FontAwesome, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';

import AppText from "../AppText";
import colors from "../../utilities/colors";
import Avatar from "../user/Avatar";
import AppButton from "../AppButton";


function ListParrainItem({avatarUrl, parrainNom, parrainPrenom, parrainUsername, parrainEmail,
                             parrainPhone, parrainQuotite,remakeParrainage,getUserProfile,
                             sendMessageToParrain, activeCompte, inSponsoring=false, ownerUserAvatar,
                             compteDetailExist, isParrain, isFilleul,msgResponded=false, parrainageResponseEditing,
                             editParrainageResponse, sendParrainageResponse, stopParrainage}) {
    return (
        <>
            <View  style={styles.container}>
                {parrainageResponseEditing && <View style={{alignItems: 'center', backgroundColor:colors.lightGrey, padding: 10}}>
                    <View style={{alignSelf: 'flex-end'}}>
                        <TouchableOpacity onPress={editParrainageResponse}>
                            <AntDesign style={{fontWeight: 'bold'}} name="close" size={24} color={colors.rougeBordeau} />
                        </TouchableOpacity>
                    </View>
                   {!inSponsoring && !msgResponded && <View style={{flexDirection: 'row'}}>
                        <AppText style={{fontWeight: 'bold'}}>Demande de parrainage</AppText>
                        <AppButton textStyle={{padding: 5}}  style={{backgroundColor: colors.bleuFbi}} title='accepter' onPress={sendParrainageResponse}/>
                    </View>}
                    {inSponsoring && <View style={{flexDirection: 'row'}}>
                        <AppText style={{fontWeight:'bold'}}>Arrêt de parrainage</AppText>
                        <AppButton title='Arreter' style={{padding: 5}} onPress={stopParrainage}/>
                    </View>}
                    {!inSponsoring && msgResponded && <View style={{flexDirection: 'row'}}>
                        <AppText style={{fontWeight:'bold'}}>Reprise de parrainage</AppText>
                        <AppButton title='Reprendre' style={{padding: 5, backgroundColor: colors.vert}} onPress={remakeParrainage}/>
                    </View>}

                </View>}
                <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Avatar showNottif={false} avatarUrl={avatarUrl} ownerUserAvatar={ownerUserAvatar} onPress={getUserProfile}/>
                        <View style={{alignItems: 'flex-start'}}>
                            <AppText style={{fontWeight: 'bold'}}>{parrainUsername}</AppText>
                            <AppText>{parrainEmail}</AppText>
                        </View>
                    </View>
                    <View>
                        {isParrain && <View>
                            {!msgResponded && <AppText style={{color: colors.bleuFbi}}>envoyé</AppText>}
                            {msgResponded && inSponsoring && <TouchableOpacity onPress={editParrainageResponse}>
                                <View style={{flexDirection: 'row'}}>
                                    <MaterialCommunityIcons name="bus-stop-covered" size={24} color={colors.vert} />
                                    <AppText style={{color: colors.vert, fontWeight: 'bold'}}>P</AppText>
                                </View>
                            </TouchableOpacity>}
                            {msgResponded && !inSponsoring && <TouchableOpacity onPress={editParrainageResponse}>
                                <MaterialCommunityIcons name="bus-stop-covered" size={24} color={colors.rougeBordeau} />
                            </TouchableOpacity>}
                        </View>}
                       {isFilleul && !parrainageResponseEditing && <View>
                           {!msgResponded && !inSponsoring && <TouchableOpacity onPress={editParrainageResponse}>
                               <MaterialCommunityIcons name="bus-stop-covered" size={24} color='orange' />
                           </TouchableOpacity>}
                           {msgResponded && !inSponsoring && <TouchableOpacity onPress={editParrainageResponse}>
                               <MaterialCommunityIcons name="bus-stop-covered" size={24} color={colors.rougeBordeau} />
                           </TouchableOpacity>}
                           {msgResponded && inSponsoring && <TouchableOpacity onPress={editParrainageResponse}>
                               <View style={{flexDirection: 'row'}}>
                                   <MaterialCommunityIcons name="bus-stop-covered" size={24} color={colors.vert} />
                                   <AppText style={{color: colors.vert, fontWeight: 'bold'}}>F</AppText>
                               </View>
                           </TouchableOpacity>}

                        </View>}
                        {!isFilleul && !isParrain && <View>
                            <TouchableOpacity onPress={sendMessageToParrain}>
                                <FontAwesome name="send" size={24} color={colors.bleuFbi} />
                            </TouchableOpacity>
                        </View>}
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <AppText style={{fontWeight: 'bold', fontSize: 18, color: colors.rougeBordeau}}>Quotité</AppText>
                    <AppText style={{marginLeft: 50, fontWeight: 'bold', fontSize: 18, color: colors.rougeBordeau}}>{parrainQuotite} fcfa</AppText>
                </View>
                {compteDetailExist && <View style={{alignItems: 'flex-start'}}>
                 <View>
                    <View style={{flexDirection: 'row'}}>
                    <AppText style={{fontWeight: 'bold'}}>{parrainNom}</AppText>
                    <AppText style={{fontWeight: 'bold'}}>{parrainPrenom}</AppText>
                </View>
                 <AppText>{parrainPhone}</AppText>
                 </View>

             </View>}
            {!activeCompte && <View style={styles.inactive}>
            </View>}
                {!activeCompte && <View style={styles.inactifText}>
                    <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>Compte inactif</AppText>
                </View>}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    avatarStyle: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    container: {
        backgroundColor: colors.blanc,
        padding: 10,
        marginBottom: 30
    },
    inactive: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: 0.6,
        zIndex: 1,
        backgroundColor: colors.blanc
    },
    inactifText: {
        position: 'absolute',
        zIndex: 10,
        alignSelf: "center"
    }
})
export default ListParrainItem;