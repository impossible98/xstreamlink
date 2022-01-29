const fs = require('fs/promises');
const path = require('path');

class Constants {
    constructor() {
        this.namePath = path.join(__dirname, '..', 'src', 'constants', 'name.ts');
        this.versionPath = path.join(__dirname, '..', 'src', 'constants', 'version.ts');
    }

    async getConstants() {
        const makefileData = await fs.readFile('Makefile', 'utf8');
        let appName = makefileData.match(/APP_NAME := (.*)/)[1];
        let binName = makefileData.match(/BIN_NAME := (.*)/)[1];
        let version = makefileData.match(/APP_VERSION := (.*)/)[1];
        let constants = [appName, binName, version];

        return constants;
    }

    async write() {
        const constants = await this.getConstants();
        const pkgData = await fs.readFile('package.json', 'utf8');
        const pkg = JSON.parse(pkgData);

        pkg.version = constants[2];

        await fs.writeFile('package.json', JSON.stringify(pkg, null, 4));

        await fs.writeFile(
            this.namePath,
            `const appName = '${constants[0]}';
const binName = '${constants[1]}';

export {
    appName,
    binName,
}
`,
        );
        await fs.writeFile(
            this.versionPath,
            `const version = '${constants[2]}';

export {
    version
}
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
