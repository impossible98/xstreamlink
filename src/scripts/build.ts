import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import * as util from 'util';

const execFile = util.promisify(require('child_process').execFile);

class Build {
    async exec() {
        const command = 'ncc';
        const command2 = 'tsc';
        //
        if (os.platform() === 'win32') {
            const commandPath = path.join(__dirname, '..', 'node_modules', '.bin', `${command}.cmd`);
            const command2Path = path.join(__dirname, '..', 'node_modules', '.bin', `${command2}.cmd`);
            // ncc build src/main.ts and rename index.js to main.js
            await execFile(commandPath, ['build', 'src/main.ts']);
            await fs.rename(path.join(__dirname, '..', 'dist', 'index.js'), path.join(__dirname, '..', 'dist', 'main.js'));
            // ncc build src/lib.ts and rename index.js to lib.js
            await execFile(commandPath, ['build', 'src/lib.ts']);
            await fs.rename(path.join(__dirname, '..', 'dist', 'index.js'), path.join(__dirname, '..', 'dist', 'lib.js'));
            // tsc --project tsconfig.scripts.json
            await execFile(command2Path, ['--project', 'tsconfig.scripts.json']);
        } else {
            const commandPath = path.join(__dirname, '..', 'node_modules', '.bin', `${command}`);
            const command2Path = path.join(__dirname, '..', 'node_modules', '.bin', `${command2}`);
            // ncc build src/main.ts and rename index.js to main.js
            await execFile(commandPath, ['build', 'src/main.ts']);
            await fs.rename(path.join(__dirname, '..', 'dist', 'index.js'), path.join(__dirname, '..', 'dist', 'main.js'));
            // ncc build src/lib.ts and rename index.js to lib.js
            await execFile(commandPath, ['build', 'src/lib.ts']);
            await fs.rename(path.join(__dirname, '..', 'dist', 'index.js'), path.join(__dirname, '..', 'dist', 'lib.js'));
            // tsc --project tsconfig.scripts.json
            await execFile(command2Path, ['--project', 'tsconfig.scripts.json']);
        }
    }
}

function main() {
    const fmt = new Build();
    // exec command
    fmt.exec();
}

main();
