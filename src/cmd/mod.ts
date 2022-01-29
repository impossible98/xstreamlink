import * as process from 'process';

import { help } from './help';
import { main } from './main';
import { version } from './version';

import { AppConfig, defaultConfigToml } from '../config/mod';

const configApp = new AppConfig();

export async function mod() {
    if (!configApp.exitsConfig()) {
        configApp.writeConfig(defaultConfigToml);
    }

    if (process.argv.length === 2) {
        await main();
    } else if (process.argv.length === 3) {
        if (process.argv[2] == 'version') {
            await version();
        } else {
            await help();
        }
    } else {
        await help();
    }
}
