import * as process from 'process';

import { AppConfig } from '../config/mod';

const _config = new AppConfig();

function config() {
    const configData = _config.read();

    console.log(configData);
    process.exit(0);
}

export { config };
