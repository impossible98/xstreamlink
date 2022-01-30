import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import TOML from '@iarna/toml';

import { BinName, Config, ConfigPath } from '../constants/mod';

const defaultConfigToml = TOML.stringify(Config);
const historyPath = path.join(os.homedir(), '.config', BinName, 'history.json');

type ConfigToml = {
    open?: boolean;
    player?: string;
};

class AppConfig {
    exits() {
        return fs.existsSync(ConfigPath);
    }

    read() {
        if (this.exits()) {
            return fs.readFileSync(ConfigPath, 'utf-8');
        } else {
            return defaultConfigToml;
        }
    }

    get() {
        const config: ConfigToml = TOML.parse(fs.readFileSync(ConfigPath, 'utf-8'));

        return config;
    }

    write(config: string) {
        fs.writeFileSync(ConfigPath, config);
    }
}
export { AppConfig, defaultConfigToml, historyPath };
