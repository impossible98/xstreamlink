const childProcess = require('child_process');
const os = require('os');
const path = require('path');

function main() {
    if (os.platform() === 'win32') {
        var commandPath = path.join(__dirname, '..', 'node_modules', '.bin', 'dprint.cmd');
    } else {
        var commandPath = path.join(__dirname, '..', 'node_modules', '.bin', 'dprint');
    }

    childProcess.execFile(commandPath, ['fmt'], function(error, stdout) {
        console.log(stdout);
    });
}

main();
