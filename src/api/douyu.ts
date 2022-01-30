// Update: 2022-01-30
// Example: https://www.douyu.com/290935
// All: https://www.douyu.com/directory/all
import axios from 'axios';

import { BaseAPI } from '../utils/api';

type Streamlink = {
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

class Douyu extends BaseAPI {
    constructor(url: string) {
        super(url);
    }

    getRoomId() {
        return this.url.split('/')[3];
    }

    async getResponse() {
        const response = await axios.get(
            `http://api.pyduck.com/live-api/get-url`,
            {
                params: {
                    live_platform: '斗鱼',
                    parameter: this.getRoomId(),
                },
            },
        );

        return response.data;
    }

    async getStreamLink() {
        const response = await this.getResponse();

        streamLink = {
            state: 0,
            source: {
                origin: response.data.flv,
            },
            url: this.url,
        };

        return streamLink;
    }

    async exec() {
        super.exec();
    }
}

export { Douyu };
