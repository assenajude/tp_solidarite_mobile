import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {View, StyleSheet, ActivityIndicator, Text, FlatList, TouchableWithoutFeedback} from 'react-native';
import * as Yup from 'yup';
import ListHeader from "../components/list/ListHeader";
import ListFooter from "../components/list/ListFooter";
import ListItem from "../components/list/ListItem";
import {loadCategories} from '../store/slices/categorieSlice'
import ItemSeparator from "../components/list/ItemSeparator";
import color from '../utilities/colors';
import routes  from '../navigation/routes';

import configureStore from "../store/configureStore";
import categorieService from "../api/categorieService";

function CategorieScreen({navigation}) {
    const store = configureStore();
    const dispatch = useDispatch();
    const  [getFailed, setGetFailed] = useState(false);
    const [loadingData,setLoadingData] = useState(true)
    const categories = [];
        const categoriesData = useSelector(state => state.entities.categorie.list);
    const [allCategorie, setAllCategorie] = useState([])


    useEffect(() => {
    }, [])


/*
    if (loadingData) {
        return(
            <View style={styles.activityIndicator}>
            <ActivityIndicator size='large' color={color.rougeBordeau}/>
            </View>

            )
    }
*/

return (
    <View style={styles.mainContainer}>
        <View style={styles.listContainer}>
            <FlatList ListHeaderComponent={ListHeader} data={categoriesData} keyExtractor={item => item.id.toString()}
                      renderItem={({item}) => <ListItem propriety1={item.id} propriety2={item.libelleCateg} propriety3={item.descripCateg} propriety4={item.typeCateg} />}
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