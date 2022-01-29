import * as process from 'process';

import { History } from '../history/mod';

const _history = new History();

async function history() {
    if (!await _history.exsit()) {
        console.log('No history.');
    } else {
        const historyData = await _history.read();

        for (const i in JSON.parse(historyData).history) {
            console.log(`${JSON.parse(historyData).history[i].datetime} - ${JSON.parse(historyData).history[i].url}`);
        }
    }
    process.exit(0);
}

export { history };
