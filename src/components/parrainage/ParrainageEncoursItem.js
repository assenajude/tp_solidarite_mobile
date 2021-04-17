import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import * as Progress from 'react-native-progress'
import {Entypo, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';

import ParrainageHeader from "./ParrainageHeader";
import AppText from "../AppText";
import colors from "../../utilities/colors";
import useOrderInfos from "../../hooks/useOrderInfos";
import useAuth from "../../hooks/useAuth";
import useParrainage from "../../hooks/useParrainage";

function ParrainageEncoursItem({ownerUserAvatar,sponsorDetails,openSponsorDetails, avatarUrl, ownerEmail,
                                   ownerUsername, parrainageOrders, getUserProfile, getParrainOrderDetails,
                                   orderProgress, showProgress}) {
    const {getOrderFactureEcheance} = useOrderInfos()
    const {getParrainagePercent, getParrainageGain} = useParrainage()
    const {formatPrice} = useAuth()
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', margin: 10}}>
            {showProgress && <View>
            <Progress.Bar progress={orderProgress} style={{width: 200}}/>
            </View>}
            </View>
            <TouchableOpacity onPress={openSponsorDetails}>
            <ParrainageHeader getUserProfile={getUserProfile} ownerUserAvatar={ownerUserAvatar} avatarUrl={avatarUrl} ownerEmail={ownerEmail} ownerUsername={ownerUsername}/>
                <View style={styles.chevronStyle}>

                    {!sponsorDetails && <Entypo name="chevron-down" size={30} color="black" />}
                    {sponsorDetails && <Entypo name="chevron-up" size={30} color="black" />}

                </View>
            </TouchableOpacity>
           {sponsorDetails && <View style={{margin: 20}}>
               <View style={{alignItems: 'center', backgroundColor: colors.rougeBordeau}}>
                   <AppText style={{color: colors.blanc}}>Commandes parrainées</AppText>
               </View>
               <View>
               {parrainageOrders.length> 0 &&  <ScrollView>
                       {parrainageOrders.map(item => <View key={item.id.toString()} style={{paddingTop: 10}}>
                           <View style={styles.orderItemStyle}>
                           <TouchableOpacity onPress={() => getParrainOrderDetails(item)}>
                           <AppText style={{color: colors.bleuFbi}}>{item.numero}</AppText>
                           </TouchableOpacity>
                           <AppText>{item.montant}</AppText>
                           <AppText>{item.OrderParrain.action}</AppText>
                           <AppText>({getParrainagePercent(item.montant, item.OrderParrain.action)}%)</AppText>
                           <AppText style={{color: colors.vert}}>{getParrainageGain(item)}</AppText>
                           </View>
                            {item.showDetails && <View style={{backgroundColor: colors.blanc}}>
                                <View style={{alignSelf: 'flex-end', padding: 5}}>
                                    <TouchableOpacity onPress={() => getParrainOrderDetails(item)}>
                                         <AntDesign name="close" size={24} color={colors.rougeBordeau} style={{fontWeight: 'bold'}}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: 10}}>
                                <AppText style={{fontWeight: 'bold'}}>Total Commande:</AppText>
                                <AppText style={{marginLeft: 10}}>{formatPrice(item.montant)}</AppText>
                                </View>
                                <View style={{flexDirection: 'row', paddingTop: 10, paddingBottom: 10}}>
                                <AppText style={{fontWeight: 'bold'}}>Montant parrainé ({getParrainagePercent((item.montant-item.interet), item.OrderParrain.action)}%):</AppText>
                                <AppText style={{marginLeft: 10}}>{formatPrice(item.OrderParrain.action)}</AppText>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                <AppText style={{fontWeight: 'bold'}}>Interet à gagner:</AppText>
                                <AppText style={{marginLeft: 10}} >{formatPrice(item.interet)}</AppText>
                                </View>
                                <View style={{flexDirection: 'row', paddingBottom: 10, paddingTop: 10}}>
                                <AppText style={{fontWeight: 'bold'}}>Gain:</AppText>
                                <AppText style={{marginLeft: 10}}>{formatPrice(getParrainageGain(item, item.OrderParrain.action))}</AppText>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <AppText style={{fontWeight: 'bold'}}>Echeance: </AppText>
                                    <AppText>{getOrderFactureEcheance(item) || 'Pas de facture'}</AppText>
                                </View>
                            </View>}
                       </View>)}
                   </ScrollView>}
               </View>
              {parrainageOrders.length === 0 && <View>
                   <AppText>Aucune commande trouvée</AppText>
               </View>}
            </View>}

         {/*   <View style={{
                position: "absolute",
                right: 20,
                top: 5
            }}>
                <Progress.CircleSnail color={['red', 'green', 'blue']}/>
            </View>*/}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        marginTop: 40
    },
    chevronStyle: {
        position: 'absolute',
        right: 2,
        top: 0
    },
    orderItemStyle: {
        flexDirection: 'row'
    }
})
export default ParrainageEncoursItem;