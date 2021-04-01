import {Alert, ToastAndroid} from 'react-native'
import {useDispatch,  useStore} from "react-redux";
import {
    getOrderContratUpdate,
    getOrderDeleted,
    getTimerStop,
    saveStatusEditing
} from "../store/slices/orderSlice";
import useCreateOrderContrat from "./useCreateOrderContrat";
import {getTranchePayed} from "../store/slices/trancheSlice";
import {getFactureUpdated} from "../store/slices/factureSlice";
import {getMsgCompterIncremented} from "../store/slices/messageSlice";
import dayjs from "dayjs";

let useManageUserOder;
export default useManageUserOder = () => {
    const dispatch = useDispatch()
    const store = useStore()
    const { createContrat} = useCreateOrderContrat()

    const secsToTime = (secs) => {
        let d = secs / 8.64e4 | 0;
        let H = (secs % 8.64e4) / 3.6e3 | 0;
        let m = (secs % 3.6e3)  / 60 | 0;
        let s = secs % 60;
        let z = n=> (n < 10? '0' : '') + n;
        return `${d}j ${z(H)}h${z(m)}m ${z(s)}s`

    }

    const saveAccordEdit = (data) => {
        dispatch(saveStatusEditing(data))
        dispatch(getMsgCompterIncremented())
    };

    const saveLivraisonEdit = (data) => {
        dispatch(saveStatusEditing(data))
        dispatch(getMsgCompterIncremented())
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
        const contratLength = order.Contrats.length
        const lastContrat = order.Contrats[contratLength-1]
        if(lastContrat && lastContrat.montant !== order.Facture.solde) {
            Alert.alert('Info!', 'Vous ne pouvez pas supprimer cette commande car le contrat nest pas encore terminé', [
                {text: 'ok', onPress: () => {return;}}
            ])
        } else {
            Alert.alert('Info!', 'Voulez-vous  supprimer cette commande definitivement?', [
                {text: 'oui', onPress: async () => {
                     await dispatch(getOrderDeleted(order))
                        const error = store.getState().entities.order.error
                        if(error !== null) {
                            return ToastAndroid.showWithGravity('Une erreur est apparue', ToastAndroid.LONG, ToastAndroid.TOP)
                        }
                        return ToastAndroid.showWithGravity('la commande a été supprimée avec succes', ToastAndroid.LONG, ToastAndroid.TOP)
                }},
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
            const list = store.getState().entities.facture.list
            const justUpdated = list.find(fact => fact.id === tranche.FactureId)
            if(justUpdated.montant === justUpdated.solde) {
                dispatch(getOrderContratUpdate({
                    commandeId: justUpdated.CommandeId,
                    contratStatus: 'Terminé',
                    dateCloture: Date.now()
                }))
            }
        }
        dispatch(getMsgCompterIncremented())
    }

    const getOrderExpirationState = () => {
        const currentOrders = store.getState().entities.order.currentUserOrders
        const selectedOrders = currentOrders.filter(order => order.isExpired === false)
        console.log(selectedOrders);
        if(selectedOrders.length === 0)return;
        selectedOrders.forEach(selected => {
        const date = dayjs(selected.updatedAt).get('day')
        const lastTime = dayjs(selected.updatedAt).set('day', date + 3)
            const now = dayjs()
            const diffTime = lastTime.diff(now, 'second')
            if(diffTime <= 0) {
                dispatch(getTimerStop({orderId: selected.id, isExpired: true}))
            }else {
                const formated = secsToTime(diffTime)
                dispatch(saveStatusEditing({orderId: selected.id, expireIn: formated}))
            }

        })
    }

return {saveAccordEdit, saveLivraisonEdit, createOrderContrat, moveOrderToHistory, deleteOrder, payFactureTranche, getOrderExpirationState}
}