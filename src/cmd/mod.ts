import * as process from 'process';

import { help } from './help';
import { version } from './version';

export function main() {
    if (process.argv.length < 4) {
        help();
        version();
    }
}
