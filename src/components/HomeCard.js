import React, {useState}  from 'react';
import {Image, View, StyleSheet, TouchableWithoutFeedback} from "react-native";
import AppText from "./AppText";
import AppIconButton from "./AppIconButton";
import colors from "../utilities/colors";
import {getToggleFavorite} from "../store/slices/userFavoriteSlice";
import useAuth from "../hooks/useAuth";
import {useDispatch, useSelector} from "react-redux";
import useItemReductionPercent from "../hooks/useItemReductionPercent";
import AppSmallButton from "./AppSmallButton";
import AddToCartModal from "./shoppingCart/AddToCartModal";
import {getSelectedOptions} from "../store/slices/mainSlice";
import routes from "../navigation/routes";
import useAddToCart from "../hooks/useAddToCart";
import {useNavigation} from '@react-navigation/native'

function HomeCard({item, showCategorie=true, descripLineNumber=2,
                       getProductLink, productLength,
                      firstPrice, secondPrice, getProductDetails}) {
    const {formatPrice} = useAuth()
    const navigation = useNavigation()
    const {getReductionPercent} = useItemReductionPercent()
    const {addItemToCart} = useAddToCart()
    const dispatch = useDispatch()
    const articleFavorites = useSelector(state => state.entities.userFavorite.articleFavoris)
    const locationFavorites = useSelector(state => state.entities.userFavorite.locationFavoris)

    const [addToCartModalVisible, setAddToCartModalVisible] = useState(false)

    const getItemFavoriteTab = (type) => {
        if(type === 'article')return articleFavorites
        else return locationFavorites
    }

    const handleAddToCart = async () => {
        if(item.ProductOptions.length > 1) {
            dispatch(getSelectedOptions(item))
            navigation.navigate('AccueilNavigator',{screen: item.Categorie.typeCateg === 'article'?routes.ARTICLE_DETAIL : routes.LOCATION_DETAIL, params: item})
        }else {
            const result = await addItemToCart(item)
            if(!result) return;
            setAddToCartModalVisible(true)
        }
    }

    const imageSource = {uri:item.Categorie.typeCateg === 'article'? item.imagesArticle[0] : item.imagesLocation[0]}

    return (
        <>
        <View  style={styles.headerImageContainer}>
        <TouchableWithoutFeedback onPress={getProductDetails}>
        <View>
            <View style={styles.imageContainer}>
                <Image
                    resizeMode='contain'
                    style={styles.headerImage}
                    source={imageSource}/>
            </View>
            <View style={styles.imageSecondContainer}>
                <AppText lineNumber={1} style={{fontSize: 20}}>{item.Categorie.typeCateg === 'article'?item.designArticle : item.libelleLocation}</AppText>
                {!showCategorie && <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                <AppText
                    style={{fontWeight: 'bold', marginTop: -5, fontSize: 15}}>
                    {item.Categorie.typeCateg === 'article'?formatPrice(item.prixPromo) : formatPrice(item.coutPromo)}
                </AppText>
                    <AppText
                        style={{color: colors.leger, textDecorationLine: 'line-through', fontSize: 15}}>
                        {item.Categorie.typeCateg === 'article'?formatPrice(item.prixReel) : formatPrice(item.coutReel)}
                    </AppText>
                </View>}
                {showCategorie && <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <AppText style={{fontSize: 15, fontWeight: 'bold'}}>{formatPrice(firstPrice)}</AppText>
                    {firstPrice !== secondPrice && <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                    <AppText>-</AppText>
                    <AppText style={{fontWeight: 'bold', fontSize: 15}}>{formatPrice(secondPrice)}</AppText>
                    </View>}
                </View>}
                <AppText lineNumber={descripLineNumber} style={{fontSize: 15, marginTop: -5}}>{item.Categorie.typeCateg === 'article'?item.descripArticle : item.descripLocation}</AppText>
                {showCategorie && <View style={styles.libelleContainer}>
                    <AppText style={{fontSize: 15}}>({productLength})</AppText>
                    <AppText onPress={getProductLink} style={styles.libelle}>{item.Categorie.libelleCateg}</AppText>
                </View>}
            </View>
            {!showCategorie && <AppIconButton
                iconColor={colors.dark}
                iconSize={20}
                onPress={() => dispatch(getToggleFavorite(item))}
                buttonContainer={styles.favIcon}
                iconName={getItemFavoriteTab(item.Categorie.typeCateg).some(article => article.id === item.id)?'heart':'hearto'}
            />}
            {!showCategorie && getReductionPercent(item)>0 && <View style={{
                position: 'absolute',
                left: 5,
                top: 0
            }}>
                <AppText style={{
                    fontSize: 15,
                    color: colors.rougeBordeau
                }}>-{getReductionPercent(item)}%</AppText>
            </View>}
        </View>
        </TouchableWithoutFeedback>
           {!showCategorie && <View style={{
               alignItems: 'center'
           }}>
           <AppSmallButton
               onPress={handleAddToCart}
               iconName='shoppingcart'
               title='Ajouter au panier'
               width={200}
           />
           </View>}
        </View>
            <AddToCartModal
                cartTop={0}
                cartHeight={'100%'}
                designation={item?.Categorie?.typeCateg === 'article'?item.designArticle : item.libelleLocation}
                source={{uri: item?.Categorie?.typeCateg === 'article'?item.imagesArticle[0] : item.imagesLocation[0]}}
                goToShoppingCart={() => {
                    setAddToCartModalVisible(false)
                    navigation.navigate(routes.CART)
                }}
                goToHomeScreen={() => setAddToCartModalVisible(false)}
                itemModalVisible={addToCartModalVisible}/>
            </>
    );
}

const styles = StyleSheet.create({
    favIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        height: 30,
        width: 30,
        borderRadius: 15
    },
    headerImage: {
        height: 120,
        width: 150,
        overflow: 'hidden'
    },
    headerImageContainer: {
        marginHorizontal: 10,
        height: "auto",
        width: 240,
        backgroundColor: colors.leger,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    imageContainer: {
        width: 240,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.leger,
        borderTopLeftRadius:10,
        borderTopRightRadius: 10
    },
    imageSecondContainer: {
        height:'auto',
        width: 240,
        paddingBottom:10,
        alignItems: 'flex-start',
        backgroundColor: colors.blanc,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 5
    },
    libelle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: colors.bleuFbi
    },
    libelleContainer: {
        flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 10
    }
})
export default HomeCard;