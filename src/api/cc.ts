// Update: 2021-12-17
// Example: https://cc.163.com/353198106/
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

export class CC {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    getRoomId() {
        return this.url.split('/')[3];
    }

    async getStreamLink() {
        const response = await axios.get(
            `https://api.cc.163.com/v1/activitylives/anchor/lives?anchor_ccid=${this.getRoomId()}`,
        );

        if (response.data.data) {
            const data = response.data.data;
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