const childProcess = require('child_process');
const os = require('os');
const path = require('path');

class Fmt {
    async main() {
        const command = 'dprint';

        if (os.platform() === 'win32') {
            const commandPath = path.resolve(__dirname, '..', 'node_modules', '.bin', `${command}.cmd`);

            childProcess.execFile(commandPath, ['fmt'], function(error, stdout) {
                console.log(stdout);
            });
        } else {
            const commandPath = path.resolve(__dirname, '..', 'node_modules', '.bin', `${command}`);

            childProcess.execFile(commandPath, ['fmt'], function(error, stdout) {
                console.log(stdout);
            });
        }
    }
}

function main() {
    const fmt = new Fmt();
    fmt.main();
}

main();
