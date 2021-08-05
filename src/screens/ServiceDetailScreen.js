import React, {useState} from 'react';
import {View,ScrollView, Image, StyleSheet} from "react-native";
import AppText from "../components/AppText";
import colors from "../utilities/colors";
import { useSelector} from "react-redux";
import useAuth from "../hooks/useAuth";
import AppLabelWithContent from "../components/AppLabelWithContent";
import AppSmallButton from "../components/AppSmallButton";
import useAddToCart from "../hooks/useAddToCart";
import AddToCartModal from "../components/shoppingCart/AddToCartModal";
import routes from "../navigation/routes";
import AppActivityIndicator from "../components/AppActivityIndicator";

function ServiceDetailScreen({route, navigation}) {
    const {userRoleAdmin, formatPrice} = useAuth()
    const {addItemToCart} = useAddToCart()

    const [showModal, setShowModal] = useState(false)

    const isLoading = useSelector(state => state.entities.shoppingCart.loading)
    const service = useSelector(state => {
        const list = state.entities.service.list
        const currentService = list.find(item => item.id === Number(route.params.id))
        return currentService
    })

    const handleAddToCart = async () => {
        const result = await addItemToCart(service)
        if(!result) return;
        setShowModal(true)
    }

    if(showModal) {
        return (
            <AddToCartModal
                source={{uri: service.imagesService[0]}}
                designation={service.libelle}
                itemModalVisible={showModal}
                goToHomeScreen={() => setShowModal(false)}
                goToShoppingCart={() => {
                    setShowModal(false)
                    navigation.navigate('AccueilNavigator', {screen: routes.CART})}}
            />
        )
    }

    return (
        <>
            <AppActivityIndicator visible={isLoading}/>
            <ScrollView contentContainerStyle={{
            paddingBottom: 50,
        }}>
               {userRoleAdmin() && <View style={{alignSelf: 'flex-end', margin: 20}}>
                        <AppSmallButton
                            iconName='edit'
                            title='Edit'
                            width={120}/>
                        <AppSmallButton
                            iconName='plus'
                            title='add option'
                            width={120}/>
                        <AppSmallButton
                            iconName='delete'
                            title='Supprimer'
                            width={120}/>
                </View>}
                <View>
                <Image source={{uri: service.imagesService[0]}} style={{width: '100%', height: 300}}/>
               <View style={{marginTop: 5}}>
                   <AppText style={{fontWeight: 'bold'}}>{service.libelle}</AppText>
               </View>
                </View>
                <View>
                    <View style={{alignSelf: 'flex-end'}}>
                            <AppSmallButton
                                onPress={handleAddToCart}
                                title='Utiliser'
                                iconName='shoppingcart'
                            />
                    </View>
                    <View>
                        <AppLabelWithContent content={formatPrice(service.montantMin)}
                            label="Montant minimum autorisé"/>

                        <AppLabelWithContent
                            content={formatPrice(service.montantMax)}
                            label="Montant maximum autorisé"/>
                    </View>
                    <AppLabelWithContent
                        showSeparator={false}
                        content={service.description}
                        label='Description'/>
                </View>
        </ScrollView>
           {service.isDispo === false && <View style={styles.notDispo}>
                <AppText style={{color: colors.rougeBordeau}}>Ce service n'est plus disponible</AppText>
            </View>}
            </>
    );
}

const styles = StyleSheet.create({
    notDispo: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.5,
        backgroundColor: colors.blanc
    }
})

export default ServiceDetailScreen;