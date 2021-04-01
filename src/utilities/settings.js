import Constants from 'expo-constants'

const settings = {
    dev: {
        baseURL: "http://192.168.1.178:5000/api"
    },
    staging: {
        baseURL: "https://toutpromo-backend.herokuapp.com/api"
    },
    prod: {
        baseURL: "https://serene-retreat-61242.herokuapp.com/api"
    }
}

const getCurrentSettings = () => {
    if(__DEV__) return settings.dev
    if(Constants.manifest.releaseChannel === "staging") return settings.staging
    return settings.prod
}

export default getCurrentSettings()