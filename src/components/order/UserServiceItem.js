import React from 'react';
import {View, ScrollView, StyleSheet, Image, TouchableOpacity} from "react-native";
import AppText from "../AppText";
import AppButton from "../AppButton";
import colors from "../../utilities/colors";
import {AntDesign, FontAwesome,Entypo} from "@expo/vector-icons";
import EditItemStatus from "./EditItemStatus";
import ItemIconButton from "../list/ItemIconButton";
import ContratWatch from "./ContratWatch";
import {HeaderTitle} from "@react-navigation/stack";
import ListItemHeader from "../list/ListItemHeader";
import FactureItemLabel from "../list/FactureItemLabel";

function UserServiceItem({showOrderDetail,showDetail, dateFourniture,payement,
                            statusContratValue, statusAccordValue,editStatusAccord,
                             dateDemande,itemImage, itemMontant, header, headerValue,
                             contrats,accordValueStyle,changeAccordEditValue,accordEditValue,
                             saveAccording,startEditingAccord,undoAccordEditing,createOrderContrat,
                             isHistorique,moveItemToHistorique, isDemande,loopItemWatch, playItemWatch,
                             contratValueStyle,deleteItem, isContrat,permitLivraisonEdit,statusLivraisonLabel,
                             statusLivraisonValue, getLivraisonEdit, editLivraison, saveLivraisonEdit,
                             undoLivraisonEdit,editingLivraisonValue,changeLivraisonEditValue,statusLivraisonStyle,
                             permitAccordEdit


}) {
    return (
        <>
            <View style={{flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                width: '100%',
                backgroundColor: colors.blanc, marginTop: 10, paddingBottom: 5,
                borderBottomWidth: 0.2}}>

                <View style={{ width: 80,justifyContent: 'center', marginRight: 10}}>
                <Image resizeMode='stretch' source={{uri: itemImage}} style={{width: 80,height: 150}}/>
                </View>

                <View style={{
                    margin: 20
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <ListItemHeader headerTitle={header}/>
                        <AppText style={{fontWeight: 'bold', color:colors.or}}>{headerValue}</AppText>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <AppText style={{fontSize: 18, fontWeight: 'bold'}}>Montant: </AppText>
                      <AppText style={{
                          fontWeight: 'bold',
                          color: colors.rougeBordeau
                      }}>{itemMontant}</AppText>
                      <AppText>F CFA</AppText>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <AppText style={{fontSize: 15, fontWeight: 'bold'}}>Reglement: </AppText>
                        <AppText style={{fontWeight: 'bold', fontSize: 15}}>{payement}</AppText>
                    </View>
                    {!isContrat && <EditItemStatus permitEdit={permitAccordEdit}  statusValueStyle={accordValueStyle}  labelStatus='Status accord' statusValue={statusAccordValue} editStatus={editStatusAccord}
                                    saveEditing={saveAccording} getStatusEditing={startEditingAccord} undoEditing={undoAccordEditing}
                                    editingStatusValue={accordEditValue} changeEditingStatusValue={changeAccordEditValue}/>}

                    {contrats && contrats.length>=1 && <EditItemStatus permitEdit={permitLivraisonEdit} labelStatus={statusLivraisonLabel}
                                                       statusValue={statusLivraisonValue} editStatus={editLivraison} saveEditing={saveLivraisonEdit}
                                                        getStatusEditing={getLivraisonEdit} undoEditing={undoLivraisonEdit}
                                                       editingStatusValue={editingLivraisonValue} changeEditingStatusValue={changeLivraisonEditValue}
                                                       statusValueStyle={statusLivraisonStyle}/>}

                                    {!isDemande && <FactureItemLabel itemLabel='Status contrat' labelValue={statusContratValue}
                                     labelStyle={{fontSize: 15, fontWeight: 'bold'}} labelValueStyle={contratValueStyle}/>}
                {showDetail &&    <View>
                    <View style={{flexDirection: 'row'}}>
                      <AppText style={{fontSize: 18, fontWeight: 'bold'}}>Demandé le: </AppText>
                      <AppText>{dateDemande}</AppText>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <AppText style={{fontSize: 18, fontWeight: 'bold'}}>Fourni le: </AppText>
                      <AppText>{dateFourniture}</AppText>
                    </View>
                    </View>}
                    <View style={{flexDirection: 'row'}}>
                        <AppButton title='Details' style={{marginRight: 30}} iconSize={20} iconName={showDetail? 'minus':'plus'} iconColor={colors.blanc}
                        textStyle={{marginLeft: 10}} onPress={showOrderDetail}/>
                       {!isDemande &&  <AppButton title='Voir la facture'/>}
                    </View>

            </View>
                <View style={{justifyContent: 'flex-end', alignItems: 'center', margin: 20}}>
              {!isHistorique &&  <View >
                <TouchableOpacity onPress={moveItemToHistorique}>
                    <View style={{marginTop: 20}}>
                    <FontAwesome name='history' size={30}/>
                    </View>
                </TouchableOpacity>

                </View>}
                    {isHistorique &&  <View>
                        <TouchableOpacity>
                            <View>
                                <Entypo name='reply' size={30}/>
                            </View>
                        </TouchableOpacity>
                    <TouchableOpacity onPress={deleteItem}>
                        <View style={{marginTop: 30}}>
                            <AntDesign name='delete' color='red' size={25}/>
                        </View>
                    </TouchableOpacity>
                </View>}

                </View>
            </View>
    {!isDemande && <View style={{position: 'absolute', top: -30, right:-30}}>
        <ContratWatch loop={loopItemWatch} autoPlay={playItemWatch}/>
    </View>}
            {isDemande && <View style={{
                position: 'absolute',
                top: 20,
                right: 10
            }}>
                {statusAccordValue && statusAccordValue.toLowerCase() === 'accepté' && <ItemIconButton iconSize={40} iconName='like1'
                                                                                                       onPress={createOrderContrat} color='green'/>}
                {statusAccordValue && statusAccordValue.toLowerCase() === 'refusé' && <ItemIconButton iconName='dislike1'
                                                                                                      iconSize={40} color='red' />}
            </View>}
    </>
    );
}

const styles = StyleSheet.create({
    contentStyle: {
        marginLeft: 30
    },
    checkIconStyle: {
        width: 30,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height:30,
        margin: 10
    }
})

export default UserServiceItem;