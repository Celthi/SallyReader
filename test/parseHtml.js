'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsdom_1 = require("jsdom");
var fs = require('fs');
var axios_1 = __importDefault(require("axios"));
var config = {
    referrer: 'https://learning.oreilly.com/home/'
};
var url = 'https://learning.oreilly.com/library/view/head-first-design/0596007124/ch10.html';
var configAxios = {
    headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
        'cookie': '_gcl_au=1.1.133396938.1567567636; _vwo_uuid_v2=D033E8044EF005855CAE02DA5D7F3148B|8f34d31375c2d007d22c116c534ce1c6; _mkto_trk=id:107-FMS-070&token:_mch-oreilly.com-1567567636226-94813; _ga=GA1.2.1693235207.1567567636; _gid=GA1.2.1962332957.1567567636; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_uuid=D033E8044EF005855CAE02DA5D7F3148B; _vis_opt_exp_166_combi=2; cd_user_id=16cfa500399228-01c23aef07c447-38637501-1aeaa0-16cfa50039a821; BrowserCookie=4b7b3f12-4d28-416f-889c-07a29dafe7f7; csrfsafari=9jw8MdHlI86zQPpZo6phn9T2s3aOUINTzCZAAAToNpsiyZl2JmNo7UJZnyvtHpwF; orm-jwt=eyJhbGciOiAiUlMyNTYifQ.eyJhY2N0cyI6IFsiNTU1YzFkOTgtNDZkYS00NmRlLThjYTAtMDAzMmRiY2M0NmQyIl0sICJlaWRzIjogeyJoZXJvbiI6ICI0OGI4NDdjYy00MTAwLTQwMWEtOTczMi1kMGE5M2YwNmVkMWUifSwgImVudiI6ICJwcm9kdWN0aW9uIiwgImV4cCI6IDE1Njc1NzEyODUsICJpbmRpdmlkdWFsIjogZmFsc2UsICJwZXJtcyI6IHsiYWNhZG0iOiAidiIsICJhcGlkYyI6ICJ2IiwgImNuZnJjIjogInYiLCAiY3ByZXgiOiAidiIsICJjc3N0ZCI6ICJ2IiwgImVwdWJzIjogInYiLCAibHJwdGgiOiAidiIsICJsdnRyZyI6ICJ2IiwgIm9yaW9sIjogInYiLCAicGx5bHMiOiAidiIsICJ1c2FnZSI6ICJjIiwgInVzcnBmIjogImV2IiwgInZpZGVvIjogInYifSwgInN1YiI6ICI4NDA2ZmRhZS03ZWZjLTRhOTAtODAyMS03Y2QyYmVhNmU4OTEifQ.WIbNPjipJCe_Z0eVyg9XSuwkma4i3zF26RxBktF5zUQ0m1czaHAzwauWWOunWbJSWHf7K-WHiBG9oXBjcWck-MjxFw1hcDee37oD0dddxCMFLkDgcRdUtce6l7oVJwS2zWGcKw6wNQ6ow16TyGkDGrtO9oSqfCbuziBa56JRIhk; orm-rt=ab62ebd72aa74ca1bc2a163c33387537; groot_sessionid=r3c6w105g3tg2ib4ovf97exgodybcckh; logged_in=y; kampyleUserSession=1567567695423; kampyleUserSessionsCount=2; kampyleSessionPageCounter=1; kampyleUserPercentile=24.409470673610436; sessionid=em85naukd2uu07ma7l6gmoud4pms7n8b; _gat=1; _gat_UA-112091926-1=1',
        referer: url,
        accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-origin'
    }
};
describe('parse html to get jpg', function () {
    it.skip('should get all the images', function () {
        var baseUrl = 'https://learning.oreilly.com/home';
        var html = fs.readFileSync('./tmp/ch12.html', { resources: "usable" });
        var dom = new jsdom_1.JSDOM(html);
        var images = dom.window.document.querySelectorAll('img');
        images.forEach(function (img) {
            var imgUrl = baseUrl + img.src;
            var imgLocation = './tmp/books' + img.src;
            var folder = imgLocation.substring(0, imgLocation.lastIndexOf('/'));
            fs.mkdirSync(folder, { recursive: true });
            console.log("Trying to get image: " + imgUrl);
            configAxios.headers[':path'] = img.src;
            axios_1["default"].get(imgUrl, configAxios).then(function (res) {
                fs.writeFile(imgLocation, res.data, function (error) {
                    console.log(error);
                });
            })["catch"](function (error) {
                console.log(error);
            });
        });
    });
});
//# sourceMappingURL=parseHtml.js.map