import * as fs from 'fs/promises';

import { historyPath } from '../config/init';
import { datetime } from '../utils/datetime';

type HistoryArray = {
    history: HistoryValue[];
};

type HistoryValue = {
    datetime: string;
    url: string;
};

class History {
    async exsit() {
        if (!fs.access(historyPath)) {
            return false;
        } else {
            return true;
        }
    }

    async read() {
        if (!this.exsit()) {
            await fs.mkdir(historyPath, {
                recursive: true,
            });
        }
        const data = await fs.readFile(historyPath, 'utf8');
        return data;
    }

    async write(value: HistoryArray) {
        if (!this.exsit()) {
            await fs.mkdir(historyPath, {
                recursive: true,
            });
        }
        if (await this.read() === '') {
            await fs.writeFile(historyPath, JSON.stringify(value, null, 4) + '\n');
        } else {
            let historyData = JSON.parse(await this.read());
            historyData.history = historyData.history.concat(value.history);

            await fs.writeFile(historyPath, JSON.stringify(historyData, null, 4) + '\n');
        }
    }
}

export { datetime, History, HistoryArray };
