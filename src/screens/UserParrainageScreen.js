import React from 'react';
import {View, StyleSheet, ScrollView} from "react-native";
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
        <ScrollView contentContainerStyle={{
            alignItems: 'center',
            paddingVertical: 30
        }}>
            <View style={styles.fundContainer}>
                <AppText style={{fontWeight: 'bold'}}>Total investissement</AppText>
                <View style={styles.fundContent}>
                    <AppText style={{fontSize: 20, fontWeight: 'bold'}}>{formatPrice(getInvestissement())}</AppText>
                </View>
            </View>
            <View style={styles.fundContainer}>
                <AppText style={{fontWeight: 'bold'}}>Total remboursé</AppText>
                <View style={styles.fundContent}>
                    <AppText style={{fontSize: 20, fontWeight: 'bold'}}>{formatPrice(getRestituteInvest().restituteQuotite)}</AppText>
                </View>
            </View>
            <View style={styles.fundContainer}>
                <AppText style={{fontWeight: 'bold'}}>Total gain</AppText>
                <View style={styles.fundContent}>
                    <AppText style={{fontSize: 15, fontWeight: 'bold', color: colors.vert}}>{formatPrice(getRestituteInvest().actuGain)} / {formatPrice(getTotalGain())}</AppText>
                </View>
            </View>
            <View>
                {userActiveParrainage.map((parrain) =>
                    <ParrainageEncoursItem
                       key={parrain.id.toString()}
                        ownerUserAvatar={parrain.User.avatar}
                       avatarUrl={{uri:parrain.User.avatar}}
                       ownerUsername={parrain.User.username}
                       ownerEmail={parrain.User.email}
                       sponsorDetails={parrain.sponsorDetails}
                       getUserProfile={() => navigation.navigate(routes.COMPTE, parrain.User)}
                       openSponsorDetails={() => dispatch(getSponsorDetails(parrain))}
                       parrainageOrders={getUserParrainageOrders(parrain)}
                       getParrainOrderDetails={(order) => handleGetOrderDetails(order) }
                       orderProgress={getLastCompteFactureProgress(parrain)>0?getLastCompteFactureProgress(parrain): 0}
                       showProgress={getLastCompteFactureProgress(parrain)?getLastCompteFactureProgress(parrain)>0:false}
                    />)}
            </View>
            {/*<FlatList
                data={userActiveParrainage} keyExtractor={item => item.id.toString()}
                renderItem={({item}) =>
                    <ParrainageEncoursItem
                        ownerUserAvatar={item.User.avatar} avatarUrl={{uri:item.User.avatar}}
                        ownerUsername={item.User.username} ownerEmail={item.User.email}
                        sponsorDetails={item.sponsorDetails}
                        getUserProfile={() => navigation.navigate(routes.COMPTE, item.User)}
                        openSponsorDetails={() => dispatch(getSponsorDetails(item))}
                        parrainageOrders={getUserParrainageOrders(item)}
                        getParrainOrderDetails={(order) => handleGetOrderDetails(order) }
                        orderProgress={getLastCompteFactureProgress(item)>0?getLastCompteFactureProgress(item): 0}
                        showProgress={getLastCompteFactureProgress(item)?getLastCompteFactureProgress(item)>0:false}/> } />*/}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fundContainer: {
        backgroundColor: colors.leger,
        width: '90%',
        height: 150,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    fundContent: {
        backgroundColor: colors.blanc,
        height: 100,
        width: '85%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    }

})
export default UserParrainageScreen;