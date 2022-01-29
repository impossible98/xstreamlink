import * as process from 'process';

import * as constants from '../constants/mod';

export async function version() {
    console.log(`${constants.AppName} version: ${constants.Version}`);
    process.exit(0);
}
