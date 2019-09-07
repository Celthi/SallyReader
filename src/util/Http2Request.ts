import http2 from 'http2';
class Http2Request {
    client;
    constructor(url, options) {
        this.client = http2.connect(url, options);
    }
    getRequest(path, options) {
        return new Promise((resolve, reject) => {
            options.headers[':path'] = path;
            const req = this.client.request(options.headers, options);
            let body = [];
            req.on('data', data => {
                body.push(data);
            });
            req.setTimeout(50000, () => {
                console.log('time out in 50s');
                reject('time out in 50s');
            });

            req.on('end', () => {        
                resolve(Buffer.concat(body));
            });
            req.on('error', (error)=> {
                console.log(error.message);
                reject('error happen');
            })
            req.end();
        });
    }
    close() {
        this.client.close();
    }
}
export {
    Http2Request,
}