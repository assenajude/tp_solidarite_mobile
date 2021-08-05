import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import * as Progress from 'react-native-progress'
import {Entypo} from '@expo/vector-icons';

import ParrainageHeader from "./ParrainageHeader";
import AppText from "../AppText";
import colors from "../../utilities/colors";
import useOrderInfos from "../../hooks/useOrderInfos";
import useAuth from "../../hooks/useAuth";
import useParrainage from "../../hooks/useParrainage";
import AppIconButton from "../AppIconButton";
import AppLabelWithValue from "../AppLabelWithValue";

function ParrainageEncoursItem({ownerUserAvatar,sponsorDetails,openSponsorDetails, avatarUrl, ownerEmail,
                                   ownerUsername, parrainageOrders, getUserProfile, getParrainOrderDetails,
                                   orderProgress, showProgress}) {
    const {getOrderFactureEcheance} = useOrderInfos()
    const {getParrainagePercent, getParrainageGain} = useParrainage()
    const {formatPrice, formatDate} = useAuth()
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', margin: 10}}>
            {showProgress && <View>
            <Progress.Bar progress={orderProgress} style={{width: 200}}/>
            </View>}
            </View>
            <View style={{
                flexDirection: 'row'
            }}>
            <ParrainageHeader
                getUserProfile={getUserProfile}
                ownerUserAvatar={ownerUserAvatar}
                avatarUrl={avatarUrl}
                ownerEmail={ownerEmail}
                ownerUsername={ownerUsername}/>
                <AppIconButton
                    onPress={openSponsorDetails}
                    iconColor={colors.dark}
                    buttonContainer={{
                        backgroundColor: colors.leger
                    }}
                    iconName={sponsorDetails?'caretup':'caretdown'}
                />

            </View>
           {sponsorDetails && <View>
               <View style={{alignItems: 'center', backgroundColor: colors.leger}}>
                   <AppText style={{color: colors.dark}}>Commandes parrainées</AppText>
               </View>
               <View>
               {parrainageOrders.length> 0 &&  <ScrollView>
                       {parrainageOrders.map(item => <View key={item.id.toString()} style={{paddingTop: 10, marginHorizontal: 10}}>
                           <View style={styles.orderItemStyle}>
                           <TouchableOpacity onPress={() => getParrainOrderDetails(item)}>
                               <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                   {!item.showDetails && <Entypo name="chevron-right" size={25} color="black" />}
                                   {item.showDetails && <Entypo name="chevron-down" size={25} color="black" />}
                                   <AppText style={{color: colors.bleuFbi}}>{item.numero}</AppText>
                               </View>
                           </TouchableOpacity>
                           <AppText>{item.montant}</AppText>
                           <AppText>({getParrainagePercent(item.montant, item.OrderParrain.action)}%)</AppText>
                           </View>
                            {item.showDetails && <View style={{backgroundColor: colors.blanc, padding: 10}}>
                                <AppLabelWithValue label='Total commande' labelValue={formatPrice(item.montant)}/>
                                <AppLabelWithValue label='Montant parrainé' labelValue={`(${getParrainagePercent((item.montant-item.interet), item.OrderParrain.action)}%) ${formatPrice(item.OrderParrain.action)}`}/>
                                <AppLabelWithValue label='Interêt à gagner' labelValue={formatPrice(item.interet)}/>
                                <AppLabelWithValue label='Gain' labelValue={formatPrice(getParrainageGain(item, item.OrderParrain.action))}/>
                                <AppLabelWithValue label='Commandé le' labelValue={formatDate(item.createdAt)}/>
                                <AppLabelWithValue label='Echeance' labelValue={getOrderFactureEcheance(item) || 'Pas de facture'}/>
                            </View>}
                       </View>)}
                   </ScrollView>}
               </View>
              {parrainageOrders.length === 0 && <View>
                   <AppText>Aucune commande trouvée</AppText>
               </View>}
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    },
    chevronStyle: {
        position: 'absolute',
        right: 2,
        top: 0
    },
    orderItemStyle: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
export default ParrainageEncoursItem;