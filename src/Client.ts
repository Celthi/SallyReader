
class Client {
    http2Request;
    collection;
    constructor(http2Request, collection) {
        this.http2Request = http2Request;
        this.collection = collection;
    }
    getRequest(path, options) {
        this.http2Request.getRequest(path, options);
    }
    add(path) {
        this.collection.add(path);
    }
    close() {
        this.http2Request.close();
    }
    has(path) {
        return this.collection.has(path);
    }
}
export default Client;