import * as fs from 'fs/promises';
import * as os from 'os';
import * as path from 'path';
import * as util from 'util';

const execFile = util.promisify(require('child_process').execFile);

class Color {
    static green(word:string) {
        return `\x1B[32m${word}\x1B[0m`;
    }
    static red(word:string) {
        return `\x1B[31m${word}\x1B[0m`;
    }

    static yellow(word:string) {
        return `\x1B[33m${word}\x1B[0m`;
    }
}

class Constants {
    versionPath: string;

    constructor() {
        this.versionPath = path.join(__dirname, '..', 'src', 'constants', 'version.ts');
    }

    async getConstants() {
        const makefileData = await fs.readFile('Makefile', 'utf-8');
        let appName = makefileData.match(/APP_NAME := (.*)/)[1];
        let version = makefileData.match(/APP_VERSION := (.*)/)[1];
        let constants = [appName, version];

        return constants;
    }

    async write() {
        const value = await this.getConstants();
        const pkgData = await fs.readFile('package.json', 'utf8');
        const pkg = JSON.parse(pkgData);
        const [appName, version] = value
        pkg.version = version;

        console.log(`Building ${Color.green(appName)} ${Color.yellow(version)}`);
        await fs.writeFile('package.json', JSON.stringify(pkg, null, 4) + "\n");
        await fs.writeFile(
            this.versionPath,
            `const version = '${version}';

export {
    version
}
`,
        );
    }
}

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
    const constants = new Constants();
    const fmt = new Build();
    // exec command
    constants.write();
    fmt.exec();
}

main();
