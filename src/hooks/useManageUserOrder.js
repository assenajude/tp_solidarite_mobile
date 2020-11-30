import {Alert} from 'react-native'
import {useDispatch,  useStore} from "react-redux";

import {getDeleteUpdate, getOrderContratUpdate, getOrderDeleted, saveStatusEditing} from "../store/slices/orderSlice";
import useCreateOrderContrat from "./useCreateOrderContrat";
import {getTranchePayed} from "../store/slices/trancheSlice";
import {getFactureUpdated} from "../store/slices/factureSlice";

let useManageUserOder;
export default useManageUserOder = () => {
    const dispatch = useDispatch()
    const store = useStore()
    const { createContrat} = useCreateOrderContrat()

    const saveAccordEdit = (data) => {
        dispatch(saveStatusEditing(data))
    };

    const saveLivraisonEdit = (data) => {
        dispatch(saveStatusEditing(data))
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
        if(order.Contrats[0].montant !== order.facture.solde) {
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

    const payFactureTranche = async (tranche) => {
        await dispatch(getTranchePayed(tranche))
        const error = store.getState().entities.tranche.error
        if(error !== null) {
            return alert('Impossible de payer la tranche.Veuillez reessayer plutard')
        } else {
            const factureData = {
                id: tranche.FactureId,
                solde: tranche.montant
            }
            await dispatch(getFactureUpdated(factureData))
            // dispatch(getPayedStatusChanged(tranche))
            const list = store.getState().entities.facture.userFactures
            const justUpdated = list.find(fact => fact.id === tranche.FactureId)
            if(justUpdated.montant === justUpdated.solde) {
                dispatch(getOrderContratUpdate({
                    commandeId: justUpdated.CommandeId,
                    contratStatus: 'Terminé',
                    dateCloture: Date.now()
                }))
            }
        }
    }

return {saveAccordEdit, saveLivraisonEdit, createOrderContrat, moveOrderToHistory, deleteOrder, payFactureTranche}
}