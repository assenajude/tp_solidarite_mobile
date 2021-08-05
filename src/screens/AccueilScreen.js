import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {View, StyleSheet, TextInput, ScrollView} from "react-native";
import AppInfo from "../components/AppInfo";
import routes from '../navigation/routes';
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import useAddToCart from "../hooks/useAddToCart";
import {getItemDeleted, getSelectedOptions} from "../store/slices/mainSlice";
import AppActivityIndicator from "../components/AppActivityIndicator";
import {getToggleFavorite} from "../store/slices/userFavoriteSlice";
import useItemReductionPercent from "../hooks/useItemReductionPercent";
import AppCardNew from "../components/AppCardNew";
import OrderHelpModal from "../components/OrderHelpModal";
import useAuth from "../hooks/useAuth";
import colors from "../utilities/colors";
import AppText from "../components/AppText";
import AppIconButton from "../components/AppIconButton";
import Avatar from "../components/user/Avatar";
import CartIconRight from "../components/shoppingCart/CartIconRight";
import AppInput from "../components/AppInput";

function AccueilScreen({navigation, route}) {
    const selectedProduct = route.params
    const dispatch = useDispatch();
    const {dataSorter} = useAuth()
    const {getReductionPercent} = useItemReductionPercent()
    const {addItemToCart} = useAddToCart()

    const user = useSelector(state => state.auth.user)
    const cartItemLenght = useSelector(state => state.entities.shoppingCart.itemsLenght)
    const isLoading = useSelector(state => state.entities.main.loading)
    const allProducts = useSelector(state => state.entities.main.list)
    const articleFavorites = useSelector(state => state.entities.userFavorite.articleFavoris)
    const locationFavorites = useSelector(state => state.entities.userFavorite.locationFavoris)
    const cartLoading = useSelector(state => state.entities.shoppingCart.loading)
    const [helpModalVisible, setHelpModalVisible] = useState(false)
    const [selectedSource, setSelectedSource] = useState(null)
    const [showAddToCardModal, setShowAddToCardModal] = useState(false)
    const [currentAdded, setCurrentAdded] = useState({})
    const [mainDatas, setMainDatas] = useState(allProducts)
    const [originalData, setOriginalData] = useState([])
    const [searchLabel, setSearchLabel] = useState('')
    const [searching, setSearching] = useState(false)
    const [showHeader, setShowHeader] = useState(true)



    const productFavorites = (productType) => {
        if(productType === 'article') return articleFavorites
        else return locationFavorites
    }

    const handleAddToCard =  async (item) => {
        if(item.ProductOptions.length > 1) {
            dispatch(getSelectedOptions(item))
            navigation.navigate('AccueilNavigator',{screen: item.Categorie.typeCateg === 'article'?routes.ARTICLE_DETAIL : routes.LOCATION_DETAIL, params: item})
        }else {
            const result = await addItemToCart(item)
            if(!result) return;
            setCurrentAdded(item)
            setShowAddToCardModal(true)
        }
    }

    const getCurrentProducts = () => {
        if(selectedProduct.all) {
            setMainDatas(allProducts)
        }else if(selectedProduct.products) {
            setMainDatas(selectedProduct.products)
        } else {
        const selectedList = allProducts.filter(product => product.CategorieId === selectedProduct.CategorieId)
            setMainDatas(dataSorter(selectedList))
        }
    }

    const startingSearch = () => {
        const searchTerme = searchLabel
        const currentList = mainDatas
        if(searchTerme.length === 0) {
            setMainDatas(originalData)
        } else {
            const filteredList = currentList.filter(product =>  {
                const designation = product.Categorie.typeCateg === 'article'?product.designArticle:product.libelleLocation
                const description = product.Categorie.typeCateg === 'article'?product.descripArticle:product.descripLocation
                const designAndDescrip = designation+' '+description
                const expression = searchTerme.toLowerCase()
                const searchResult = designAndDescrip.toLowerCase().search(expression)
                if(searchResult !== -1) return true
            })
            setMainDatas(filteredList)
        }
    }

    const handleScrolling = (nativeEvent) => {
        const position = nativeEvent.contentOffset
        if(position.x === 0 && position.y === 0) {
            setShowHeader(true)
        }else{
            setShowHeader(false)
        }
    }

    useEffect(() => {
        if(searching) {
            startingSearch()
        }
        const unsubscribe = navigation.addListener('focus', () => {
            if(selectedProduct) {
                getCurrentProducts()
                setOriginalData(mainDatas)
            }
        })
        return unsubscribe
    }, [searchLabel])

    return (
        <>
            <AppActivityIndicator visible={isLoading || cartLoading}/>
            <View style={styles.cartAndAvatar}>
                <View>
                    <Avatar
                        showNottif={true}
                        onPress={() => navigation.openDrawer()}
                        avatarUrl={{uri: user.avatar}}
                        ownerUserAvatar={user.avatar}/>
                </View>
                {!showHeader && searching &&
                <TextInput
                    value={searchLabel}
                    onChangeText={text => setSearchLabel(text)}
                    onBlur={() => setSearching(false)}
                    placeholder='chercher ici...'
                    autoFocus={true}
                    style={styles.searchInput}/>
                }
                {!showHeader && !searching && <AppIconButton
                    onPress={() => setSearching(true)}
                    buttonContainer={{
                        backgroundColor: colors.rougeBordeau,
                        marginHorizontal: 20
                    }}
                    iconName='search1'/>}
                <CartIconRight
                    cartLenght={cartItemLenght}
                    getToCartScreen={() => navigation.navigate(routes.CART)}/>
            </View>
            <ScrollView onScroll={event => handleScrolling(event.nativeEvent)}>
            <View style={styles.header}>
                <View style={{
                   alignItems: 'center'
                }}>
                <AppText style={{color: colors.blanc, fontSize: 24}}>{selectedProduct?.headerTitle}</AppText>
                {!searching && <AppIconButton
                    onPress={() => setSearching(true)}
                    buttonContainer={{
                        backgroundColor: colors.rougeBordeau,
                        alignSelf: 'flex-end',
                        marginHorizontal: 20
                    }}
                    iconName='search1'/>}
                    {searching && <AppInput otherStyle={{
                        height: 35,
                        width: 250,
                    }}
                        onBlur={() => setSearching(false)}
                        inputContainerStyle={{
                        marginVertical: 20,
                            width: 300
                    }}
                        autoFocus={true}
                        iconName='search1'
                        value={searchLabel}
                        onChangeText={value => setSearchLabel(value)}/>}
                </View>
            </View>
            {!isLoading  && mainDatas.length === 0 &&
            <AppInfo>
                <AppText>Aucun produit trouvé.</AppText>
            </AppInfo>}
                {mainDatas.length>0 && <View>
                    {mainDatas.map((item, index) =>
                        <AppCardNew
                            itemType={item.Categorie.typeCateg}
                            key={index.toString()}
                        showHelpInfo={() => {
                            setSelectedSource(item.Categorie.typeCateg === 'article'?item.imagesArticle[0]:item.imagesLocation[0])
                            setHelpModalVisible(true)
                        }}
                        viewDetails={() => {
                            dispatch(getSelectedOptions(item))
                            navigation.navigate('AccueilNavigator',{screen:item.Categorie.typeCateg === 'article'?routes.ARTICLE_DETAIL : routes.LOCATION_DETAIL, params: item})

                        }}
                        addToCart={ () => handleAddToCard(item)}
                        deleteItem={() => dispatch(getItemDeleted(item))}
                        notInStock={item.Categorie.typeCateg === 'article'?item.qteStock === 0 : item.qteDispo === 0}
                        titleLabel={item.Categorie.typeCateg === 'article'?'Prix:' : item.frequence === 'mensuelle'?'Coût mensuelle' : 'Coût journalier'}
                        secondTitle={item.Categorie.typeCateg === 'article'?item.prixReel : item.coutReel}
                        firstTitle={item.Categorie.typeCateg === 'article'?item.prixPromo : item.coutPromo}
                        aideInfo={item.aide}
                        itemReductionPercent={getReductionPercent(item)}
                        isFavorite={productFavorites().some(fav => fav.id === item.id)}
                        toggleFavorite={() => dispatch(getToggleFavorite(item))}
                        description={item.Categorie.typeCateg === 'article'?item.designArticle : item.libelleLocation}
                        source={{uri: item.Categorie.typeCateg === 'article'?item.imagesArticle[0] : item.imagesLocation[0]}} />)}
                </View>
                }
            </ScrollView>
            {showAddToCardModal && <AddToCartModal
                cartHeight={'100%'}
                itemModalVisible={showAddToCardModal}
                goToHomeScreen={() => {
                    setShowAddToCardModal(false)
                }}
                goToShoppingCart={() => {
                    setShowAddToCardModal(false)
                    navigation.navigate(routes.CART)
                }}
                designation={currentAdded?.Categorie?.typeCateg === 'article'?currentAdded.designArticle : currentAdded.libelleLocation}
                source={{uri: currentAdded?.Categorie?.typeCateg === 'article'?currentAdded.imagesArticle[0] : currentAdded.imagesLocation[0]}}
            />}
                <OrderHelpModal
                    selectedSource={{uri: selectedSource}}
                    closeModal={() => setHelpModalVisible(false)}
                    visible={helpModalVisible}/>
                </>
    );
}


const styles = StyleSheet.create({
    cartAndAvatar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom:10,
        width: '100%',
        paddingTop: 40,
        backgroundColor: colors.rougeBordeau

    },
    header: {
        width: '100%',
        height: 130,
        backgroundColor: colors.rougeBordeau,
    },
    searchInput:{
        height: 35,
        borderRadius: 20,
        paddingHorizontal:10,
        width: 230,
        backgroundColor: colors.blanc,
    }
})
export default AccueilScreen;