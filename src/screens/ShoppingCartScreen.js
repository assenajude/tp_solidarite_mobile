import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {View, Text, FlatList, StyleSheet, ScrollView} from 'react-native'
import {useSelector} from 'react-redux';
import CartListFooter from "../components/shoppingCart/CartListFooter";


import CartItem from "../components/shoppingCart/CartItem";
import AppText from "../components/AppText";
import Color from '../utilities/colors'
import * as shoppingCartActions from '../store/actions/shoppingCartActions'
import CartListHeader from "../components/shoppingCart/CartListHeader";
import routes from "../navigation/routes";
import {addOrder} from  '../store/actions/orderActions'

function ShoppingCartScreen({navigation}) {
    const dispatch = useDispatch();
    const totalAmount = useSelector(state => state.shoppingCart.totalAmount);
    const itemsLenght = useSelector(state => state.shoppingCart.itemsLenght)

    const items = useSelector(state => {
        const itemsTransformed = [];
        for(key in state.shoppingCart.items) {
            itemsTransformed.push({
                id: key,
                libelle: state.shoppingCart.items[key].libelle,
                image: state.shoppingCart.items[key].image,
                quantite: state.shoppingCart.items[key].quantite,
                prix: state.shoppingCart.items[key].prix,
                montant: state.shoppingCart.items[key].montant
            })
        };
        return itemsTransformed;
    });

    useEffect(() => {
    }, []);

    if (items.length === 0) {
        return <View style={styles.emptyListStyle}>
            <AppText>Votre panier est vide, vous pouvez y ajouter des articles.</AppText>
        </View>
    }

    return (
        <View style={styles.mainContainer}>
       <FlatList ListHeaderComponent={() => <CartListHeader/>}
                 ListFooterComponent={() => <CartListFooter totalAmount={totalAmount} getOrder={() =>{
                     dispatch(addOrder(items, itemsLenght, totalAmount))
                     navigation.navigate(routes.ORDER)}}/>} data={items}
                 keyExtractor={(item) => item.id.toString()}
                 renderItem={({item}) => <CartItem designation={item.libelle} itemQuantite={item.quantite} changeQuantite={(itemValue, index) => {
                     dispatch(shoppingCartActions.changeQuantite(item.id, itemValue))
                 }}
                             source={{uri: item.image}} itemBtnFirst='Détail'
                             itemBtnSecond='Supprimer' itemPrice={item.prix}
                              itemAmount={item.montant}
                 />}
       />

        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginBottom: 30,
        paddingTop: 20
    },
    emptyListStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }


})

export default ShoppingCartScreen;