import React from 'react';
import {useSelector} from 'react-redux'
import {View, StyleSheet,Text, FlatList} from 'react-native';
import ListHeader from "../components/list/ListHeader";
import ListFooter from "../components/list/ListFooter";

import routes  from '../navigation/routes';
    import useMainFeatures from "../hooks/useMainFeatures";
import CategorieItem from "../components/categorie/CategorieItem";


function CategorieScreen({navigation}) {

    const {getProductsByCategories} = useMainFeatures()
        const categoriesData = useSelector(state => state.entities.categorie.list);


return (
    <>
            <FlatList
                data={getProductsByCategories()}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) =>
                    <CategorieItem
                        item={item}
                        getCategorieDetails={() => navigation.navigate(routes.ACCUEIL, {...item, headerTitle: item.Categorie.libelleCateg})}
                    />}
            />
            {categoriesData.length === 0 && <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <Text>Aucune categorie trouvee</Text>
            </View>
            }
        <View style={styles.addNew}>
            <ListFooter onPress={() => navigation.navigate(routes.NEW_CATEG)}/>
        </View>
    </>
)
}

const styles = StyleSheet.create({
    addNew: {
        position :'absolute',
        bottom: 5,
        right: 5
    },

})

export default CategorieScreen;