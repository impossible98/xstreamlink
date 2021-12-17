// Update: 2021-12-17
// Example: https://live.51lm.tv/room/26051
// All: https://live.51lm.tv/programs/Hot
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

export class _51LM {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    getRoomId() {
        return this.url.split('/')[4];
    }

    async getStreamLink() {
        streamLink = {
            state: 0,
            source: {
                origin: `http://aliyun-hls.51lm.tv/lingmeng/${this.getRoomId()}.m3u8`,
            },
            url: this.url,
        };

        return JSON.stringify(streamLink, null, 4);
    }
}
