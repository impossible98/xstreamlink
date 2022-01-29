import * as fs from 'fs/promises';
import * as path from 'path';

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

class All {
    async getConstants() {
        const makefilePath = path.join(__dirname, '..', 'Makefile');
        const data = await fs.readFile(makefilePath, 'utf-8');
        const appName = data.match(/APP_NAME := (.*)/)[1];
        const version = data.match(/APP_VERSION := (.*)/)[1];

        return [appName, version];
    }

    async print() {
        const value = await this.getConstants();
        const [appName, version] = value

        console.log(`Building ${Color.green(appName)} ${Color.yellow(version)}`);
        console.log(`Show help in \`${Color.red('make help')}\``);
    }
}

function main() {
    const all = new All();
    all.print();
}

main();
