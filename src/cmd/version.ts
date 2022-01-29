import * as process from 'process';

import * as constants from '../constants/mod';

function version() {
    console.log(`${constants.AppName} version: ${constants.Version}`);
    process.exit(0);
}

export { version };
