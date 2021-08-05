import React from 'react';
import {View, StyleSheet} from "react-native";
import routes from "../../navigation/routes";
import HomeCard from "../HomeCard";
import {useNavigation} from '@react-navigation/native'

function CategorieItem({item, getCategorieDetails}) {
    const navigation = useNavigation()
    const paramsData = {...item, headerTitle: item.Categorie.libelleCateg}
    const params = {screen: 'AccueilScreen', paramsData}
    return (
        <View style={styles.container}>
            <HomeCard
                // getProductLink={() => navigation.navigate('BottomTabNavigator', {screen: "AccueilNavigator", params})}
                getProductDetails={getCategorieDetails}
                firstPrice={item.firstPrice}
                secondPrice={item.secondPrice}
                item={item}
                productLength={item.productLength}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
export default CategorieItem;