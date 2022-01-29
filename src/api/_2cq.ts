// Update: 2021-12-15
// Example: https://www.2cq.com/933860
// All: https://www.2cq.com/
import axios from 'axios';

import { BaseAPI } from '../utils/api';

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

class _2CQ extends BaseAPI {
    constructor(url: string) {
        super(url);
    }

    getRoomId() {
        return this.url.split('/')[3];
    }

    async getResponse() {
        const response = await axios.get(
            `https://www.2cq.com/proxy/room/room/info?roomId=${this.getRoomId()}&appId=1004`,
        );

        return response.data;
    }

    async getStreamLink() {
        const response = await this.getResponse();

        if (response.status === 1) {
            const result = response.result;
            if (result.liveState === 1) {
                streamLink = {
                    state: 0,
                    source: {
                        origin: result.pullUrl,
                    },
                    streamer: result.nickName,
                    title: result.notice,
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

    async print() {
        super.print();
    }
}

export { _2CQ };
