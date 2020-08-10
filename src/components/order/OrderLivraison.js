import React from 'react';
import {View, StyleSheet} from 'react-native'
import {Picker} from "@react-native-community/picker";


import OrderItem from "./OrderItem";

function OrderLivraison({livraisonHeader,livraisonSubtitle,livraisonSubtitleValue,livraisonFrais,livraisonFraisValue,livraisonButtonTitle, changeLivraisonSubtitle}) {



    return (
        <View>
            <OrderItem headerTitle={livraisonHeader} subtitle={livraisonSubtitle}
                       valueSubtitle={<Picker style={styles.picker} selectedValue={livraisonSubtitleValue} onValueChange={changeLivraisonSubtitle}>
                           <Picker.Item label='Abidjan' value='abidjan'/>
                           <Picker.Item label='Aboisso' value='aboisso'/>
                           <Picker.Item label='Bouaké' value='bouake'/>
                           <Picker.Item label='Yakro' value='yakro'/>
                       </Picker>} cout={livraisonFrais} coutValue={livraisonFraisValue}
                       buttonTitle={livraisonButtonTitle}/>

        </View>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        width: 150
    },
    picker: {
        height: 50,
        width: 130
    }
})

export default OrderLivraison;