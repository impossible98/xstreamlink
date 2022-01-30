import * as process from 'process';

import { AppConfig } from '../config/mod';

const appConfig = new AppConfig();

function set() {
    let config = appConfig.get();
    const key = process.argv[3];
    // const value = process.argv[4];

    if (['open', 'player', 'history'].indexOf(key) !== -1) {
        console.log(config);
        process.exit(0);
    } else {
        console.log('set [open|player|history] [value]');
        process.exit(0);
    }
}

export { set };
