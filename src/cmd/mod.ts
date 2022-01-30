import * as process from 'process';

import { config } from './config';
import { help } from './help';
import { history } from './history';
import { main } from './main';
import { version } from './version';

// import { Config } from '../constants/mod';
// import { AppConfig } from '../config/mod';

// const configApp = new AppConfig();

export async function mod() {
    // var _config

    // if (configApp.exits()) {
    //     _config = configApp.get();
    // } else {
    //     _config = Config;
    // }

    if (process.argv.length === 2) {
        await main();
    } else if (process.argv.length === 3) {
        if (process.argv[2] == 'config') {
            await config();
        } else if (process.argv[2] == 'history') {
            await history();
        } else if (process.argv[2] == 'version') {
            version();
        } else {
            help();
        }
    } else {
        help();
    }
}
