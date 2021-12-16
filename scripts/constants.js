const fs = require('fs/promises');
const path = require('path');

class Constants {
    constructor() {
        this.namePath = path.join(__dirname, '..', 'src', 'constants', 'name.ts');
        this.versionPath = path.join(__dirname, '..', 'src', 'constants', 'version.ts');
    }

    async getConstants() {
        const data = await fs.readFile('Makefile', 'utf8');
        let appName = data.match(/APP_NAME := (.*)/)[1];
        let binName = data.match(/BIN_NAME := (.*)/)[1];
        let version = data.match(/APP_VERSION := (.*)/)[1];
        let constants = [appName, binName, version];

        return constants;
    }

    async write() {
        const constants = await this.getConstants();

        await fs.writeFile(
            this.namePath,
            `export const appName = '${constants[0]}';
export const binName = '${constants[1]}';
`,
        );
        await fs.writeFile(
            this.versionPath,
            `export const version = '${constants[2]}';
`,
        );
    }
}

function main() {
    const constants = new Constants();
    constants.write();
}

main();

module.exports = {
    Constants,
};
