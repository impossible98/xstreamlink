import fs from 'fs';
import os from 'os';
import path from 'path';

import TOML from '@iarna/toml';

import { BinName } from '../constants/mod';
import { defaultConfig } from './default';

let defaultConfigToml = TOML.stringify(defaultConfig);

class ConfigApp {
    configPath: string;

    constructor() {
        this.configPath = path.join(os.homedir(), '.config', BinName, 'config.toml');
    }

    exitsConfig() {
        return fs.existsSync(this.configPath);
    }

    getConfig() {
        return TOML.parse(fs.readFileSync(this.configPath, 'utf8'));
    }

    writeConfig(config: string) {
        fs.writeFileSync(this.configPath, config);
    }
}
export { ConfigApp, defaultConfigToml };
