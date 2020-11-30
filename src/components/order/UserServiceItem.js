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
import StatusPicker from "./StatusPicker";
import dayjs from "dayjs";
import AppLabelWithValue from "../AppLabelWithValue";

function UserServiceItem({showDetail, dateFourniture,payement,
                            statusContratValue,accordStyle,iconContainerStyle,
                             dateDemande,itemImage, itemMontant, header, headerValue,
                             contrats,createOrderContrat,accordLabel,accordValue,
                             isHistorique,moveItemToHistorique, isDemande,loopItemWatch, playItemWatch,
                             contratValueStyle,deleteItem, isContrat,changeLivraisonValue,
                             endFacture=true,changeAccordValue,accordInitdata,
                             livraisonLabel,livraisonValue,livraisonStyle,livraisonData,
                             goToItemDetails,getDetails,getLink,dateFournitureFinal,serviceLabel


}) {
    return (
        <TouchableOpacity onPress={goToItemDetails}>
            <View>
            <View style={{flexDirection: 'row',
                justifyContent: 'flex-start',
                padding: 10,
                width: '100%',
                backgroundColor: colors.blanc, marginTop: 10, paddingBottom: 5,
                borderBottomWidth: 0.2}}>

                <View style={{ marginRight: 20,justifyContent: 'center'}}>
                <Image resizeMode='stretch' source={{uri: itemImage}} style={{width: 80,height: 150}}/>
                </View>

                <View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <ListItemHeader headerTitle={header}/>
                        <AppText style={{fontWeight: 'bold', color:colors.or, fontSize: 20}}>{headerValue}</AppText>
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
                    {!isContrat &&
                        <StatusPicker labelStatus={accordLabel} statusData={accordInitdata} statusValue={accordValue}
                                      changeStatusValue={changeAccordValue} otherStatusStyle={accordStyle}
                        />
                    }

                    {contrats && contrats.length>=1 &&
                        <StatusPicker labelStatus={livraisonLabel} statusValue={livraisonValue} statusData={livraisonData}
                                      otherStatusStyle={livraisonStyle} changeStatusValue={changeLivraisonValue}/>
                    }

                                    {!isDemande && <FactureItemLabel itemLabel='Status contrat' labelValue={statusContratValue}
                                     labelStyle={{fontSize: 15, fontWeight: 'bold'}} labelValueStyle={contratValueStyle}/>}
                   {showDetail &&    <View style={{borderWidth: 1, marginTop: 15}}>
                       <AppLabelWithValue label='Type service: ' labelValue={serviceLabel}/>
                       <AppLabelWithValue label='Demandé le: ' labelValue={dayjs(dateDemande).format('DD/MM/YYYY HH:mm:ss')}/>
                       <AppLabelWithValue label={dateFournitureFinal?'Fourni le: ':'Sera fourni le: '}
                                       labelValue={dateFournitureFinal?dayjs(dateFournitureFinal).format('DD/MM/YYYY HH:mm:ss'):dayjs(dateFourniture).format('DD/MM/YYYY HH:mm:ss')}/>

                    </View>}
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 20,
                        marginBottom: 15
                    }}>
                        <AppButton iconName={showDetail ?'caretup':'caretdown'} iconColor={colors.blanc} style={{width: 'auto'}} textStyle={{marginLeft: 5}} title={showDetail ?'Fermer':'Deplier'} onPress={getDetails}/>
                        <AppButton iconName='plus' iconColor={colors.blanc} style={{width: 'auto', marginLeft: 20 }} textStyle={{marginLeft: 5}} title='Details' onPress={goToItemDetails}/>
                        {!isDemande &&  <AppButton style={{marginLeft: 20}} title='Voir la facture' onPress={getLink}/>}
                    </View>

            </View>
                <View style={[{
                    position: 'absolute',
                    top: 100,
                    right: 20,
                    justifyContent: "center",
                    alignItems: "center"
                },iconContainerStyle]}>
              {!isHistorique &&  <View >
                <TouchableOpacity onPress={moveItemToHistorique}>
                    <View style={{marginTop: 20}}>
                    <FontAwesome name='history' size={24}/>
                    </View>
                </TouchableOpacity>

                </View>}
                   <View>
                       {isHistorique && <TouchableOpacity>
                            <View>
                                <Entypo name='reply' size={24}/>
                            </View>
                        </TouchableOpacity>}
                        <ItemIconButton otherStyle={{marginTop: 10}} iconName='delete' iconSize={24} color='red'/>
                    </View>

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
                {accordValue && accordValue.toLowerCase() === 'accepté' && <ItemIconButton iconSize={40} iconName='like1'
                                                                                                       onPress={createOrderContrat} color='green'/>}
                {accordValue && accordValue.toLowerCase() === 'refusé' && <ItemIconButton iconName='dislike1'
                                                                                                      iconSize={40} color='red' />}
            </View>}
            </View>
    </TouchableOpacity>
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