import React from 'react';
import {useSelector} from 'react-redux'
import {View, StyleSheet,Text, FlatList} from 'react-native';
import ListHeader from "../components/list/ListHeader";
import ListFooter from "../components/list/ListFooter";
import ListItem from "../components/list/ListItem";

import routes  from '../navigation/routes';


function CategorieScreen({navigation}) {

        const categoriesData = useSelector(state => state.entities.categorie.list);


return (
    <View style={styles.mainContainer}>
        <View style={styles.listContainer}>
            <FlatList ListHeaderComponent={ListHeader} data={categoriesData} keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => <ListItem imageUrl={{uri: item.imageCateg}} propriety2={item.libelleCateg} propriety3={item.descripCateg} propriety4={item.typeCateg} />}
            />
            {categoriesData.length === 0 && <Text>Aucune categorie trouvee</Text>}
        </View>

        <View style={styles.addNew}>
            <ListFooter onPress={() => navigation.navigate(routes.NEW_CATEG)}/>
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    addNew: {
        alignSelf: 'flex-end',
        margin: 40
    },
    listContainer: {
        flex: 1,
        padding: 20
    },

    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    gradient: {
        width: '100%',
        height: '100%'
    }
})

export default CategorieScreen;