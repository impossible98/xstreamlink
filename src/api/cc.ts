// Update: 2021-12-17
// Example: https://cc.163.com/353198106/
// All: https://cc.163.com/category/live/
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

class CC extends BaseAPI {
    constructor(url: string) {
        super(url);
    }

    getRoomId() {
        return this.url.split('/')[3];
    }

    async getResponse() {
        const response = await axios.get(
            `https://api.cc.163.com/v1/activitylives/anchor/lives?anchor_ccid=${this.getRoomId()}`,
        );

        return response.data;
    }

    async getStreamLink() {
        const response = await this.getResponse();

        if (response.data) {
            const data = response.data;

            if (data[this.getRoomId()].channel_id) {
                const channelId = data[this.getRoomId()].channel_id;
                const response2 = await axios.get(`https://cc.163.com/live/channel/?channelids=${channelId}`);

                streamLink = {
                    state: 0,
                    source: {
                        origin: response2.data.data[0].sharefile,
                    },
                    url: this.url,
                };

                return streamLink;
            } else {
                streamLink = {
                    state: 1,
                    url: this.url,
                };

                return streamLink;
            }
        } else {
            streamLink = {
                state: 1,
                url: this.url,
            };

            return streamLink;
        }
    }

    async exec() {
        super.exec();
    }
}

export { CC };
