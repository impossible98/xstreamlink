import fs from 'fs';

import TOML from '@iarna/toml';

import { Config, ConfigPath } from '../constants/mod';

let defaultConfigToml = TOML.stringify(Config);

type ConfigToml = {
    open?: boolean;
    player?: string;
};

class AppConfig {
    exitsConfig() {
        return fs.existsSync(ConfigPath);
    }

    getConfig() {
        let config: ConfigToml = TOML.parse(fs.readFileSync(ConfigPath, 'utf8'));

        return config;
    }

    writeConfig(config: string) {
        fs.writeFileSync(ConfigPath, config);
    }
}
export { AppConfig, defaultConfigToml };
