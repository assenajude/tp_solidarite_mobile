/*
import Bugsnag  from "@bugsnag/expo";

const log = (error) => Bugsnag.notify(error);

const start = () => Bugsnag.start()

export default {log, start}*/

import * as Sentry from 'sentry-expo'


const start = () => {
    Sentry.init({
        dsn: 'https://e7ac18cf32f14dada5b21cce057309c4@o541240.ingest.sentry.io/5659863',
        enableInExpoDevelopment: true,
        debug:__DEV__?true:false,
})
}



export default {start}