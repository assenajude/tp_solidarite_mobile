import React, {useState, useEffect} from 'react';
import {useStore} from "react-redux";
import {View,TextInput, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList} from 'react-native'
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

function FactureListItem({numero,okPayement,showDetail,orderItems, label,labelDatePrevue,datePrevue,undoEdit,saveEdit,
                             contratLabel,contrats,contratStatus,isDemande,isContrat,isHistorique,contratStatusStyle,
                             labelStatusLivr,statusLivraison,deleteItem,editStatusLivraison,getStatusLivraisonEdit,
                             fraisLivraison,tauxInteret,labelDate1, labelDate2,statusAccordValue, labelAccord,undoAccordEdit,
                             accordEditingValue,changeAccordEditValue,saveAccordEditing,leaveItemToContract,moveItemToHistory,
                             statusLivraisonValue,changeStatusText,getAccordStatusEdit,editStatusAccord,orderEspace,
                             notPayed,showProgress,soldeFacture, progress,payTranche,getLink,linkTitle,trancheButtonTitle2,modePayement,
                             getDetails,header,description, montant,debut, tranches, fin, showTranche=false,
                             loopItemWatch, playItemWatch,solde
                          }) {
const store = useStore()

    return (
        <View style={styles.container}>
            <View>
                <View>
                    {orderItems && <ScrollView horizontal>
                        {orderItems.map((item, index) => <TouchableOpacity  key={index} onPress={() => console.log(item)}>
                            <Image resizeMode='stretch' style={{height: 50, width: 50, margin: 10}} source={{uri: item.image}}/>
                        </TouchableOpacity>)}

                    </ScrollView>}

                </View>
                <View style={styles.factureInfo}>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <AppText style={{fontSize: 20, fontWeight: 'bold'}}>{header}  </AppText>
                        <AppText style={{fontWeight: 'bold', fontSize: 20, color: colors.or}}>{numero}</AppText>
                        {okPayement && <LottieView style={{ width: 50, marginLeft: 10}} autoPlay loop={false} source={require('../../assets/animations/done')}/>}
                    </View>

                    {description && <AppText>{description}</AppText>}

                    <View style={{flexDirection: 'row'}}>
                        <AppText style={{fontSize: 20, fontWeight: 'bold'}}>Montant: </AppText>
                        <AppText style={{fontSize: 20, fontWeight: 'bold', color: colors.rougeBordeau}}>{montant} </AppText>
                        <AppText style={{fontSize: 20, fontWeight: 'bold'}}>FCFA</AppText>
                    </View>
                    {label === 'facture' && <View>
                        <View style={{flexDirection: 'row'}}>
                            <AppText style={{fontSize: 15, fontWeight: 'bold'}}>Déjà payé: </AppText>
                            <AppText style={{fontSize: 15, fontWeight: 'bold', color: colors.rougeBordeau}}>{solde} </AppText>
                            <AppText style={{fontSize: 15, fontWeight: 'bold'}}>FCFA</AppText>
                        </View>
                        <FactureItemLabel itemLabel='Debut:' labelValue={debut}
                                          labelStyle={{fontSize: 15, fontWeight: 'bold'}} labelValueStyle={{fontSize: 15}}/>
                         <FactureItemLabel itemLabel='Fin: ' labelValue={fin} labelStyle={{fontSize: 15, fontWeight: 'bold'}}
                                           labelValueStyle={{fontSize: 15}}/>
                    </View>}
                    {showProgress &&  <View style={{flexDirection: 'row'}}>
                        <AppText>Status: </AppText>
                        <Progress.Bar progress={progress} borderColor={colors.rougeBordeau} height={30} borderWidth={0.3} borderRadius={10} width={200} color={colors.marronClair}/>
                    </View>}
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        {modePayement && <View style={{flexDirection: 'row'}}>
                            <AppText>Mode de payement: </AppText>
                            <AppText style={{fontWeight: 'bold'}}>{modePayement}</AppText>
                        </View>}
                    </View>
                   <View style={{marginBottom: 10}}>
                   {isDemande && <EditItemStatus labelStatus={labelAccord} statusValue={statusAccordValue} getStatusEditing={getAccordStatusEdit} editStatus={editStatusAccord}
                    undoEditing={undoAccordEdit} editingStatusValue={accordEditingValue} changeEditingStatusValue={changeAccordEditValue} saveEditing={saveAccordEditing}
                    statusValueStyle={{
                        color: statusAccordValue.toLowerCase() === 'accepté'?'green': statusAccordValue.toLowerCase() === 'refusé'?'red': 'grey',
                        fontWeight: 'bold'
                    }}/>}

                       {isContrat && <EditItemStatus labelStatus={labelStatusLivr} statusValue={statusLivraison} editStatus={editStatusLivraison}
                        changeEditingStatusValue={changeStatusText} editingStatusValue={statusLivraisonValue} getStatusEditing={getStatusLivraisonEdit}
                        saveEditing={saveEdit} undoEditing={undoEdit}
                        statusValueStyle={{
                            color: statusLivraison.toLowerCase() === 'livré'?'green':statusLivraison.toLowerCase() === 'partiel'?'orange':'grey',
                            fontWeight: 'bold'
                        }}/>}

                       {contrats && contrats.length >=1 && <FactureItemLabel labelStyle={{fontSize: 15, fontWeight: 'bold'}} labelValueStyle={contratStatusStyle} itemLabel={contratLabel} labelValue={contratStatus}/>}
                   </View>

                    <View style={{flexDirection: 'row'}}>
                       {label=='facture' && <AppButton iconName={showTranche?'caretup':'caretdown'} iconColor={colors.blanc} style={{width: 'auto', alignSelf: 'flex-end', padding: 5}} textStyle={{marginLeft: 5}} title={showTranche?'Fermer':'Deplier'} onPress={getDetails}/>}
                       {label=='commande' && <AppButton iconName={showDetail?'minus':'plus'} iconColor={colors.blanc} style={{width: 'auto', alignSelf: 'flex-end', padding: 5}} textStyle={{marginLeft: 5}} title='Details' onPress={getDetails}/>}
                      {!isDemande &&  <AppButton style={{marginLeft: 20}} title={linkTitle} onPress={getLink}/>}
                    </View>
                    {showTranche && <View style={styles.tranches} >
                        {tranches && tranches.length >=1 && <View>
                            {tranches.map((tranche, i) =><View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems:'center', marginRight:50}}  key={i.toString()}>
                                <AppText style={{fontWeight: 'bold'}}>trch{i+1}: {tranche.montant} fcfa</AppText>
                                <AppText>Avant le: </AppText>
                                <AppText style={{fontSize: 11}}>{dayjs(tranche.dateEcheance).format('DD/MM/YYYY HH:mm:ss')}</AppText>
                                {tranche.payed ? <AntDesign name="check" size={24} color="green" />:<AppButton onPress={() => payTranche(tranche)} style={{backgroundColor: 'green', width: 'auto', height: 16, marginLeft: 5, paddingRight:5}} title={trancheButtonTitle2}/>}
                            </View>)}
                        </View>}
                        {!tranches || tranches.length === 0 && <View>
                        <AppText>Aucune tranche pour cette facture, voulez-vous payer la totalité?</AppText>
                            {notPayed && <AppButton style={{backgroundColor: 'green', width: '50%'}} title='payer' onPress={soldeFacture}/>}
                           {!notPayed && <View style={{flexDirection: 'row'}}>
                                <AppText>dejà payé</AppText>
                                <AntDesign name="check" size={24} color="green" />
                            </View>}
                        </View>}
                    </View>}
                    {showDetail && <View style={{ minWidth: '90%', backgroundColor: colors.blanc, marginTop: 5}}>
                        {orderItems.map((order, index) => <View style={{flexDirection: 'row',minHeight: 50}} key={index.toString()}>
                            <AppText>{order.orderItem.quantite}</AppText>
                            <AppText>{order.libelle}</AppText>
                            <AppText> => </AppText>
                            <AppText>{order.orderItem.montant} fcfa</AppText>
                        </View>)}
                        <View style={{alignSelf: 'flex-start'}}>
                            <AppText style={{fontWeight: 'bold'}}>Frais livraison: {fraisLivraison} fcfa </AppText>
                            <AppText style={{fontWeight: 'bold'}}>Taux d'interet: {tauxInteret} fcfa</AppText>
                        </View>
                        <View style={{
                            alignItems: 'flex-start'
                        }}>
                            <View>
                                <AppText>{labelDate1}: {debut}</AppText>
                            </View>
                            <View>
                                <AppText>{labelDatePrevue}: {datePrevue}</AppText>
                            </View>
                          {!isDemande && statusLivraisonValue.toLowerCase() === 'livré' &&  <View>
                                <AppText>{labelDate2}: {fin}</AppText>
                            </View>}
                        </View>

                    </View>}
                </View>

            </View>
            <View>

           { isDemande && <View>
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
            {isContrat && <ContratWatch autoPlay={playItemWatch} loop={loopItemWatch}/>}
            <View>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                {!isHistorique && <TouchableOpacity onPress={moveItemToHistory}>
                    <FontAwesome name="history" size={25} color={colors.dark} />
                </TouchableOpacity>}
                    {orderEspace === 'historique' && <TouchableOpacity>
                        <Entypo name='reply' color={colors.dark} size={25}/>
                    </TouchableOpacity>}
                <ItemIconButton otherStyle={{marginTop: 20}} iconSize={24} iconName='delete' color={colors.rougeBordeau} onPress={deleteItem}/>
                </View>
            </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.blanc,
        marginTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        marginLeft: 10,
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