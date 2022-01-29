import * as childProcess from 'child_process';

import { AppConfig } from '../config/mod';

const appConfig = new AppConfig();
const config = appConfig.getConfig();

type Streamlink = {
    state: number;
    source?: Source;
    streamer?: string;
    title?: string;
    url?: string;
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

    async print() {
        const value = await this.getStreamLink();
        console.log(JSON.stringify(value, null, 4));

        if (value.state === 0) {
            if (config.open && config.player) {
                childProcess.execFile(config.player, [`${value.source?.origin}`]);
            }
        } else {
            process.exit(0);
        }
    }
}

export { BaseAPI };
