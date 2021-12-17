// Update: 2021-12-15
// Example: https://www.2cq.com/932285
import axios from 'axios';

type Streamlink = {
    state: number;
    source?: Source;
    streamer?: string;
    title?: string;
    url?: string;
};

type Source = {
    origin?: string;
};

let streamLink: Streamlink;

export class _2CQ {
    url: string;

    constructor(url: string) {
        this.url = url;
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

                return JSON.stringify(streamLink, null, 4);
            } else {
                streamLink = {
                    state: 1,
                    url: this.url,
                };

                return JSON.stringify(streamLink, null, 4);
            }
        } else {
            streamLink = {
                state: 1,
                url: this.url,
            };

            return JSON.stringify(streamLink, null, 4);
        }
    }
}
