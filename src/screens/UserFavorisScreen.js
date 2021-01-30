import React, {useEffect} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {getToggleFavorite, getUserFavoris} from "../store/slices/userFavoriteSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";

function UserFavorisScreen({navigation}) {
    const dispatch = useDispatch()

    const useFavorites = useSelector(state => {
        const formatedFav = []
        const articleFav = state.entities.userFavorite.articleFavoris
        const locationFav = state.entities.userFavorite.locationFavoris
        const allFav = [...articleFav, ...locationFav]
        allFav.forEach(fav => {
            const favImage =  fav.imagesArticle?fav.imagesArticle[0] : fav.imagesLocation[0]
            formatedFav.push({
                id: fav.id,
                libelle: fav.designArticle || fav.libelleLocation,
                image: favImage,
                prix: fav.prixPromo || fav.coutPromo,
                prixReel: fav.prixReel || fav.coutReel,
                type: fav.articles_favoris?'article':'location'
            })
        })
        return formatedFav
    })
    const favCompter = useSelector(state => state.entities.userFavorite.favoriteCompter)
    const loading = useSelector(state => state.entities.userFavorite.loading)


    const removefromFavorite = (item) => {
        dispatch(getToggleFavorite(item))
    }

    const handleOrderFav = (fav) => {
        if(fav.type === 'article') {
            navigation.navigate('AccueilNavigator', {screen: routes.ARTICLE_DETAIL, params: {...fav, designArticle: fav.libelle}})
        } else {
            navigation.navigate('AccueilNavigator', {screen: routes.LOCATION_DETAIL, params: {...fav, libelleLocation: fav.libelle}})
        }

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
                         <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}> {item.prix}</AppText>
                         <AppText> / </AppText>
                         <AppText style={{
                             textDecorationLine: 'line-through'
                         }}>{item.prixReel}</AppText>
                         <AppText> fcfa </AppText>
                     </View>
                     <AppButton style={{alignSelf: 'flex-end', margin: 10}} title='commander' onPress={() => handleOrderFav(item)}/>
                 </View>
                 }/>
    );
}

export default UserFavorisScreen;