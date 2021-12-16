import * as process from 'process';

import * as constants from '../constants/mod';

export function version() {
    if (process.argv[2] == 'version') {
        console.log(`${constants.AppName} version: ${constants.Version}`);
        process.exit(0);
    }
}
