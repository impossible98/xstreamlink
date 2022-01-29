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
    exitsConfig() {
        return fs.existsSync(ConfigPath);
    }

    getConfig() {
        const config: ConfigToml = TOML.parse(fs.readFileSync(ConfigPath, 'utf8'));

        return config;
    }

    writeConfig(config: string) {
        fs.writeFileSync(ConfigPath, config);
    }
}
export { AppConfig, defaultConfigToml, historyPath };
