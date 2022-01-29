import * as os from 'os';
import * as path from 'path';
import * as util from 'util';

const execFile = util.promisify(require('child_process').execFile);

class Fmt {
    async exec() {
        const command = 'dprint';
        // 
        if (os.platform() === 'win32') {
            const commandPath = path.join(__dirname, '..', 'node_modules', '.bin', `${command}.cmd`);
            // 
            await execFile(commandPath, ['fmt']);
        } else {
            const commandPath = path.join(__dirname, '..', 'node_modules', '.bin', `${command}`);
            // 
            await execFile(commandPath, ['fmt']);
        }
    }
}

function main() {
    const fmt = new Fmt();
    // exec command
    fmt.exec();
}

main();
