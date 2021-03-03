import {useSelector} from "react-redux";

let useOrderInfos;
export default useOrderInfos = () => {
    const listOrder = useSelector(state => state.entities.order.currentUserOrders)
    const listPayement = useSelector(state => state.entities.payement.list)
    const listRelais = useSelector(state => state.entities.pointRelais.list)

    const getItems = (orderId) => {
        const selectedOrder = listOrder.find(order => order.id === orderId)
        if(selectedOrder) return selectedOrder.CartItems
        return null
    }

    const getModePayement = (orderId) => {
        const selectedOrder = listOrder.find(order => order.id === orderId)
        if(selectedOrder) {
            const idPayement = selectedOrder.Plan.PayementId
            const selectedPayement = listPayement.find(payement => payement.id === idPayement)
            if(selectedPayement) return selectedPayement.mode
            return null
        }
    }

    const getPointRelais = (orderId) => {
        const selectedOrder = listOrder.find(order => order.id === orderId)
        if(selectedOrder) {
            const idRelais = selectedOrder.UserAdresse.PointRelaiId
            const selectedRelais = listRelais.find(relais => relais.id === idRelais)
            return selectedRelais
        } else return null
    }

    return {getItems, getModePayement, getPointRelais}
}