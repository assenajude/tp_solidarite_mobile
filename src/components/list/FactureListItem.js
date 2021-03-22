import React from 'react';
import {View,StyleSheet, TouchableOpacity,ScrollView, Image} from 'react-native'
import dayjs from 'dayjs'
import LottieView from 'lottie-react-native'
import * as Progress  from 'react-native-progress'

import AppText from "../AppText";
import AppButton from "../AppButton";
import colors from "../../utilities/colors";
import ItemIconButton from "./ItemIconButton";
import FactureItemLabel from "./FactureItemLabel";
import ListItemHeader from "./ListItemHeader";
import TrancheItem from "../TrancheItem";
import AppLabelWithValue from "../AppLabelWithValue";
import AppModePayement from "../AppModePayement";

function FactureListItem({numero,okPayement,orderItems, deleteItem,goToItemDetails,
                             showProgress, progress,payTranche,getLink,modePayement,
                             getDetails, montant,tranches,solde,endFacture=true,
                             showTranches,dateEmission,dateEcheance
                          }) {


    return (
          <>
              <View style={styles.mainContainer}>
                      <AppModePayement modePayement={modePayement}/>
                  {showProgress &&  <View style={{marginTop: 10, marginLeft: 10, alignSelf: 'center'}}>
                      <Progress.Bar progress={progress} borderColor={colors.rougeBordeau}  width={200} color={colors.marronClair}/>
                  </View>}
                  {orderItems && <ScrollView horizontal>
                      {orderItems.map((item, index) => <TouchableOpacity  key={index}>
                          <Image resizeMode='stretch' style={{height: 50, width: 50, margin: 10}} source={{uri: item.OrderItem.image}}/>
                      </TouchableOpacity>)}
                  </ScrollView>}
                  <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                      <ListItemHeader headerTitle='F'/>
                      <AppText style={{fontWeight: 'bold', fontSize: 20, color: colors.or}}>{numero}</AppText>
                  </View>
                  <View style={{marginTop: 20}}>
                  <AppLabelWithValue label='Montant: ' labelValue={montant} secondLabel='fcfa'/>
                  <AppLabelWithValue label='Déjà payé: ' labelValue={solde || 0} secondLabel='fcfa' />

                      <FactureItemLabel itemLabel='Debut:' labelValue={dayjs(dateEmission).format('DD/MM/YYYY HH:mm:ss')}
                                        labelStyle={{fontSize: 15, fontWeight: 'bold'}} labelValueStyle={{fontSize: 15}}/>
                      <FactureItemLabel itemLabel='Fin: ' labelValue={dayjs(dateEcheance).format('DD/MM/YYYY HH:mm:ss')} labelStyle={{fontSize: 15, fontWeight: 'bold'}}
                                        labelValueStyle={{fontSize: 15}}/>
                      <View style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          marginTop: 10
                      }}>
                          <AppButton iconName={showTranches ?'caretup':'caretdown'} iconColor={colors.blanc} style={{width: 'auto', padding: 5}} textStyle={{marginLeft: 5}} title={showTranches?'Fermer':'Deplier'} onPress={getDetails}/>
                          <AppButton iconName='plus' iconColor={colors.blanc} style={{width: 'auto', padding: 5, marginLeft: 20 }} textStyle={{marginLeft: 5}} title='Details' onPress={goToItemDetails}/>
                          <AppButton style={{marginLeft: 20}} title='consulter la cmde' onPress={getLink}/>
                      </View>
                  </View>
                  {showTranches && tranches && <View style={styles.tranches} >
                      {tranches.length >=1 && <View style={{padding: 10}}>
                          {tranches.map((tranche, i) =>
                              <TrancheItem key={tranche.id.toString()} trancheIndex={i+1} isTranchePayed={tranche.payed} trancheMontant={tranche.montant}
                                           tranchePayedDate={tranche.updatedAt} trancheDateEcheance={tranche.dateEcheance}
                                           payTranche={() => payTranche(tranche)}/>
                          )}
                      </View>}
                  </View>}
              </View>
              <View style={ {
                  position: 'absolute',
                  top: 30,
                  right: 20
              }}>
                  {okPayement && <LottieView style={{height: 50, width: 50}} autoPlay={true} loop={false} source={require('../../assets/animations/done')}/>}
                  {!okPayement && <LottieView style={{height: 50, width: 50}} autoPlay={true} loop={true} source={require('../../assets/animations/money')}/>}
              </View>
              {endFacture &&  <View style={styles.deleteIcon}>
                  <ItemIconButton otherStyle={{marginTop: 10}} iconSize={24} iconName='delete' color={colors.rougeBordeau} onPress={deleteItem}/>
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
        paddingBottom: 15
    },
    deleteIcon: {
        position: 'absolute',
        right: 20,
        top: 250
    }
})

export default FactureListItem;