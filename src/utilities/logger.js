
import * as Sentry from 'sentry-expo'


const start = () => {
    Sentry.init({
        dsn: 'https://e7ac18cf32f14dada5b21cce057309c4@o541240.ingest.sentry.io/5659863',
        enableInExpoDevelopment: true,
        debug:__DEV__?true:false
    })
}

// const log = (error) => Sentry.captureException(new Error(error))


export default {start}