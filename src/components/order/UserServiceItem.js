import React from 'react';
import {View, ScrollView, StyleSheet, Image, TouchableOpacity} from "react-native";
import AppText from "../AppText";
import AppButton from "../AppButton";
import colors from "../../utilities/colors";
import {AntDesign, FontAwesome,Entypo} from "@expo/vector-icons";
import EditItemStatus from "./EditItemStatus";
import ItemIconButton from "../list/ItemIconButton";
import ContratWatch from "./ContratWatch";

function UserServiceItem({serviceDescrip,showOrderDetail,showDetail, dateFourniture,payement,
                            libStatusContrat,statusContratValue, statusAccordValue,editStatusAccord,
                             dateDemande, itemIndex, itemImage, itemMontant, header, headerValue,
                             contrats,accordValueStyle,changeAccordEditValue,accordEditValue,
                             saveAccording,startEditingAccord,undoAccordEditing,createOrderContrat,
                             isHistorique,moveItemToHistorique, isDemande,loopItemWatch, playItemWatch,
                             saveContratEdit,statusContratStyle,editContratStatus,changeEditingContrat,
                             editingValue,undoContratEdit,getContratEdit

}) {
    return (
        <ScrollView>
            <View style={{flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                backgroundColor: colors.blanc, marginTop: 20, paddingBottom: 5,
                borderBottomWidth: 0.2}}>
                <View>
                <View style={{ width: 100}}>
                <Image resizeMode='stretch' source={{uri: itemImage}} style={{width: 80, padding: 5,height: 150}}/>

                </View>
                </View>
                <View style={styles.contentStyle}>
                <View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <AppText style={{fontWeight: 'bold'}}>{header}</AppText>
                        <AppText style={{fontWeight: 'bold', color:colors.or}}>{headerValue}</AppText>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <AppText style={{fontSize: 18, fontWeight: 'bold'}}>Service: </AppText>
                      <AppText>{serviceDescrip}</AppText>
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
                        <AppText style={{fontSize: 18, fontWeight: 'bold'}}>Reglement: </AppText>
                        <AppText style={{fontWeight: 'bold'}}>{payement}</AppText>
                    </View>
                    <EditItemStatus statusValueStyle={accordValueStyle}  labelStatus='Status accord' statusValue={statusAccordValue} editStatus={editStatusAccord}
                                    saveEditing={saveAccording} getStatusEditing={startEditingAccord} undoEditing={undoAccordEditing}
                                    editingStatusValue={accordEditValue} changeEditingStatusValue={changeAccordEditValue}/>
                   {!isDemande &&

                   <EditItemStatus labelStatus={libStatusContrat}statusValue={statusContratValue}
                                   statusValueStyle={statusContratStyle} editStatus={editContratStatus}
                                   changeEditingStatusValue={changeEditingContrat} editingStatusValue={editingValue} undoEditing={undoContratEdit}
                                   getStatusEditing={getContratEdit} saveEditing={saveContratEdit}/>
                   }
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
            </View>
                <View style={{alignItems: 'center'}}>
                   {isDemande && <View>
                        {statusAccordValue && statusAccordValue.toLowerCase() === 'accepté' && <ItemIconButton iconSize={40} iconName='like1'
                                   onPress={createOrderContrat} color='green'/>}
                        {statusAccordValue && statusAccordValue.toLowerCase() === 'refusé' && <ItemIconButton iconName='dislike1'
                                   iconSize={40} color='red' />}
                    </View>}
                    {!isDemande && <ContratWatch loop={loopItemWatch} autoPlay={playItemWatch}/>}
                    <View style={{
                        alignItems: 'center'
                    }}>
              {!isHistorique &&  <View >
                <TouchableOpacity onPress={moveItemToHistorique}>
                    <View style={{marginTop: 20}}>
                    <FontAwesome name='history' size={30}/>
                    </View>
                </TouchableOpacity>

                </View>}
                    <TouchableOpacity>
                        <View style={{marginTop: 20}}>
                            <AntDesign name='delete' color='red' size={25}/>
                        </View>
                    </TouchableOpacity>
                    </View>
              {isHistorique &&  <View>
                    <TouchableOpacity>
                        <View style={{marginTop: 10}}>
                            <Entypo name='reply' size={30}/>
                        </View>
                    </TouchableOpacity>
                </View>}

                </View>
            </View>
        </ScrollView>
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