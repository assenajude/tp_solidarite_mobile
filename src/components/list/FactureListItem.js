import React, {useState, useEffect} from 'react';
import {useStore} from "react-redux";
import {View,TextInput, StyleSheet, TouchableOpacity,TouchableHighlight, TouchableWithoutFeedback, ScrollView, Image, FlatList} from 'react-native'
import dayjs from 'dayjs'
import LottieView from 'lottie-react-native'
import * as Progress  from 'react-native-progress'
import { AntDesign,Entypo, FontAwesome } from '@expo/vector-icons';

import AppText from "../AppText";
import AppButton from "../AppButton";
import colors from "../../utilities/colors";
import ItemIconButton from "./ItemIconButton";
import EditItemStatus from "../order/EditItemStatus";
import ContratWatch from "../order/ContratWatch";
import FactureItemLabel from "./FactureItemLabel";
import ListItemHeader from "./ListItemHeader";
import StatusPicker from "../order/StatusPicker";
import TrancheItem from "../TrancheItem";
import OrderDetailItem from "../OrderDetailItem";
import AppLabelWithValue from "../AppLabelWithValue";

function FactureListItem({numero,okPayement,showDetail,orderItems, label,labelDatePrevue,datePrevue,
                             contratLabel,contrats,contratStatus,isDemande,isContrat,isHistorique,contratStatusStyle,
                             deleteItem,changeLivraisonValue,livraisonLabel,livraisonValue,goToItemDetails,
                             fraisLivraison,tauxInteret,labelDateCmde, labelDateLivraison,statusAccordValue, labelAccord,
                             changeAccordEditValue,leaveItemToContract,moveItemToHistory,orderEspace,
                             showProgress, progress,payTranche,getLink,linkTitle,modePayement,
                             getDetails,header,description, montant,dateCmde, tranches, dateLivraison,
                             loopItemWatch, playItemWatch,solde,endFacture=true,
                             accordStyle,accordInitData,livraisonStyle,livraisonInitData,showTranches,dateEmission,dateEcheance
                          }) {
const store = useStore()

    return (
          <View>
          <View style={styles.container}>
            <View>
                <View>
                    {orderItems && <ScrollView horizontal>
                        {orderItems.map((item, index) => <TouchableOpacity  key={index}>
                            <Image resizeMode='stretch' style={{height: 50, width: 50, margin: 10}} source={{uri: item.OrderItem.image}}/>
                        </TouchableOpacity>)}

                    </ScrollView>}

                </View>
                <View style={styles.factureInfo}>
                    <View style={{flexDirection: 'row', justifyContent:'space-between',
                        alignItems: 'center'
                    }}>
                        <ListItemHeader headerTitle={header}/>
                        <AppText style={{fontWeight: 'bold', fontSize: 20, color: colors.or}}>{numero}</AppText>
                    </View>

                    {description && <AppText>{description}</AppText>}

                    <View style={{flexDirection: 'row'}}>
                        <AppText style={{fontSize: 20, fontWeight: 'bold'}}>Montant: </AppText>
                        <AppText style={{fontSize: 20, fontWeight: 'bold', color: colors.rougeBordeau}}>{montant} </AppText>
                        <AppText style={{fontSize: 20, fontWeight: 'bold'}}>FCFA</AppText>
                    </View>
                     <View>
                      {!isDemande &&  <View style={{flexDirection: 'row'}}>
                            <AppText style={{fontSize: 15, fontWeight: 'bold'}}>Déjà payé: </AppText>
                            <AppText style={{fontSize: 15, fontWeight: 'bold', color: colors.rougeBordeau}}>{solde || 0} </AppText>
                            <AppText style={{fontSize: 15, fontWeight: 'bold'}}>FCFA</AppText>
                        </View>}
                         {label === 'facture' && <View>
                        <FactureItemLabel itemLabel='Debut:' labelValue={dayjs(dateEmission).format('DD/MM/YYYY HH:mm:ss')}
                                          labelStyle={{fontSize: 15, fontWeight: 'bold'}} labelValueStyle={{fontSize: 15}}/>
                         <FactureItemLabel itemLabel='Fin: ' labelValue={dayjs(dateEcheance).format('DD/MM/YYYY HH:mm:ss')} labelStyle={{fontSize: 15, fontWeight: 'bold'}}
                                           labelValueStyle={{fontSize: 15}}/>
                         </View>}
                    </View>
                    {showProgress &&  <View style={{flexDirection: 'row'}}>
                        <AppText>Status: </AppText>
                        <Progress.Bar progress={progress} borderColor={colors.rougeBordeau} height={30} borderWidth={0.3} borderRadius={10} width={200} color={colors.marronClair}/>
                    </View>}
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        {modePayement && <View style={{flexDirection: 'row'}}>
                            <AppText style={{fontWeight: 'bold', fontSize: 15}}> Mode de payement: </AppText>
                            <AppText style={{fontSize: 15}}>{modePayement}</AppText>
                        </View>}
                    </View>
                   <View style={{marginBottom: 10}}>
                   {label=='commande' && !isContrat &&
                   <StatusPicker labelStatus={labelAccord} statusValue={statusAccordValue} statusData={accordInitData}
                                 changeStatusValue={changeAccordEditValue} otherStatusStyle={accordStyle}/>
                   }

                       {label === 'commande' && !isDemande &&
                        <StatusPicker labelStatus={livraisonLabel} statusValue={livraisonValue} otherStatusStyle={livraisonStyle} statusData={livraisonInitData}
                                      changeStatusValue={changeLivraisonValue}/>
                       }

                       {contrats && contrats.length >=1 && <FactureItemLabel labelStyle={{fontSize: 15, fontWeight: 'bold'}} labelValueStyle={contratStatusStyle} itemLabel={contratLabel} labelValue={contratStatus}/>}
                   </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}>
                      <AppButton iconName={showDetail || showTranches ?'caretup':'caretdown'} iconColor={colors.blanc} style={{width: 'auto', padding: 5}} textStyle={{marginLeft: 5}} title={showDetail || showTranches?'Fermer':'Deplier'} onPress={getDetails}/>
                       <AppButton iconName='plus' iconColor={colors.blanc} style={{width: 'auto', padding: 5, marginLeft: 20 }} textStyle={{marginLeft: 5}} title='Details' onPress={goToItemDetails}/>
                      {!isDemande &&  <AppButton style={{marginLeft: 20}} title={linkTitle} onPress={getLink}/>}
                    </View>
                    {showTranches && tranches && <View style={styles.tranches} >
                        {tranches.length >=1 && <View>
                            {tranches.map((tranche, i) =>
                                <TrancheItem key={tranche.id.toString()} trancheIndex={i+1} isTranchePayed={tranche.payed} trancheMontant={tranche.montant}
                                             tranchePayedDate={tranche.updatedAt} trancheDateEcheance={tranche.dateEcheance}
                                             payTranche={() => payTranche(tranche)}/>
                            )}
                        </View>}
                    </View>}
                    {showDetail && orderItems && <View style={{ minWidth: '90%', backgroundColor: colors.blanc, marginTop: 5}}>
                        {orderItems.map((order, index) =>
                            <OrderDetailItem key={order.id.toString()} quantite={order.OrderItem.quantite} libelle={order.OrderItem.libelle} montant={order.OrderItem.montant}/>
                        )}
                        <AppLabelWithValue label='Frais livraison: ' labelValue={fraisLivraison} secondLabel='fcfa'/>
                        <AppLabelWithValue label="Taux d'interêt: " labelValue={tauxInteret} secondLabel='fcfa'/>
                        <AppLabelWithValue label={labelDateCmde} labelValue={dayjs(dateCmde).format('DD/MM/YYYY HH:mm:ss')}/>
                        <AppLabelWithValue label={labelDatePrevue} labelValue={dayjs(datePrevue).format('DD/MM/YYYY HH:mm:ss')}/>
                        {isDemande && livraisonValue.toLowerCase() === 'livré' && <AppLabelWithValue label={labelDateLivraison} labelValue={dayjs(dateLivraison).format('DD/MM/YYYY HH:mm:ss')}/>}

                    </View>}
                </View>

            </View>

        </View>
            <View style={{
                position: 'absolute',
                right: -25,
                top: -20
            }}>
            {label == 'commande' && !isDemande && <ContratWatch autoPlay={playItemWatch} loop={loopItemWatch}/>}
            </View>
            { isDemande && <View style={{
                position: 'absolute',
                right: 10,
                top: 20
            }}>
                { statusAccordValue &&  <View style={{marginBottom: 50}}>
                    { statusAccordValue.toLowerCase() === 'accepté' &&  <ItemIconButton iconName='like1' iconSize={40} onPress={leaveItemToContract} color={colors.vert}
                       otherStyle={{
                           borderRadius: 20,
                       }}/>}
                    {statusAccordValue && statusAccordValue.toLowerCase() === 'refusé' &&  <ItemIconButton iconName='dislike1' iconSize={40} color='red'
                       otherStyle={{
                           borderRadius: 20,
                       }}/>}
                </View>}

            </View>}

            <View style={{position: 'absolute',right:10,top: 220, alignItems: 'center'}}>
                {label === 'commande' && !isHistorique &&
                <TouchableOpacity onPress={moveItemToHistory}>
                    <FontAwesome name="history" size={25} color={colors.dark} />
                </TouchableOpacity>}
                {orderEspace === 'historique' && <TouchableOpacity>
                    <Entypo name='reply' color={colors.dark} size={25}/>
                </TouchableOpacity>}
              {endFacture &&  <ItemIconButton otherStyle={{marginTop: 10}} iconSize={24} iconName='delete' color={colors.rougeBordeau} onPress={deleteItem}/>}
            </View>
            {label == 'facture' && okPayement &&
                <View style={ {
                    position: 'absolute',
                    top: 30,
                    right: 20
                }}>
                   <LottieView style={{height: 50, width: 50}} autoPlay={true} loop={false} source={require('../../assets/animations/done')}/>
                </View>
            }
                </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: colors.blanc,
        marginTop: 20,
        paddingLeft: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        padding: 5
    },
    content: {
        flexDirection: 'row',
    },
    factureInfo: {
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    tranches: {
        backgroundColor: colors.blanc,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: '100%'
    }
})

export default FactureListItem;