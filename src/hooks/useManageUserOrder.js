import {Alert} from 'react-native'
import {useDispatch,  useStore} from "react-redux";

import {getDeleteUpdate, getOrderDeleted, getStatusEditing, saveStatusEditing} from "../store/slices/orderSlice";
import useCreateOrderContrat from "./useCreateOrderContrat";

let useManageUserOder;
export default useManageUserOder = () => {
    const dispatch = useDispatch()
    const store = useStore()
    const { createContrat} = useCreateOrderContrat()
    const startEditingAccord = (orderId) => {
        const data = {
            id: orderId,
            libelle: 'editAccord'
        }
        dispatch(getStatusEditing(data))
    };

    const startEditingLivraison = (orderId) => {
        const livrData = {
            id: orderId,
            libelle: 'editLivraison'
        }
        dispatch(getStatusEditing(livrData))
    };

    const saveAccordEdit = (data) => {
        dispatch(saveStatusEditing(data))
        const editData = {
            id: data.orderId,
            libelle: 'editAccord'
        }
        dispatch(getStatusEditing(editData))

    };

    const saveLivraisonEdit = (data) => {
        dispatch(saveStatusEditing(data))
        const editData = {
            id: data.orderId,
            libelle: 'editLivraison'
        }
        dispatch(getStatusEditing(editData))

    };

    const createOrderContrat = (order) => {
        Alert.alert('Info...', 'Voulez-vous passer en contrat pour cette commande?', [
            {text: 'oui', onPress: async () => {
                    await createContrat(order)
                }},
            {
                text: 'non', onPress: () => {return;}
            }
        ], {cancelable: false})
    };

    const moveOrderToHistory = (orderId) => {
        const orderData = {
            orderId,
            history: true
        }
        Alert.alert('Info!', "Voulez-vous deplacer cette commande dans votre historique?", [
            {text: 'oui', onPress: async () => {
                    await dispatch(saveStatusEditing(orderData))
                }}, {
                text: 'non', onPress: () => {return;}
            }
        ])

    };

    const deleteOrder = (order) => {
        if(order.contrats[0].montant !== order.facture.solde) {
            Alert.alert('Info!', 'Vous ne pouvez pas supprimer cette commande car le contrat nest pas encore terminé', [
                {text: 'ok', onPress: () => {return;}}
            ])
        } else {

            Alert.alert('Info!', 'Voulez vous vraiment supprimer cette commande definitivement?', [
                {text: 'oui', onPress: async () => {
                        await dispatch(getOrderDeleted({orderId: order.id}))
                        const error = store.getState().entities.order.error
                        if(error === null) {
                            dispatch(getDeleteUpdate(order.id))
                        }
                        return;
                    }
                },
                {text: 'non', onPress: () => {return;}}
            ])
        }

    }

return {startEditingAccord, startEditingLivraison, saveAccordEdit, saveLivraisonEdit, createOrderContrat, moveOrderToHistory, deleteOrder}
}