// Update: 2021-12-16
// Example: https://www.173.com/8
// All: https://www.173.com/room/category?categoryId=11

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
    origin?: string;
};

let streamLink: Streamlink;

class _173 extends BaseAPI {
    constructor(url: string) {
        super(url);
    }

    private getRoomId() {
        return this.url.split('/')[3];
    }

    private async getResponse() {
        const response = await axios.get(`https://www.173.com/room/getVieoUrl`, {
            params: {
                roomId: this.getRoomId(),
                format: 'm3u8',
            },
        });

        return response.data;
    }

    async getStreamLink() {
        const response = await this.getResponse();

        if (response.data) {
            const data = response.data;

            if (data.status === 2) {
                streamLink = {
                    state: 0,
                    source: {
                        origin: data.url,
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

    async print() {
        super.print();
    }
}

export { _173 };
