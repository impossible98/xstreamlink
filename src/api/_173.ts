// Update: 2021-12-16
// Example: https://www.173.com/8
import axios from 'axios';

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

export class _173 {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    getRoomId() {
        return this.url.split('/')[3];
    }

    async getStreamLink() {
        const response = await axios.get(`https://www.173.com/room/getVieoUrl`, {
            params: {
                roomId: this.getRoomId(),
                format: 'm3u8',
            },
        });

        if (response.data.data) {
            const data = response.data.data;

            if (data.status === 2) {
                streamLink = {
                    state: 0,
                    source: {
                        origin: data.url,
                    },
                    url: this.url,
                };
            } else {
                streamLink = {
                    state: 1,
                    url: this.url,
                };

                return JSON.stringify(streamLink, null, 4);
            }
            return JSON.stringify(streamLink, null, 4);
        } else {
            streamLink = {
                state: 1,
                url: this.url,
            };

            return JSON.stringify(streamLink, null, 4);
        }
    }
}
