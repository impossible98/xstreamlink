import * as process from 'process';

import * as constants from '../constants/mod';

export async function help() {
    console.log(`Usage: ${constants.BinName} [command]`);
    console.log('');
    console.log('  help: show this help');
    console.log('');
    console.log('  version: show the version');
    console.log('');
    process.exit(0);
}
