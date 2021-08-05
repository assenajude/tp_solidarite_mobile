import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from "react-native";
import AppText from "../AppText";
import AppButton from "../AppButton";
import colors from "../../utilities/colors";
import { MaterialIcons,Entypo} from "@expo/vector-icons";
import ContratWatch from "./ContratWatch";
import ListItemHeader from "../list/ListItemHeader";
import FactureItemLabel from "../list/FactureItemLabel";
import StatusPicker from "./StatusPicker";
import dayjs from "dayjs";
import AppLabelWithValue from "../AppLabelWithValue";
import AppModePayement from "../AppModePayement";
import AppIconButton from "../AppIconButton";
import AppSmallButton from "../AppSmallButton";

function UserServiceItem({showDetail, dateFourniture,payement,serviceDescrip,
                            statusContratValue,accordStyle,iconContainerStyle,
                             dateDemande,itemImage, itemMontant,solde, headerValue,
                             contrats,createOrderContrat,accordValue,deleteItem,
                             isHistorique,moveItemToHistorique, isDemande,loopItemWatch, playItemWatch,
                             contratValueStyle, isContrat,changeLivraisonValue,
                             endFacture=true,changeAccordValue,accordInitdata, livraisonValue,livraisonStyle,livraisonData,
                             goToItemDetails,getDetails,getLink,dateFournitureFinal,serviceLabel


}) {
    return (
            <View style={styles.serviceContainer}>
                    <AppModePayement modePayement={payement}/>
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'center'
                }}>
                    <ListItemHeader headerTitle='S'/>
                    <AppText style={{fontWeight: 'bold', color:colors.or, fontSize: 20}}>{headerValue}</AppText>
                </View>
            <View style={{
                flexDirection: 'row',
            }}>

                <View style={{ marginRight: 20,justifyContent: 'center'}}>
                <Image resizeMode='stretch' source={{uri: itemImage}} style={{width: 80,height: 150}}/>
                </View>

                <View style={{
                    marginTop: 20,
                }}>
                    <View style={{alignSelf: 'flex-start'}}>
                    <AppText style={{fontWeight: 'bold', fontSize: 18}}>{serviceDescrip}</AppText>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <AppText style={{
                          fontWeight: 'bold',
                          fontSize: 15,
                          color: colors.rougeBordeau
                      }}>{itemMontant}</AppText>
                      <AppText>F CFA</AppText>
                    </View>
                       {!isDemande && <View style={{flexDirection: 'row'}}>
                            <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>{solde}</AppText>
                            <AppText>F CFA</AppText>
                            <AppText>soldé(s)</AppText>
                        </View>}
                        {!isContrat &&
                        <StatusPicker labelStatus='Accord' statusData={accordInitdata} statusValue={accordValue}
                                      changeStatusValue={changeAccordValue} otherStatusStyle={accordStyle}
                        />
                        }

                        {contrats && contrats.length>=1 &&
                        <StatusPicker labelStatus='Livraison' statusValue={livraisonValue} statusData={livraisonData}
                                      otherStatusStyle={livraisonStyle} changeStatusValue={changeLivraisonValue}/>
                        }

                        {!isDemande && <FactureItemLabel itemLabel='Contrat:' labelValue={statusContratValue}
                                                         labelStyle={{fontSize: 15, fontWeight: 'bold'}} labelValueStyle={contratValueStyle}/>}
                    <AppIconButton
                        onPress={getDetails}
                        buttonContainer={{
                            backgroundColor: colors.leger,
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            marginLeft: 20
                        }}
                        iconColor={colors.dark}
                        iconName={showDetail ?'caretup':'caretdown'}/>
            </View>
              {endFacture &&  <View style={[{
                    position: 'absolute',
                    top: 50,
                    right: 10,
                    justifyContent: "center",
                    alignItems: "center"
                },iconContainerStyle]}>
              {!isHistorique &&  <View >
                <TouchableOpacity onPress={moveItemToHistorique}>
                    <View style={{marginTop: 20}}>
                    <MaterialIcons name='history' size={24}/>
                    </View>
                </TouchableOpacity>

                </View>}
                   <View>
                       {isHistorique && <TouchableOpacity>
                            <View>
                                <Entypo name='reply' size={24}/>
                            </View>
                        </TouchableOpacity>}
                        <AppIconButton
                            onPress={deleteItem}
                            buttonContainer={styles.icon}
                            iconColor={colors.rougeBordeau}
                            iconName='delete'/>
                    </View>

                </View>}
            </View>

                <View>
                    {showDetail &&    <View style={{marginTop: 15}}>
                        <AppLabelWithValue label='Type service: ' labelValue={serviceLabel}/>
                        <AppLabelWithValue label='Demandé le: ' labelValue={dayjs(dateDemande).format('DD/MM/YYYY HH:mm:ss')}/>
                        <AppLabelWithValue label={dateFournitureFinal?'Fourni le: ':'Sera fourni le: '}
                                           labelValue={dateFournitureFinal?dayjs(dateFournitureFinal).format('DD/MM/YYYY HH:mm:ss'):dayjs(dateFourniture).format('DD/MM/YYYY HH:mm:ss')}/>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                alignItems: 'center'
                            }}>
                                <AppSmallButton
                                    onPress={goToItemDetails}
                                    title='Details'
                                    iconName='plus'/>
                            {!isDemande &&
                                <AppSmallButton
                                    iconName='back'
                                    width={150}
                                    onPress={getLink}
                                    title='Voir la facture'/>
                            }
                        </View>
                    </View>}
                </View>

    {!isDemande && <View style={{position: 'absolute', top: -30, right:-30}}>
        <ContratWatch loop={loopItemWatch} autoPlay={playItemWatch}/>
    </View>}
            {isDemande && <View style={{
                position: 'absolute',
                top: 20,
                right: 10
            }}>
                {accordValue && accordValue.toLowerCase() === 'accepté' &&
                    <AppIconButton
                        iconName='like1'
                        iconSize={40}
                        onPress={createOrderContrat}
                        iconColor={colors.vert}
                        buttonContainer={styles.accordIcon}/>
                }
                {accordValue && accordValue.toLowerCase() === 'refusé' &&
                    <AppIconButton
                        buttonContainer={styles.accordIcon}
                        iconName='dislike1' iconSize={40} iconColor={colors.rougeBordeau}/>
                }
            </View>}
            </View>
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
    },
    icon: {
        backgroundColor: colors.lightGrey,
        height: 40,
        width: 40,
        borderRadius: 20
    },
    accordIcon: {
        backgroundColor: colors.lightGrey,
        height: 60,
        width: 60,
        borderRadius: 30
    },
    serviceContainer:{
        backgroundColor: colors.blanc,
        marginTop: 20,
        paddingBottom: 5,
        borderBottomWidth: 0.2,
        padding: 10,
        width: '100%'
    }
})

export default UserServiceItem;