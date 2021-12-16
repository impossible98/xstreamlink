import * as process from 'process';
import * as readline from 'readline';

import { api } from '../lib';
import { help } from './help';
import { version } from './version';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function question(query: string): Promise<string> {
    return new Promise(function(resolve) {
        return rl.question(query, function(answer) {
            return resolve(answer);
        });
    });
}

export async function main() {
    if (process.argv.length === 2) {
        let answer = await question('请输入直播间链接: ');
        answer = answer.trim();

        if (answer.startsWith('https://www.173.com/')) {
            const __173 = new api._173(answer);

            __173.getStreamLink().then(
                function(value) {
                    console.log(value);
                },
            );
        } else if (answer.startsWith('https://www.2cq.com/')) {
            const _2cq = new api._2CQ(answer);

            _2cq.getStreamLink().then(
                function(value) {
                    console.log(value);
                },
            );
        } else if (answer.startsWith('https://cc.163.com/')) {
            const cc = new api.CC(answer);

            cc.getStreamLink().then(
                function(value) {
                    console.log(value);
                },
            );
        } else {
            console.log('链接不合法');
        }

        rl.close();
    } else if (process.argv.length === 3) {
        help();
        version();
    }
}
