"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http2 = require('http2-wrapper');
var fs_1 = __importDefault(require("fs"));
var pause_1 = require("./util/pause");
var ImageReader = (function () {
    function ImageReader(url, options) {
        this.client = http2.connect(url, options);
    }
    ImageReader.prototype.getImage = function (imageUrl, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            options = Object.assign({}, options);
            options.headers[':path'] = imageUrl;
            var res = _this.client.request(options.headers, options);
            var body = [];
            res.on('data', function (chunk) {
                body.push(chunk);
            });
            res.on('end', function (pon) {
                resolve(Buffer.concat(body));
            });
        });
    };
    return ImageReader;
}());
exports.ImageReader = ImageReader;
var readImages = function (chapterUrl, imageNodes, options) { return __awaiter(void 0, void 0, void 0, function () {
    var imageReader;
    return __generator(this, function (_a) {
        imageReader = new ImageReader('https://learning.oreilly.com', options);
        imageNodes.forEach(function (element) { return __awaiter(void 0, void 0, void 0, function () {
            var imageUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        imageUrl = element.src;
                        return [4, pause_1.pause(100)];
                    case 1:
                        _a.sent();
                        imageReader.getImage(imageUrl, options).then(function (image) {
                            var imgLocation = './books' + imageUrl;
                            var folder = imgLocation.substring(0, imgLocation.lastIndexOf('/'));
                            fs_1["default"].mkdirSync(folder, { recursive: true });
                            console.log("Trying to get image: " + imageUrl);
                            fs_1["default"].writeFileSync(imgLocation, image);
                        });
                        return [2];
                }
            });
        }); });
        return [2];
    });
}); };
exports.readImages = readImages;
//# sourceMappingURL=ImageReader.js.map