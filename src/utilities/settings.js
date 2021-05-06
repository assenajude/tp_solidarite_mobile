import Constants from 'expo-constants'

const settings = {
    dev: {
        baseURL: "http://192.168.8.100:5000/api"
        // baseURL: "https://toopromo-backend.herokuapp.com/api"
    },
    staging: {
        baseURL: "https://toopromo-backend.herokuapp.com/api"
    },
    prod: {
        baseURL: "https://toopromo-backend.herokuapp.com/api"
    }
}

const getCurrentSettings = () => {
    if(__DEV__) return settings.dev
    if(Constants.manifest.releaseChannel === "staging") return settings.staging
    return settings.prod
}

export default getCurrentSettings()