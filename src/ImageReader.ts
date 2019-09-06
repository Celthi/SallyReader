const http2 = require('http2-wrapper');
import fs from 'fs';

const options = {
    hostname: 'learning.oreilly.com',
    protocol: 'https:',
    method: 'GET',
    path: '',
    headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
        'cookie': '_gcl_au=1.1.133396938.1567567636; _vwo_uuid_v2=D033E8044EF005855CAE02DA5D7F3148B|8f34d31375c2d007d22c116c534ce1c6; _mkto_trk=id:107-FMS-070&token:_mch-oreilly.com-1567567636226-94813; _ga=GA1.2.1693235207.1567567636; _gid=GA1.2.1962332957.1567567636; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_uuid=D033E8044EF005855CAE02DA5D7F3148B; _vis_opt_exp_166_combi=2; cd_user_id=16cfa500399228-01c23aef07c447-38637501-1aeaa0-16cfa50039a821; BrowserCookie=4b7b3f12-4d28-416f-889c-07a29dafe7f7; csrfsafari=9jw8MdHlI86zQPpZo6phn9T2s3aOUINTzCZAAAToNpsiyZl2JmNo7UJZnyvtHpwF; orm-jwt=eyJhbGciOiAiUlMyNTYifQ.eyJhY2N0cyI6IFsiNTU1YzFkOTgtNDZkYS00NmRlLThjYTAtMDAzMmRiY2M0NmQyIl0sICJlaWRzIjogeyJoZXJvbiI6ICI0OGI4NDdjYy00MTAwLTQwMWEtOTczMi1kMGE5M2YwNmVkMWUifSwgImVudiI6ICJwcm9kdWN0aW9uIiwgImV4cCI6IDE1Njc1NzEyODUsICJpbmRpdmlkdWFsIjogZmFsc2UsICJwZXJtcyI6IHsiYWNhZG0iOiAidiIsICJhcGlkYyI6ICJ2IiwgImNuZnJjIjogInYiLCAiY3ByZXgiOiAidiIsICJjc3N0ZCI6ICJ2IiwgImVwdWJzIjogInYiLCAibHJwdGgiOiAidiIsICJsdnRyZyI6ICJ2IiwgIm9yaW9sIjogInYiLCAicGx5bHMiOiAidiIsICJ1c2FnZSI6ICJjIiwgInVzcnBmIjogImV2IiwgInZpZGVvIjogInYifSwgInN1YiI6ICI4NDA2ZmRhZS03ZWZjLTRhOTAtODAyMS03Y2QyYmVhNmU4OTEifQ.WIbNPjipJCe_Z0eVyg9XSuwkma4i3zF26RxBktF5zUQ0m1czaHAzwauWWOunWbJSWHf7K-WHiBG9oXBjcWck-MjxFw1hcDee37oD0dddxCMFLkDgcRdUtce6l7oVJwS2zWGcKw6wNQ6ow16TyGkDGrtO9oSqfCbuziBa56JRIhk; orm-rt=ab62ebd72aa74ca1bc2a163c33387537; groot_sessionid=r3c6w105g3tg2ib4ovf97exgodybcckh; logged_in=y; kampyleUserSession=1567567695423; kampyleUserSessionsCount=2; kampyleSessionPageCounter=1; kampyleUserPercentile=24.409470673610436; sessionid=em85naukd2uu07ma7l6gmoud4pms7n8b; _gat=1; _gat_UA-112091926-1=1',
        referer: '',
        ':authority': 'learning.oreilly.com',
        ':method': 'GET',
        ':scheme': 'https',
        ':path': '',
        accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'sec-fetch-mode': 'no-cors',
        //'sec-fetch-site': 'same-origin'
    }
};

const buildOptions = (chaperUrl: string, imageUrl: string, headers) => {
    options.headers[':path'] = imageUrl;
    options.headers.cookie = headers.cookie;
    options.path = imageUrl;
    options.headers.referer = chaperUrl;
    return options;
}
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
const getImage = (chapterUrl: string, imageUrl: string, headers) => {

    const options = buildOptions(chapterUrl, imageUrl, headers);
    return new Promise((resolve, reject) => {
        const request = http2.request(options, response => {
            console.log('statusCode:', response.statusCode);
            console.log('headers:', response.headers);
            if (response.statusCode != 200 && response.statusCode != 304) {
                reject(`get image response code is ${response.statusCode}`);
            }
            const body = [];
            response.on('data', chunk => {
                body.push(chunk);
            });
            response.on('end', () => {
                resolve(Buffer.concat(body));
            });
        });

        request.on('error', (e: Error) => {
            console.error(e);
            reject(e);
        });
        request.end(''); // send out the request
    });
}
const readImages = async (chapterUrl, imageNodes, options) => {
    const imageReader = new ImageReader('https://learning.oreilly.com', options);
    imageNodes.forEach(async (element) => {
        const imageUrl = element.src;
        const pause = (time: number) => {
            return new Promise((resolve, reject) => {
                setTimeout(resolve, time);
            })
        }
        await pause(100);
        imageReader.getImage(chapterUrl, imageUrl).then(image => {
            const imgLocation = './books' + imageUrl;
            const folder = imgLocation.substring(0, imgLocation.lastIndexOf('/'));
            fs.mkdirSync(folder, { recursive: true });
            console.log(`Trying to get image: ${imageUrl}`);
            fs.writeFileSync(imgLocation, image);
        });
    });
}

export { readImages, ImageReader }