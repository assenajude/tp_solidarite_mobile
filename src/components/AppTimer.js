import React, {useState, useEffect} from 'react';
import {View} from "react-native";
import AppText from "./AppText";
import dayjs from "dayjs";
import colors from "../utilities/colors";
import useManageUserOrder from "../hooks/useManageUserOrder";

function AppTimer({currentOrder}) {
    const {stopTimer:orderExpiration} = useManageUserOrder()
    const [resteTime, setResteTime] = useState()
    const [stopTimer, setStopTimer] = useState(false)

    const secsToTime = (secs) => {
        let d = secs / 8.64e4 | 0;
        let H = (secs % 8.64e4) / 3.6e3 | 0;
        let m = (secs % 3.6e3)  / 60 | 0;
        let s = secs % 60;
        const data = {d, H, m, s}
        let z = n=> (n < 10? '0' : '') + n;
        return {data,formatedResult:`${d}j ${z(H)}h${z(m)}m ${z(s)}s`}

    }

    const getCurrentTime = () => {
        if(stopTimer || currentOrder.isExpired) return;
        const date = dayjs(currentOrder.dateCmde).get('minute')
        const lastTime = dayjs(currentOrder.dateCmde).set('minute', date + 7)
        const timer = setInterval(() => {
            const now = dayjs(Date.now())
            const diffTime = lastTime.diff(now, 'second')
            const formated = secsToTime(diffTime)
            const {data} = formated
            setResteTime(formated.formatedResult)
            if(data.d ===0 && data.H ===0 && data.m ===0 && data.s ===0) {
                orderExpiration({orderId: currentOrder.id, isExpired: true})
                setStopTimer(true)
                clearInterval(timer)
            }
        }, 1000)
    }

    useEffect(() => {
        getCurrentTime()
    }, [])


    return (
        <View>
            <AppText style={{fontWeight: 'bold', color: colors.rougeBordeau}}>{resteTime}</AppText>
        </View>
    );
}

export default AppTimer;