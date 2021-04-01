import {useSelector} from "react-redux";

let useParrainage;
export default useParrainage = () => {
    const parrainageOrders = useSelector(state => state.entities.parrainage.parrainageOrders)

    const getParrainagePercent = (total, amount) => {
        const percent = amount * 100 / total
        const formated = Math.round(percent)
        return formated || 0
    }

    const getParrainageGain = (order) => {
        const parrainageAmount = order.OrderParrain.action
        const percent = getParrainagePercent(order.montant, parrainageAmount)
        const gain = percent * order.interet / 100
        return gain || 0

    }

    const getTotalGain = () => {
        let total = 0
        parrainageOrders.forEach(order => {
            const gainPerOrder = getParrainageGain(order)
            total += gainPerOrder
        })
        return total || 0
    }

    const getInvestissement = () => {
        let totalAction = 0
        parrainageOrders.forEach(order => {
            totalAction += order.OrderParrain.action
        })
        return totalAction || 0
    }

    const getRestituteInvest = () => {
        let restituteQuotite = 0
        let actuGain = 0
        const endedOrder = parrainageOrders.filter(order => order.OrderParrain.ended === true)
        endedOrder.forEach(order => {
            restituteQuotite += order.action
            const gain = getParrainageGain(order)
            actuGain += gain
        })
        return {restituteQuotite, actuGain}
    }



return  {getInvestissement, getParrainageGain, getParrainagePercent, getTotalGain, getRestituteInvest}
}