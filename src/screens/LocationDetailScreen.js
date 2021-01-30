import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import AppText from "../components/AppText";
import {useDispatch, useSelector} from "react-redux";
import {getColorSizes, getSelectOption} from "../store/slices/mainSlice";
import useAddToCart from "../hooks/useAddToCart";
import AppButton from "../components/AppButton";
import colors from "../utilities/colors";
import AppLabelLink from "../components/AppLabelLink";
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import {getModalDismiss, getProvenanceSet} from "../store/slices/shoppingCartSlice";
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";
import useAuth from "../hooks/useAuth";

function LocationDetailScreen({route, navigation}) {
    const dispatch = useDispatch()
    const {addItemToCart} = useAddToCart()
    const {userRoleAdmin} = useAuth()

    const item = useSelector(state => {
        const listLocation = state.entities.location.list
        const selectedLocation = listLocation.find(item => item.id === route.params.id)
        return selectedLocation
    })

    const showItemModal = useSelector(state => state.entities.shoppingCart.locationDetailModal)
    const addedItem = useSelector(state => state.entities.shoppingCart.newAdded)
    const isLoading = useSelector(state => state.entities.shoppingCart.loading)
    const locationOptions = useSelector(state => state.entities.main.selectedItemOptions)
    const locationOptionSises = useSelector(state => state.entities.main.selectedColorSizes)
    const locSelectedOption = useSelector(state => state.entities.main.selectedOption)
    const [selectedImage, setSelectedImage] = useState(item.imagesLocation[0])
    const [selectedColor, setSelectedColor] = useState('')
    const [selectedSize, setSelectedSize] = useState('')
    const [selectedQty, setSelectedQty] = useState(1)
    const [selectedPrice, setSelectedPrice] = useState()

    const handleChangeImage = (image) => {
        setSelectedImage(image)
    }

    const handleAddToCart = () => {
        const isLocationSelected = selectedColor !== '' && selectedSize !== ''
        if(!isLocationSelected) {
            return alert('Vous devez choisir une option pour valider.')
        }
    const itemData = {...item, couleur: selectedColor, prix: locSelectedOption.prix, taille: selectedSize, quantite: selectedQty}
        dispatch(getProvenanceSet('locationDetail'))
        addItemToCart(itemData)
    }


    if(showItemModal) {
        return <AddToCartModal itemModalVisible={showItemModal} source={{uri: addedItem.imagesLocation[0]}} designation={addedItem.libelleLocation}
                               goToHomeScreen={() => dispatch(getModalDismiss())}
                               goToShoppingCart={() => {
                                   dispatch(getModalDismiss())
                                   navigation.navigate('AccueilNavigator', {screen: routes.CART})}} />
    }
    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            <ScrollView style={{marginTop: 20}}>
                {userRoleAdmin() &&  <View style={{
                    alignSelf: 'flex-end',
                    marginBottom: 20
                }}>
                    <View>
                        <AppButton title='Edit' iconName='edit' iconSize={15} iconColor={colors.blanc} onPress={() => navigation.navigate('E-location', {screen: 'NewLocationScreen', params: item})}/>
                        <AppButton style={{marginTop: 10}}  title='Supprimer' iconName='delete' iconSize={15} iconColor={colors.blanc}/>
                        <AppButton style={{marginTop: 10}} title='Add option' iconName='plus' iconSize={15} iconColor={colors.blanc} onPress={() => navigation.navigate('NewOptionScreen', item)}/>
                    </View>
                </View>}
                <View style={{margin: 5}}>
                    <Image source={{uri: selectedImage}} style={styles.imageStyle}/>
                </View>
                <ScrollView horizontal>
                    <View style={styles.imagesContainer}>
                        {item.imagesLocation.map((image, index) => <View key={index.toString()} style={{margin: 10}}>
                            <TouchableWithoutFeedback onPress={() => handleChangeImage(image)}>
                                <Image source={{uri: image}} style={{height: 60, width: 60}} />
                            </TouchableWithoutFeedback>
                        </View>)}
                    </View>
                </ScrollView>
                <View style={{margin: 5}}>
                    <View style={{ marginTop: 5}}>
                        <AppText style={{fontWeight: 'bold'}}>{item.libelleLocation}</AppText>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <AppText style={{fontWeight: 'bold'}}>Prix: </AppText>
                            <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{item.coutPromo}</AppText>
                            <AppText>/</AppText>
                            <AppText style={{textDecorationLine: 'line-through'}}>{item.coutReel}</AppText>
                            <AppText>fcfa</AppText>
                        </View>
                        <View style={{
                            alignSelf: 'flex-end'
                        }}>
                            <AppButton style={{padding: 5}} title='Louer' onPress={handleAddToCart}/>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <AppText style={{fontWeight: 'bold'}}>Reste en stock: </AppText>
                        <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{item.qteDispo}</AppText>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <AppText style={{fontWeight: 'bold'}}>Adresse: </AppText>
                        <AppText>{item.adresseLocation}</AppText>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <AppText style={{fontWeight: 'bold'}}>Frequence: </AppText>
                        <AppText>{item.frequenceLocation}</AppText>
                    </View>
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <AppText style={{fontWeight: 'bold'}}>Caution: </AppText>
                        <AppText>{item.nombreCaution}</AppText>
                    </View>
                    {locationOptions.length >= 1 && <View style={{flexDirection: 'row', justifyContent: 'space-between', borderWidth: 0.5}}>
                        <View style={{borderWidth: 1}}>
                            <View style={{backgroundColor: colors.rougeBordeau}}>
                                <AppText style={{color: colors.blanc}}>Choisissez une option</AppText>
                            </View>
                            <View style={{width: 200}}>
                                <ScrollView horizontal>
                                    <View style={{flexDirection: 'row'}}>
                                        {locationOptions.map((couleur, index) => <View key={index.toString()} style={{padding:5}}>
                                            <AppLabelLink containerStyle={{borderWidth: 1,
                                                borderColor: selectedColor === couleur?colors.or:'grey'
                                            }} otherTextStyle={{marginTop: 10}} content={couleur}
                                                          handleLink={() => {
                                                              dispatch(getColorSizes({item, couleur}));
                                                              setSelectedColor(couleur)
                                                              setSelectedSize('')
                                                          }}/>
                                        </View>)}
                                    </View>
                                </ScrollView>
                            </View>

                            {selectedColor !== '' && locationOptionSises.length >= 1 &&  <View>
                                <View style={{backgroundColor: colors.rougeBordeau}}>
                                    <AppText style={{color: colors.blanc}}>Choisissez une taille svp</AppText>
                                </View>
                                <ScrollView horizontal>
                                    {locationOptionSises.map((taille, index) =>
                                        <AppLabelLink key={index} containerStyle={{
                                            borderWidth: 1,
                                            borderColor: selectedSize === taille?colors.or:'grey'
                                        }} content={taille}
                                                      handleLink={()=> {
                                                          setSelectedSize(taille)
                                                          dispatch(getSelectOption({item, couleur: selectedColor, taille}))
                                                      }}/>)}
                                </ScrollView>
                            </View>}
                        </View>

                        <View style={{height: 'auto', width: '50%'}}>
                            <View style={{
                                backgroundColor: colors.rougeBordeau
                            }}>
                                <AppText style={{color: colors.blanc}}>Vos choix</AppText>
                            </View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <AppText>couleur: </AppText>
                                <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>{selectedColor}</AppText>
                            </View>

                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <AppText>size: </AppText>
                                <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>{selectedSize}</AppText>
                            </View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <AppText>Prix: </AppText>
                                <AppText style={{color: colors.rougeBordeau, fontWeight: 'bold'}}>{locSelectedOption.prix}fcfa</AppText>
                            </View>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <AppText>Quantite: </AppText>
                                <AppText>{selectedQty}</AppText>
                            </View>
                        </View>
                    </View>}
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                        <AppText style={{fontWeight: 'bold'}}>Description: </AppText>
                        <AppText>{item.descripLocation}</AppText>
                    </View>
                </View>
            </ScrollView>

            {item.qteDispo === 0 && <View style={styles.rupture}>
                <AppText style={{color: colors.rougeBordeau}}>Rupture de stock</AppText>
            </View>}
        </>
    );
}

const styles = StyleSheet.create({
    imageStyle: {
        height: 200,
        width: '100%',
        padding: 10,
        overflow: 'hidden'
    },
    imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rupture: {
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
        backgroundColor: colors.blanc
    }
})

export default LocationDetailScreen;