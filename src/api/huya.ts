// Update: 2022-01-29
// Example: https://www.huya.com/820272
// All: https://www.huya.com/l
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

class Huya extends BaseAPI {
    constructor(url: string) {
        super(url);
    }

    getRoomId() {
        return this.url.split('/')[3];
    }

    async getResponse() {
        const response = await axios.get(
            `https://www.huya.com/${this.getRoomId()}`,
        );

        return response.data;
    }

    async getStreamLink() {
        const html = await this.getResponse();

        const result: any = html.match(/(?<=("stream":[\s]*"))(.+?)(?=("[\s]*\}))/g);

        if (result && result.length >= 1) {
            const infoObj: any = JSON.parse(
                Buffer.from(result[0], 'base64').toString('ascii'),
            );
            const streamInfoList: any = infoObj.data[0].gameStreamInfoList;
            const urlInfo1: any = streamInfoList[0];
            const aliFLV = urlInfo1['sFlvUrl'] + '/' + urlInfo1['sStreamName'] + '.flv?' + urlInfo1['sFlvAntiCode'];

            streamLink = {
                state: 0,
                source: {
                    origin: aliFLV.replace(/\amp\;/g, ''),
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
    }

    async exec() {
        super.exec();
    }
}

export { Huya };
