import React, {useState, useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {View, StyleSheet, ActivityIndicator, Text, FlatList, TouchableWithoutFeedback} from 'react-native';
import * as Yup from 'yup';

import * as categorieActions from '../store/actions/categorieActions';
import ListHeader from "../components/list/ListHeader";
import ListFooter from "../components/list/ListFooter";
import ListItem from "../components/list/ListItem";
import ItemSeparator from "../components/list/ItemSeparator";
import color from '../utilities/colors';
import routes  from '../navigation/routes'



function CategorieScreen({navigation}) {
    const dispatch = useDispatch();
    const  [getFailed, setGetFailed] = useState(false);
    const [loadingData,setLoadingData] = useState(true)
    const categoriesData = useSelector(state =>state.categorie.categories)

/*
    const getCategories = useCallback(async() => {
        try {
            await dispatch(categorieActions.setCategories());
        } catch (e) {
            console.log(e.message)
        }
    }, [dispatch])
*/

const getCategories = useCallback(async () => {
    try {
        const response = await dispatch(categorieActions.setCategories());
        setLoadingData(false)
    } catch (e) {
        setGetFailed(true);
        throw new Error(e.message)
    }
}, [dispatch])




    useEffect(() => {
        getCategories();
    }, [dispatch, getCategories])


    if (loadingData) {
        return(
            <View style={styles.activityIndicator}>
            <ActivityIndicator size='large' color={color.rougeBordeau}/>
            </View>

            )
    }

return (
    <View style={styles.mainContainer}>
        <View style={styles.flatContainer}>
        <FlatList ListHeaderComponent={ListHeader} data={categoriesData} keyExtractor={item => item.id.toString()}
                  renderItem={({item}) => <ListItem key1={item.id} key2={item.libelleCateg} key3={item.descripCateg} key4={item.typeCateg} />}
        />
            {categoriesData.length === 0 && <Text>Aucune categorie trouvee</Text>}
        </View>
        <View elevation={2} style={styles.buttonContainer}>
        <View style={styles.buttonStyle}>
        <ListFooter otherStyle={styles.addNewButton} onPress={() => navigation.navigate(routes.NEW_CATEG)}/>
        </View>
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: color.blanc
    },
    buttonStyle: {
        alignSelf: 'flex-end',
        margin:20,
        width: 60,
        height: 60,
    },
    flatContainer: {
        height: '80%',
        padding: 10
    },
    buttonContainer: {
        borderTopWidth: 0.1
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