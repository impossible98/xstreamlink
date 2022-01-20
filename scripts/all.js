const fs = require('fs/promises');

class All {
    async getConstants() {
        const data = await fs.readFile('Makefile', 'UTF-8');
        let appName = data.match(/APP_NAME := (.*)/)[1];
        let version = data.match(/APP_VERSION := (.*)/)[1];
        let constants = [appName, version];

        return constants;
    }

    async print() {
        const value = await this.getConstants();
        console.log('Building ' + value[0] + ' ' + value[1]);
        console.log('Show help in `make help`');
    }
}

function main() {
    const all = new All();
    all.print();
}

main();
