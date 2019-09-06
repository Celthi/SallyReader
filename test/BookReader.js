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
exports.__esModule = true;
var BookReader_1 = require("../src/BookReader");
describe('read book', function () {
    it('should read book', function () { return __awaiter(void 0, void 0, void 0, function () {
        var bookUrl, options, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    bookUrl = 'https://learning.oreilly.com/library/view/head-first-design/0596007124/';
                    options = {
                        headers: {
                            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
                            'cookie': '_gcl_au=1.1.133396938.1567567636; _vwo_uuid_v2=D033E8044EF005855CAE02DA5D7F3148B|8f34d31375c2d007d22c116c534ce1c6; _mkto_trk=id:107-FMS-070&token:_mch-oreilly.com-1567567636226-94813; _ga=GA1.2.1693235207.1567567636; _gid=GA1.2.1962332957.1567567636; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_uuid=D033E8044EF005855CAE02DA5D7F3148B; _vis_opt_exp_166_combi=2; cd_user_id=16cfa500399228-01c23aef07c447-38637501-1aeaa0-16cfa50039a821; BrowserCookie=4b7b3f12-4d28-416f-889c-07a29dafe7f7; csrfsafari=9jw8MdHlI86zQPpZo6phn9T2s3aOUINTzCZAAAToNpsiyZl2JmNo7UJZnyvtHpwF; orm-jwt=eyJhbGciOiAiUlMyNTYifQ.eyJhY2N0cyI6IFsiNTU1YzFkOTgtNDZkYS00NmRlLThjYTAtMDAzMmRiY2M0NmQyIl0sICJlaWRzIjogeyJoZXJvbiI6ICI0OGI4NDdjYy00MTAwLTQwMWEtOTczMi1kMGE5M2YwNmVkMWUifSwgImVudiI6ICJwcm9kdWN0aW9uIiwgImV4cCI6IDE1Njc1NzEyODUsICJpbmRpdmlkdWFsIjogZmFsc2UsICJwZXJtcyI6IHsiYWNhZG0iOiAidiIsICJhcGlkYyI6ICJ2IiwgImNuZnJjIjogInYiLCAiY3ByZXgiOiAidiIsICJjc3N0ZCI6ICJ2IiwgImVwdWJzIjogInYiLCAibHJwdGgiOiAidiIsICJsdnRyZyI6ICJ2IiwgIm9yaW9sIjogInYiLCAicGx5bHMiOiAidiIsICJ1c2FnZSI6ICJjIiwgInVzcnBmIjogImV2IiwgInZpZGVvIjogInYifSwgInN1YiI6ICI4NDA2ZmRhZS03ZWZjLTRhOTAtODAyMS03Y2QyYmVhNmU4OTEifQ.WIbNPjipJCe_Z0eVyg9XSuwkma4i3zF26RxBktF5zUQ0m1czaHAzwauWWOunWbJSWHf7K-WHiBG9oXBjcWck-MjxFw1hcDee37oD0dddxCMFLkDgcRdUtce6l7oVJwS2zWGcKw6wNQ6ow16TyGkDGrtO9oSqfCbuziBa56JRIhk; orm-rt=ab62ebd72aa74ca1bc2a163c33387537; groot_sessionid=r3c6w105g3tg2ib4ovf97exgodybcckh; logged_in=y; kampyleUserSession=1567567695423; kampyleUserSessionsCount=2; kampyleUserPercentile=24.409470673610436; sessionid=em85naukd2uu07ma7l6gmoud4pms7n8b; _ga=GA1.3.1693235207.1567567636; _gid=GA1.3.1962332957.1567567636; recently-viewed=%5B%220596007124%3Ach10.html%22%5D; kampyleSessionPageCounter=3',
                            referer: 'https://learning.oreilly.com/home/'
                        }
                    };
                    _a = BookReader_1.chaptersFromBook;
                    return [4, BookReader_1.readBookCover(bookUrl, options, './books/')];
                case 1:
                    _a.apply(void 0, [_b.sent()]).forEach((function (element) {
                        console.log(element);
                    }));
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=BookReader.js.map