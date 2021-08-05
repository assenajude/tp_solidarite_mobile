import React, {useState} from 'react';
import {View, FlatList} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector} from "react-redux";
import ListFooter from "../components/list/ListFooter";
import routes from "../navigation/routes";
import useAddToCart from "../hooks/useAddToCart";
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getItemDeleted, getSelectedOptions} from "../store/slices/mainSlice";
import {getToggleFavorite} from "../store/slices/userFavoriteSlice";
import useItemReductionPercent from "../hooks/useItemReductionPercent";
import useAuth from "../hooks/useAuth";
import AppCardNew from "../components/AppCardNew";

function EcommerceScreen({navigation}) {
    const dispatch = useDispatch()
    const {addItemToCart} = useAddToCart()
    const {userRoleAdmin} = useAuth()
    const {getReductionPercent} = useItemReductionPercent()
    const articles = useSelector(state => state.entities.article.searchList)
    const loading = useSelector(state => state.entities.article.loading)
    const cartLoading = useSelector(state => state.entities.shoppingCart.loading)
    const userFavorites = useSelector(state => state.entities.userFavorite.articleFavoris)
    const [showItemModal, setShowItemModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    const handleAddToCart = async (item) => {
        if(item.ProductOptions.length >= 1) {
            dispatch(getSelectedOptions(item))
            navigation.navigate('AccueilNavigator', {screen: routes.ARTICLE_DETAIL, params: item})
        } else {
            const result = await addItemToCart(item)
            if(!result) return;
            setSelectedItem(item)
            setShowItemModal(true)
        }
    }

    if (!loading && articles.length === 0) {
        return(
            <>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <AppText>Aucune donnée trouvée</AppText>
                </View>
                {userRoleAdmin() && <ListFooter onPress={() => navigation.navigate(routes.NEW_ARTICLE)} otherStyle={{alignSelf: 'flex-end', margin: 60}}/>}
            </>
            )

    }

    if (showItemModal) {
        return (
            <AddToCartModal
                source={{uri: selectedItem.imagesArticle[0]}}
                designation={selectedItem.designArticle}
                itemModalVisible={showItemModal}
                goToHomeScreen={() => setShowItemModal(false)}
                goToShoppingCart={() => {
                    setShowItemModal(false)
                navigation.navigate(routes.CART)
            }}/>
        )
    }

    return (
        <>
            <AppActivityIndicator visible={loading || cartLoading}/>

        <FlatList
            data={articles} keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) =>
                <AppCardNew
                    deleteItem={() => dispatch(getItemDeleted(item))}
                    titleLabel='Prix: '
                    description={item.designArticle}
                    isFavorite={userFavorites.some(fav => fav.id === item.id)}
                    toggleFavorite={() => dispatch(getToggleFavorite(item))}
                    secondTitle={item.prixReel}
                    firstTitle={item.prixPromo}
                    aideInfo={item.aide}
                    itemReductionPercent={getReductionPercent(item)}
                    notInStock={item.qteStock === 0}
                    source={{uri: item.imagesArticle[0]}}
                    addToCart={() => handleAddToCart(item)}
                    viewDetails={() => {
                        dispatch(getSelectedOptions(item))
                        navigation.navigate('AccueilNavigator', {screen: routes.ARTICLE_DETAIL, params: item})
                    }}/>
                  }/>
                 {userRoleAdmin() && <View style={{position: 'absolute', bottom:10, right: 10}}>
                  <ListFooter onPress={() => navigation.navigate(routes.NEW_ARTICLE)}/>
                  </View>}
            </>
           );

}

export default EcommerceScreen;