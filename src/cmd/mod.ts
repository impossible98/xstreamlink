import * as childProcess from 'child_process';
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
            const value = await __173.getStreamLink();

            console.log(value);
            childProcess.execFile('mpv', [`${JSON.parse(value).source.origin}`]);
        } else if (answer.startsWith('https://www.2cq.com/')) {
            const _2cq = new api._2CQ(answer);
            const value = await _2cq.getStreamLink();

            console.log(value);
            childProcess.execFile('mpv', [`${JSON.parse(value).source.origin}`]);
        } else if (answer.startsWith('https://live.51lm.tv/room/')) {
            const _51lm = new api._51LM(answer);
            const value = await _51lm.getStreamLink();

            console.log(value);
            childProcess.execFile('mpv', [`${JSON.parse(value).source.origin}`]);
        } else if (answer.startsWith('https://cc.163.com/')) {
            const cc = new api.CC(answer);
            const value = await cc.getStreamLink();

            console.log(value);
            childProcess.execFile('mpv', [`${JSON.parse(value).source.origin}`]);
        } else {
            console.log('链接不合法');
        }

        rl.close();
    } else if (process.argv.length === 3) {
        help();
        version();
    }
}
