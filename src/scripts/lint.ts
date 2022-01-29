import * as os from 'os';
import * as path from 'path';
import * as util from 'util';

const execFile = util.promisify(require('child_process').execFile);

class Lint {
    async exec() {
        const command = 'eslint';
        // 
        if (os.platform() === 'win32') {
            const commandPath = path.join(__dirname, '..', 'node_modules', '.bin', `${command}.cmd`);
            // 
            await execFile(commandPath, ['.', '--ext', '.ts']);
        } else {
            const commandPath = path.join(__dirname, '..', 'node_modules', '.bin', `${command}`);
            // 
            await execFile(commandPath, ['.', '--ext', '.ts']);
        }
    }
}

function main() {
    const lint = new Lint();
    // exec command
    lint.exec();
}

main();
