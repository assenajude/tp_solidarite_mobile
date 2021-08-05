import React from 'react';
import {View,StyleSheet, TouchableOpacity,ScrollView, Image} from 'react-native'
import LottieView from 'lottie-react-native'
import * as Progress  from 'react-native-progress'

import AppText from "../AppText";
import colors from "../../utilities/colors";
import FactureItemLabel from "./FactureItemLabel";
import ListItemHeader from "./ListItemHeader";
import AppLabelWithValue from "../AppLabelWithValue";
import AppModePayement from "../AppModePayement";
import AppIconButton from "../AppIconButton";
import AppSmallButton from "../AppSmallButton";
import useAuth from "../../hooks/useAuth";
import useOrderInfos from "../../hooks/useOrderInfos";
import {useNavigation} from '@react-navigation/native'
import routes from "../../navigation/routes";
import {useSelector} from "react-redux";

function FactureListItem({facture, deleteItem}) {
    const navigation = useNavigation()
    const {formatDate} = useAuth()
    const {getModePayement, getItems} = useOrderInfos()
    const tranchesList = useSelector(state => state.entities.tranche.list)
    const endFacture = facture.montant === facture.solde
    const progress = Number(facture?.ratio)
    const orderItems = getItems(facture.CommandeId)
    const okPayement = facture.montant === facture.solde
    const showProgress =  progress && progress < 1 || facture.Tranches.some(tranche => tranche.payedState === 'pending')
    const waitingTranchePayed = facture.Tranches.some(tranche => tranche.payedState === 'pending')
    const tranches = tranchesList.filter(tranche => tranche.FactureId === facture.id)


    return (
          <>
              <View style={styles.mainContainer}>
                      <AppModePayement modePayement={getModePayement(facture.CommandeId)}/>
                  {showProgress  &&  <View style={{marginVertical: 20, marginLeft: 40}}>
                      <Progress.Bar progress={progress}  width={200} height={10} color={progress<0.5?colors.rougeBordeau:0.5<progress<1?'orange':colors.vert}/>
                  </View>}
                  {orderItems && <ScrollView horizontal>
                      {orderItems.map((item, index) => <TouchableOpacity  key={index}>
                          <Image resizeMode='stretch' style={{height: 50, width: 50, margin: 10}} source={{uri: item.OrderItem.image}}/>
                      </TouchableOpacity>)}
                  </ScrollView>}
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                      <ListItemHeader headerTitle='F'/>
                      <AppText style={{fontWeight: 'bold', fontSize: 20, color: colors.or}}>{facture.numero}</AppText>
                  </View>
                  <View style={{marginTop: 20}}>
                  <AppLabelWithValue label='Montant: ' labelValue={facture.montant} secondLabel='fcfa'/>
                  <AppLabelWithValue label='Déjà payé: ' labelValue={facture.solde || 0} secondLabel='fcfa' />

                      <FactureItemLabel itemLabel='Debut:' labelValue={formatDate(facture.dateEmission)}
                                        labelStyle={{fontSize: 15, fontWeight: 'bold'}} labelValueStyle={{fontSize: 15}}/>
                      <FactureItemLabel itemLabel='Fin: ' labelValue={formatDate(facture.dateFin)} labelStyle={{fontSize: 15, fontWeight: 'bold'}}
                                        labelValueStyle={{fontSize: 15}}/>
                      <TouchableOpacity
                          onPress={() => navigation.navigate(routes.FACTURE_TRANCHE, facture)}
                          style={styles.trancheLink}>
                          <AppText style={{color: colors.bleuFbi}}>Tranches ({tranches.length})</AppText>
                      </TouchableOpacity>
                  </View>
                  <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                  }}>
                      <AppSmallButton
                          onPress={() => navigation.navigate('AccueilNavigator', {screen :routes.FACTURE_DETAILS, params: facture})}
                          iconName="plus"
                          title='Details'
                      />
                      <AppSmallButton
                          width={150}
                          iconName='back'
                          title='Voir la cmd'
                          onPress={() => navigation.navigate(routes.ORDER_DETAILS, facture.Commande)}/>
                  </View>
              </View>
              <View style={ {
                  position: 'absolute',
                  top: 30,
                  right: 20
              }}>
                  {okPayement && !waitingTranchePayed && <LottieView style={{height: 100, width: 100}} autoPlay={true} loop={false} source={require('../../assets/animations/done')}/>}
                  { waitingTranchePayed && <View>
                  <LottieView style={{height: 80, width: 80}} autoPlay={true} loop={false} source={require('../../assets/animations/money_pending')}/>
                  </View>
                  }
                  {!okPayement && !waitingTranchePayed && <LottieView style={{height: 80, width: 80}} autoPlay={true} loop={true} source={require('../../assets/animations/money_pending')}/>}
              </View>
              {endFacture &&  <View style={styles.deleteIcon}>
                  <AppIconButton
                      onPress={deleteItem}
                      iconName='delete'
                      buttonContainer={{
                          backgroundColor: colors.rougeBordeau
                      }}/>
              </View>
              }
                </>
    );
}

const styles = StyleSheet.create({
    tranches: {
        backgroundColor: colors.blanc,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: '100%'
    },
    mainContainer: {
        backgroundColor: colors.blanc,
        marginTop: 30,
        paddingBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    deleteIcon: {
        position: 'absolute',
        right: 20,
        top: 250
    },
    trancheLink: {
        alignSelf: 'flex-start',
        marginVertical: 10,
        marginHorizontal:5
    }
})

export default FactureListItem;