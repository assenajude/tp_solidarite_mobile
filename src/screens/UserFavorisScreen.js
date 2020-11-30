import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {getToggleFavorite, getUserFavoris} from "../store/slices/userFavoriteSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";

function UserFavorisScreen(props) {
    const dispatch = useDispatch()

    const useFavorites = useSelector(state => state.entities.userFavorite.list)
    const favCompter = useSelector(state => state.entities.userFavorite.favoriteCompter)
    const loading = useSelector(state => state.entities.userFavorite.loading)


    const removefromFavorite = (item) => {
        dispatch(getToggleFavorite(item))
    }

    useEffect(() => {
        if(favCompter > 0) {
            dispatch(getUserFavoris())
        }
    }, [])

    if(!loading && useFavorites.length === 0) {
        return <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <AppText>Vous n'avez aucun favoris...</AppText>
        </View>
    }

    if(loading) {
        return <AppActivityIndicator visible={loading}/>
    }

    return (
        <FlatList data={useFavorites} keyExtractor={(item, index) => index.toString()}
                 renderItem={({item}) => <View style={{margin: 10, backgroundColor: colors.blanc}}>
                     <View style={{
                         overflow: 'hidden'
                     }}>
                         <View style={{
                             alignSelf: 'flex-end',
                             margin: 10,
                         }}>
                         <TouchableOpacity onPress={() => removefromFavorite(item)}>
                              <MaterialCommunityIcons name='heart' size={30}/>
                         </TouchableOpacity>
                         </View>
                     <Image source={{uri: item.image}} style={{width: '100%', height: 200}}/>
                         <AppText style={{fontWeight: 'bold'}}>{item.libelle}</AppText>
                     </View>
                     <View style={{
                         flexDirection: 'row'
                     }}>
                         <AppText style={{fontWeight: 'bold'}}>Prix: </AppText>
                         <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}> {item.prixPromo}</AppText>
                         <AppText> / </AppText>
                         <AppText style={{
                             textDecorationLine: 'line-through'
                         }}>{item.prixReel}</AppText>
                         <AppText> fcfa </AppText>
                     </View>
                 </View>
                 }/>
    );
}

export default UserFavorisScreen;