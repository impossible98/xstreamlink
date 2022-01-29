// Update: 2021-12-17
// Example: https://live.51lm.tv/room/26051
// All: https://live.51lm.tv/programs/Hot
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

class _51LM extends BaseAPI {
    constructor(url: string) {
        super(url);
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

        return streamLink;
    }

    async exec() {
        super.exec();
    }
}

export { _51LM };
