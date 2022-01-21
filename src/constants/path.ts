import * as os from 'os';
import * as path from 'path';

import { binName } from './name';

const configPath = path.join(os.homedir(), '.config', binName, 'config.toml');
const logPath = path.join(os.homedir(), '.config', binName, binName + '.log');

export { configPath, logPath };
