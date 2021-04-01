import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet} from "react-native";
import useOrderInfos from "../hooks/useOrderInfos";
import AppModePayement from "../components/AppModePayement";
import AppLottieViewAnim from "../components/AppLottieViewAnim";
import AppDetailCarousel from "../components/AppDetailCarousel";
import AppLabelWithValue from "../components/AppLabelWithValue";
import dayjs from "dayjs";
import StatusPicker from "../components/order/StatusPicker";
import initData from "../utilities/initData";
import useManageUserOrder from "../hooks/useManageUserOrder";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import {useSelector} from "react-redux";
import Avatar from "../components/user/Avatar";
import routes from "../navigation/routes";
import ParrainageHeader from "../components/parrainage/ParrainageHeader";
import useAuth from "../hooks/useAuth";
import useParrainage from "../hooks/useParrainage";

function OrderDetailsScreen({route, navigation}) {

    const {formatPrice} = useAuth()
    const {getParrainagePercent} = useParrainage()
    const comptesParrainage = useSelector(state => state.entities.parrainage.list)
    const commande = useSelector(state => {
        const userListOrder = state.entities.order.currentUserOrders
        const selectedOrder = userListOrder.find(order => {
            if(order.id === route.params.id || order.numero === route.params.numero) return true
        })
        return selectedOrder
    })

    const itemContratStatus = commande.Contrats[0]?commande.Contrats[0].status:'Pas de contrats'
    const {getModePayement,getPointRelais} = useOrderInfos()
    const {saveAccordEdit, saveLivraisonEdit} = useManageUserOrder()
    const [orderRelais, setOrderRelais] = useState()

   const handleChangeAccord = (value) => {
        const accordData = {
            orderId: commande.id,
            statusAccord: value
        }
        saveAccordEdit(accordData)
    }

    const handleChangeLivraison = (value) => {
        const data = {
            orderId: commande.id,
            statusLivraison: value
        }
        saveLivraisonEdit(data)
    }

    useEffect(() => {
          if(commande.typeCmde === 'article') {
              setOrderRelais(getPointRelais(commande.id))
          }
    }, [])
    return (
        <ScrollView>
            <View style={styles.container}>

                    <AppModePayement modePayement={getModePayement(commande.id)}/>
                    <AppLottieViewAnim lottieSource={require('../assets/animations/data_watch')} lottieStyle={{width: 150, top: -25}}
                                       lottieAutoPlay={itemContratStatus.toLowerCase() === 'en cours'} lottieLoop={itemContratStatus.toLowerCase() === 'en cours'}/>
                    <View style={{
                        marginTop: 30,
                        marginBottom: 10
                    }}>
                     <AppDetailCarousel carouselItems={commande.CartItems} typeFacture={commande.typeCmde === 'e-commerce'?'Commade ':''} detailLabel='Commande n°: ' labelValue={commande.numero}/>

                    </View>
                    <View style={styles.contentStyle}>
                        <View>
                            <Avatar ownerUserAvatar={commande.User.avatar} avatarUrl={{uri: commande.User.avatar}}
                                onPress={() => navigation.navigate(routes.COMPTE,commande.User)}/>
                                <AppText>{commande.User.username}</AppText>
                        </View>
                       <View style={{marginLeft: 50}}>
                           <AppLabelWithValue label='Total montant: ' labelValue={commande.montant} secondLabel='fcfa'/>
                           <AppLabelWithValue label='Total payé: ' labelValue={commande.Facture?commande.Facture.solde:0} secondLabel='fcfa'/>
                       </View>
                    </View>
                    <View style={{borderWidth: 1}}>
                        <View style={{
                            backgroundColor: colors.rougeBordeau,
                            margin: 5
                        }}>
                            <AppText style={{color: colors.blanc}}>Dans la commande</AppText>
                        </View>
                        <View>
                            {commande.CartItems.map((orderItem, index) =>
                                <AppLabelWithValue key={index.toString()}
                                                   label={orderItem.OrderItem.quantite?orderItem.OrderItem.quantite:0}
                                                   labelValue={orderItem.OrderItem.libelle}
                                                   secondLabel={orderItem.OrderItem.montant?orderItem.OrderItem.montant:0}
                                                   secondLabelValue='fcfa'/>)}
                        </View>
                        <AppLabelWithValue label='Frais de livraison: ' labelValue={commande.fraisTransport} secondLabel='fcfa'/>
                        <AppLabelWithValue label="Taux d'interet: " labelValue={commande.interet} secondLabel='fcfa'/>
                    </View>
                {commande.CompteParrainages.length>0 && <View style={{padding: 5, borderWidth: 1, marginTop: 10}}>
                    <View style={{backgroundColor: colors.rougeBordeau}}>
                        <AppText style={{color: colors.blanc}}>Infos parrainage</AppText>
                    </View>
                    {commande.CompteParrainages.map((cpt) =><View key={cpt.id.toString()} style={styles.compteParrainStyle}>
                        <ParrainageHeader ownerUsername={comptesParrainage.find(cptpar => cptpar.id === cpt.id)?.User.username}
                                          ownerUserAvatar={comptesParrainage.find(cptpar => cptpar.id === cpt.id)?.User.avatar}
                                          avatarUrl={{uri: comptesParrainage.find(cptpar => cptpar.id === cpt.id)?.User.avatar}}
                                          ownerEmail={comptesParrainage.find(cptpar => cptpar.id === cpt.id)?.User.email}/>
                        <AppText style={{fontWeight: 'bold'}}>{formatPrice(cpt.OrderParrain.action)} ({getParrainagePercent((commande.montant-commande.interet), cpt.OrderParrain.action)} %)</AppText>
                    </View>)}
                </View>}
                    <View style={{marginTop: 20}}>
                        <AppLabelWithValue label="Commandé le: " labelValue={dayjs(commande.dateCmde).format('DD/MM/YYYY HH:mm:ss')}/>
                        <AppLabelWithValue label={commande.dateLivraisonFinal?'Livré le: ':'Sera livré le: '} labelValue={commande.dateLivraisonFinal?dayjs(commande.dateLivraisonFinal).format('DD/MM/YYYY HH:mm:ss'):dayjs(commande.dateLivraisonDepart).format('DD/MM/YYYY HH:mm:ss')}/>
                        {commande.UserAdresse && <AppLabelWithValue label='Contact livraison: ' labelValue={commande.UserAdresse.nom} secondLabel='Tel: ' secondLabelValue={commande.UserAdresse.tel} />}
                        {orderRelais && <AppLabelWithValue label='Point relais' labelValue={orderRelais.nom} secondLabel='Tel: ' secondLabelValue={orderRelais.contact}/>}
                        <StatusPicker labelStatus='Accord'  statusValue={commande.statusAccord} statusData={initData.accordData}
                                      changeStatusValue={handleChangeAccord}/>
                        <StatusPicker labelStatus='Livraison' statusValue={commande.statusLivraison} statusData={initData.livraisonData}
                                      changeStatusValue={handleChangeLivraison}/>
                        <AppLabelWithValue label='Contrat:' labelValue={commande.Contrats.length>=1?commande.Contrats[0].status: 'Pas de contrats'}/>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            margin: 20
                        }}>
                            <AppButton title='retour' onPress={() => navigation.goBack()}/>
                           {commande.Contrats.length>=1 && <AppButton title='consulter la facture'/>}
                        </View>
                    </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        paddingBottom: 20,
    },
    avatarStyle: {
        margin: 10,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    contentStyle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    compteParrainStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10
    }
})
export default OrderDetailsScreen;