import * as process from 'process';
import * as readline from 'readline';

import { api } from '../lib';

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

async function main() {
    let answer = await question('请输入直播间链接: ');
    answer = answer.trim();

    if (answer.startsWith('https://www.173.com/')) {
        const __173 = new api._173(answer);

        __173.exec();
    } else if (answer.startsWith('https://www.2cq.com/')) {
        const _2cq = new api._2CQ(answer);

        _2cq.exec();
    } else if (answer.startsWith('https://live.51lm.tv/room/')) {
        const _51lm = new api._51LM(answer);

        _51lm.exec();
    } else if (answer.startsWith('https://cc.163.com/')) {
        const cc = new api.CC(answer);

        cc.exec();
    } else if (answer.startsWith('https://www.huya.com/')) {
        const huya = new api.Huya(answer);

        huya.exec();
    } else {
        console.log('链接不合法');
    }

    rl.close();
}

export { main };
