const childProcess = require('child_process');
const readline = require('readline');
const process = require('process');

const { Constants } = require('./constants');

const constants = new Constants();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Tag {
    question(query) {
        return new Promise(function(resolve) {
            return rl.question(query, function(answer) {
                return resolve(answer);
            });
        });
    }

    async exec() {
        childProcess.exec('git add --all');
        let answer;
        let answer2;

        answer = await this.question('Please input your tag message: ');

        console.log(`${answer}`);
        answer2 = await this.question('Are you sure to git commit? (y/N) ');

        if (answer2.toLowerCase() === 'y') {
            constants.getConstants().then(function(value) {
                childProcess.exec(`git tag -a v${value[2]} -m "${answer}"`);
            });
        }

        rl.close();
    }
}
const commit = new Tag();

function main() {
    commit.exec();
}

main();
