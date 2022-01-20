const fs = require('fs/promises');
const path = require('path');

class Color {
    static green(word) {
        return `\x1B[32m${word}\x1B[0m`;
    }
    static red(word) {
        return `\x1B[31m${word}\x1B[0m`;
    }

    static yellow(word) {
        return `\x1B[33m${word}\x1B[0m`;
    }
}

class All {
    async getConstants() {
        const makefilePath = path.resolve(__dirname, '..', 'Makefile');
        const data = await fs.readFile(makefilePath, 'UTF-8');
        const appName = data.match(/APP_NAME := (.*)/)[1];
        const version = data.match(/APP_VERSION := (.*)/)[1];

        return [appName, version];
    }

    async print() {
        const value = await this.getConstants();
        console.log(`Building ${Color.green(value[0])} ${Color.yellow(value[1])}`);
        console.log(`Show help in \`${Color.red('make help')}\``);
    }
}

function main() {
    const all = new All();
    all.print();
}

main();
