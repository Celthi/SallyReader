const http2 = require('http2-wrapper');
import fs from 'fs';

class ImageReader {
    client;
    constructor(url, options) {
        this.client = http2.connect(url, options);
    }
    getImage(imageUrl, options) {
        return new Promise((resolve, reject) => {
            options = Object.assign({}, options);
            options.headers[':path'] = imageUrl;
            const req = this.client.request(options.headers, options);
            const body = [];
            req.on('data', chunk => {
                body.push(chunk);
            });
            req.setTimeout(50000, () => {
                console.log('time out in 50s');
            });
            req.on('end', () => {        
                resolve(Buffer.concat(body));
            });
            req.on('error', (error)=> {
                console.log(error.message);
            })
        });
    }
    close() {
        this.client.close();
    }
}
const readImages = async (chapterUrl, imageNodes, options) => {
    // todo: use chapterUrl to get url
    const imageReader = new ImageReader('https://learning.oreilly.com', options);
    for(const element of imageNodes) {
        const imageUrl = element.src;
        try {
            const image = await imageReader.getImage(imageUrl, options);
            const imgLocation = './books' + imageUrl;
            const folder = imgLocation.substring(0, imgLocation.lastIndexOf('/'));
            fs.mkdirSync(folder, { recursive: true });
            console.log(`Get image: ${imageUrl}`);
            fs.writeFileSync(imgLocation, image);
        } catch(error) {
            console.log(error.message);
        }
    };
}

export { readImages, ImageReader }