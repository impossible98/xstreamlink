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
            // eslint . --ext .ts
            try {
                await execFile(commandPath, ['.', '--ext', '.ts']);

            } catch (error) {
                console.log(error.stdout);
            }
        } else {
            const commandPath = path.join(__dirname, '..', 'node_modules', '.bin', `${command}`);
            // eslint . --ext .ts
            try {
                await execFile(commandPath, ['.', '--ext', '.ts']);

            } catch (error) {
                console.log(error.stdout);
            }
        }
    }

}

function main() {
    const lint = new Lint();
    // exec command
    lint.exec();
}

main();
