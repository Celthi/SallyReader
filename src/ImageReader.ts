const http2 = require('http2-wrapper');
import fs from 'fs';
import { pause } from './util/pause';

class ImageReader {
    client;
    constructor(url, options) {
        this.client = http2.connect(url, options);
    }
    getImage(imageUrl, options) {
        return new Promise((resolve, reject) => {
            options = Object.assign({}, options);
            options.headers[':path'] = imageUrl;
            const res = this.client.request(options.headers, options);
            const body = [];
            res.on('data', chunk => {
                body.push(chunk);
            });
            res.on('end', (pon) => {
                resolve(Buffer.concat(body));
            });
        });
    }
}
const readImages = async (chapterUrl, imageNodes, options) => {
    // todo: use chapterUrl to get url
    const imageReader = new ImageReader('https://learning.oreilly.com', options);
    imageNodes.forEach(async (element) => {
        const imageUrl = element.src;

        await pause(100);
        imageReader.getImage(imageUrl, options).then(image => {
            const imgLocation = './books' + imageUrl;
            const folder = imgLocation.substring(0, imgLocation.lastIndexOf('/'));
            fs.mkdirSync(folder, { recursive: true });
            console.log(`Trying to get image: ${imageUrl}`);
            fs.writeFileSync(imgLocation, image);
        });
    });
}

export { readImages, ImageReader }