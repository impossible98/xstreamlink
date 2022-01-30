import * as childProcess from 'child_process';

import { AppConfig } from '../config/mod';
import { History, HistoryArray } from '../history/mod';
import { datetime } from '../utils/datetime';
const appConfig = new AppConfig();
const config = appConfig.get();
const history = new History();

type Streamlink = {
    datetime?: string;
    state: number;
    source?: Source;
    streamer?: string;
    title?: string;
    url: string;
};

type Source = {
    origin: string;
};

let streamLink: Streamlink;

class BaseAPI {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    async getStreamLink() {
        streamLink = {
            state: 1,
            url: this.url,
        };

        return streamLink;
    }

    async exec() {
        const value = await this.getStreamLink();
        console.log(JSON.stringify(value, null, 4));

        if (value.state === 0) {
            if (config.open && config.player) {
                const historyData: HistoryArray = {
                    history: [{
                        datetime: datetime,
                        url: value.url,
                    }],
                };

                history.write(historyData, value.url);
                childProcess.execFile(config.player, [`${value.source?.origin}`]);
            }
        } else {
            process.exit(0);
        }
    }
}

export { BaseAPI };
