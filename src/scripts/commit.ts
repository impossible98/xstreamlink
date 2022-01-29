import * as childProcess from 'child_process';
import * as process from 'process';
import * as readline from 'readline';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Commit {
    type: string[];

    constructor() {
        this.type = ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'];
    }

    question(query: string) {
        return new Promise(function (resolve) {
            return rl.question(query, function (answer) {
                return resolve(answer);
            });
        });
    }

    async exec() {
        childProcess.exec('git add --all');
        const answer: string | any = await this.question(`Please input your commit type (${this.type}): `);
        let answer2: string | any = await this.question('Please input your commit scope: ');
        const answer3: string | any = await this.question('Please input your commit message: ');
        const answer4: string | any = await this.question('Are you sure to git commit? (y/N) ');

        for (; true;) {
            if (this.type.indexOf(answer) !== -1) {
                break;
            }
        }

        if (answer2 !== '') {
            answer2 = '(' + answer2 + ')';
        }

        for (; true;) {
            if (answer3.trim().length !== 0) {
                break;
            }
        }

        console.log(`${answer}${answer2}: ${answer3.trim()}`);

        if (answer4.toLowerCase() === 'y') {
            childProcess.exec(`git commit -m "${answer}${answer2}: ${answer3.trim()}"`);
        }

        rl.close();
    }
}

const commit = new Commit();

function main() {
    commit.exec();
}

main();
