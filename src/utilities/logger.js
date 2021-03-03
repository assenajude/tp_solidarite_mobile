/*
import Bugsnag  from "@bugsnag/expo";

const log = (error) => Bugsnag.notify(error);

const start = () => Bugsnag.start()

export default {log, start}*/

import * as Sentry from 'sentry-expo'


const initLogger = () =>
    Sentry.init({
    dns:'https://c3fe12f3ae9544cfbc19ff27cd05dc48@o541240.ingest.sentry.io/5659863',
    enableInExpoDevelopment: true,
    debug: true
})

export default {initLogger}