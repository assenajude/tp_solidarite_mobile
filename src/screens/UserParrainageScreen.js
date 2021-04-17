import React, {useState, useEffect} from 'react';
import {FlatList, View, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ParrainageEncoursItem from "../components/parrainage/ParrainageEncoursItem";
import {getOrderParrainDetails, getSponsorDetails} from "../store/slices/parrainageSlice";
import routes from "../navigation/routes";
import useOrderInfos from "../hooks/useOrderInfos";
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import useAuth from "../hooks/useAuth";
import useParrainage from "../hooks/useParrainage";

function UserParrainageScreen({navigation}) {
    const {getLastCompteFactureProgress, getUserParrainageOrders} = useOrderInfos()
    const {formatPrice} = useAuth()
    const {getInvestissement, getTotalGain, getRestituteInvest} = useParrainage()
    const dispatch = useDispatch()

    const userActiveParrainage = useSelector(state => {
        const filleuls = state.entities.parrainage.userFilleuls
        const inSponsoringComptes = state.entities.parrainage.inSponsoringState
        const activeParrainage = filleuls.filter(compte => inSponsoringComptes.some(item => item.id === compte.UserId))
        return activeParrainage
    })

    const handleGetOrderDetails = (order) => {
        dispatch(getOrderParrainDetails(order))
    }


    useEffect(() => {
    }, [])


    if(userActiveParrainage.length === 0){
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Aucun parrainage trouvé</AppText>
        </View>
    }

    return (
        <>
                <View style={{backgroundColor: colors.rougeBordeau, alignSelf: 'center', marginTop: 20}}>
                    <AppText style={{color: colors.blanc}}>Mon portefeuille</AppText>
                </View>
            <View style={{borderWidth: 1, padding: 10}}>
                <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%', marginTop: 20}}>
                    <View>
                        <AppText>{Number(getRestituteInvest().restituteQuotite)} / {formatPrice(getInvestissement())}</AppText>
                    </View>
                    <View style={{backgroundColor: colors.bleuFbi, marginTop: 30}}>
                        <AppText style={{color: colors.blanc}}>Investissement</AppText>
                    </View>
                </View>
                    <View style={{borderWidth: 1, marginLeft: 5, marginRight: 5, marginBottom: 30}}>

                    </View>
                <View style={{width: '50%', marginTop: 20}}>
                    <AppText>{getRestituteInvest().actuGain} / {formatPrice(getTotalGain())}</AppText>
                    <View style={{backgroundColor: colors.bleuFbi, marginTop: 30}}>
                        <AppText style={{color: colors.blanc}}>Bénéfice</AppText>
                    </View>
                </View>
                </View>
            </View>
            <FlatList data={userActiveParrainage} keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => <ParrainageEncoursItem ownerUserAvatar={item.User.avatar} avatarUrl={{uri:item.User.avatar}}
                                                                     ownerUsername={item.User.username} ownerEmail={item.User.email}
                                                                     sponsorDetails={item.sponsorDetails}
                                                                     getUserProfile={() => navigation.navigate(routes.COMPTE, item.User)}
                                                                     openSponsorDetails={() => dispatch(getSponsorDetails(item))}
                                                                     parrainageOrders={getUserParrainageOrders(item)}
                                                                     getParrainOrderDetails={(order) => handleGetOrderDetails(order) }
                                                                     orderProgress={getLastCompteFactureProgress(item)>0?getLastCompteFactureProgress(item): 0}
                                                                     showProgress={getLastCompteFactureProgress(item)?getLastCompteFactureProgress(item)>0:false}/> } />
        </>
    );
}

const styles = StyleSheet.create({

})
export default UserParrainageScreen;