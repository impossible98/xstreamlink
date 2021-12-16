const { Constants } = require('./constants');

const constants = new Constants();

class All {
    print() {
        constants.getConstants().then(function(value) {
            console.log('Building ' + value[0] + ' ' + value[2]);
            console.log('Show help in `make help`');
        });
    }
}

function main() {
    const all = new All();
    all.print();
}

main();
