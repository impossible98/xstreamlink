const childProcess = require('child_process');
const os = require('os');
const path = require('path');

class Lint {
    async main() {
        const command = 'eslint';

        if (os.platform() === 'win32') {
            const commandPath = path.resolve(__dirname, '..', 'node_modules', '.bin', `${command}.cmd`);

            childProcess.execFile(commandPath, ['.', '--ext', '.ts'], function(error, stdout) {
                console.log(stdout);
            });
        } else {
            const commandPath = path.resolve(__dirname, '..', 'node_modules', '.bin', `${command}`);

            childProcess.execFile(commandPath, ['.', '--ext', '.ts'], function(error, stdout) {
                console.log(stdout);
            });
        }
    }
}

function main() {
    const fmt = new Lint();
    fmt.main();
}

main();
