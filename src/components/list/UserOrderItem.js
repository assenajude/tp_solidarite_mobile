import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Image} from "react-native";
import dayjs from "dayjs";
import AppText from "../AppText";
import colors from "../../utilities/colors";
import ContratWatch from "../order/ContratWatch";
import ListItemHeader from "./ListItemHeader";
import AppLabelWithValue from "../AppLabelWithValue";
import AppModePayement from "../AppModePayement";
import StatusPicker from "../order/StatusPicker";
import FactureItemLabel from "./FactureItemLabel";
import AppButton from "../AppButton";
import ItemIconButton from "./ItemIconButton";
import {MaterialIcons, Entypo} from '@expo/vector-icons'

function UserOrderItem({
                           numero,header,showDetail,orderItems, datePrevue, contrats,contratStatus,isDemande,isContrat,isHistorique,contratStatusStyle,
                           deleteItem,changeLivraisonValue,livraisonValue,goToItemDetails,
                           fraisLivraison,tauxInteret,statusAccordValue,isExpired,expireIn,
                           changeAccordEditValue,leaveItemToContract,moveItemToHistory, getLink,modePayement,
                           getDetails,montant,dateCmde, dateLivraison, typeCmde,
                           loopItemWatch, playItemWatch,solde,showDeleteIcon=true,
                           accordStyle,accordInitData,livraisonStyle,livraisonInitData
                       }) {

    return (
        <>
            <View style={styles.mainContainer}>
               {isDemande && statusAccordValue.toLowerCase() === 'accepté' && <View>
                   {isExpired?<AppText style={{color:colors.rougeBordeau, fontWeight: 'bold'}}>0j 00h00m 00s</AppText>:<AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>{expireIn}</AppText>}
               </View>}
                <AppModePayement modePayement={modePayement}/>
                <View style={{flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ListItemHeader headerTitle={header}/>
                    <AppText style={{fontWeight: 'bold', fontSize: 20, color: colors.or}}>{numero}</AppText>
                </View>
                <View>
                {orderItems && <ScrollView horizontal>
                    {orderItems.map((item, index) => <TouchableOpacity  key={index}>
                        <Image resizeMode='stretch' style={{height: 50, width: 50, margin: 10}} source={{uri: item.OrderItem.image}}/>
                    </TouchableOpacity>)}
                </ScrollView>}

                <View style={{
                    position: 'absolute',
                    left: '25%',
                    bottom: -20
                }}>
                    <AppText style={{fontWeight: 'bold', fontSize: 18}}>{typeCmde === 'location'?orderItems[0].OrderItem.libelle:'Achats divers'}</AppText>
                </View>
                </View>

                <View style={{marginTop: 20}}>
                    <AppLabelWithValue label='Montant:' labelValue={montant}/>
                    {!isDemande && <AppLabelWithValue label='Déjà payé: ' labelValue={solde || 0}/>}
                    {!isContrat &&  <StatusPicker labelStatus='Accord' statusValue={statusAccordValue} statusData={accordInitData}
                                                  changeStatusValue={changeAccordEditValue} otherStatusStyle={accordStyle}/>}
                    {!isDemande &&
                    <StatusPicker labelStatus='Livraison' statusValue={livraisonValue} otherStatusStyle={livraisonStyle} statusData={livraisonInitData}
                                  changeStatusValue={changeLivraisonValue}/>
                    }
                    {contrats && contrats.length >=1 && <FactureItemLabel labelStyle={{fontSize: 15, fontWeight: 'bold'}} labelValueStyle={contratStatusStyle} itemLabel='Contrat: ' labelValue={contratStatus}/>}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 10,
                        marginBottom: 10
                    }}>
                        <AppButton iconName={showDetail?'caretup':'caretdown'} iconColor={colors.blanc} style={{width: 'auto', padding: 5}} textStyle={{marginLeft: 5}} title={showDetail? 'Fermer':'Deplier'} onPress={getDetails}/>
                        <AppButton iconName='plus' iconColor={colors.blanc} style={{width: 'auto', padding: 5, marginLeft: 20 }} textStyle={{marginLeft: 5}} title='Details' onPress={goToItemDetails}/>
                        {!isDemande &&  <AppButton style={{marginLeft: 20}} title='Voir la facture' onPress={getLink}/>}
                    </View>
                    {showDetail && orderItems && <View style={{ minWidth: '90%', backgroundColor: colors.blanc, marginTop: 5}}>
                        {orderItems.map((order, index) =>
                                <AppLabelWithValue key={index.toString()} label={order.OrderItem.quantite} labelValue={order.OrderItem.libelle} secondLabel={order.OrderItem.montant} secondLabelValue='fcfa'/>
                        )}
                        <AppLabelWithValue label='Frais livraison: ' labelValue={fraisLivraison} secondLabel='fcfa'/>
                        <AppLabelWithValue label="Taux d'interêt: " labelValue={tauxInteret} secondLabel='fcfa'/>
                        <AppLabelWithValue label="Date commande: " labelValue={dayjs(dateCmde).format('DD/MM/YYYY HH:mm:ss')}/>
                        <AppLabelWithValue label='Livraison prevue le: ' labelValue={dayjs(datePrevue).format('DD/MM/YYYY HH:mm:ss')}/>
                        {!isDemande && livraisonValue.toLowerCase() === 'livré' && <AppLabelWithValue label='Livré le: ' labelValue={dayjs(dateLivraison).format('DD/MM/YYYY HH:mm:ss')}/>}

                    </View>}
                </View>
            </View>
            <View style={{
                position: 'absolute',
                right: -25,
                top: -10
            }}>
                {!isDemande && <ContratWatch autoPlay={playItemWatch} loop={loopItemWatch}/>}

            </View>
            {!contrats && <View style={{
                position: 'absolute',
                right: 20,
                top: 40
            }}>
                {statusAccordValue && statusAccordValue.toLowerCase() === 'refusé' &&
                <ItemIconButton iconName='dislike1' iconSize={40} color='red' otherStyle={{borderRadius: 20}}/>}
                {statusAccordValue && statusAccordValue.toLowerCase() === 'accepté' &&
                <ItemIconButton iconName='like1' iconSize={40} color='green' otherStyle={{borderRadius: 20}}
                                onPress={leaveItemToContract}/>}
            </View>}
            <View style={{position: 'absolute',right:10,top: 210, alignItems: 'center'}}>
                {!isHistorique &&
                <TouchableOpacity onPress={moveItemToHistory}>
                    <MaterialIcons name="history" size={25} color={colors.dark} />
                </TouchableOpacity>}
                {isHistorique && <TouchableOpacity>
                    <Entypo name='reply' color={colors.dark} size={25}/>
                </TouchableOpacity>}
                {showDeleteIcon && <ItemIconButton otherStyle={{marginTop: 10}} iconSize={24} iconName='delete' color={colors.rougeBordeau} onPress={deleteItem}/>}
            </View>
         {isExpired &&
         <View style={styles.expired}>
            </View>
            }

           {isExpired && <View style={styles.orderAgain}>
                <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>expiré</AppText>
               <AppButton title='supprimer' iconName='delete' iconSize={17} iconColor={colors.blanc} textStyle={{marginLeft: 5}}
                          onPress={deleteItem}/>
            </View>}

        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.blanc,
        marginTop: 30,
        padding: 5
    },
    expired: {
        position: 'absolute',
        backgroundColor: colors.blanc,
        opacity: 0.8,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    orderAgain: {
        position: 'absolute',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }

})
export default UserOrderItem;