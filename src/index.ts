'use strict';

import { chaptersFromBook, readBookCover } from './BookReader';
import { readChapter } from './ChapterReader';
import { Http2Request } from './util/Http2Request';
import {checkExistingImages} from './ImageReader';

import Client from './Client';
const main = async () => {
    const bookUrl = 'https://learning.oreilly.com/library/view/head-first-design/0596007124/';
    const url = 'https://learning.oreilly.com';
    const options = {
        host: 'learning.oreilly.com',
        protocol: 'https:',
        method: 'GET',
        //path: '',
        headers: {
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
            //'cookie': 'csrfsafari=V4Er5cjty6FJbypeyO3J4ga1XpVBzTVdzbKFfYtYdLRz8Pxex8rPMjT8Oxo9qczx; BrowserCookie=e6a4817e-1695-4a36-8f0c-5038731a17b0; _gcl_au=1.1.1257735920.1567577353; _ga=GA1.2.1815409258.1567577354; _gid=GA1.2.1613599140.1567577354; _mkto_trk=id:107-FMS-070&token:_mch-oreilly.com-1567577353855-61145; cd_user_id=16cfae4667926d-0714cf0d48a07-38637501-1aeaa0-16cfae4667a804; orm-jwt=eyJhbGciOiAiUlMyNTYifQ.eyJhY2N0cyI6IFsiNTU1YzFkOTgtNDZkYS00NmRlLThjYTAtMDAzMmRiY2M0NmQyIl0sICJlaWRzIjogeyJoZXJvbiI6ICI0OGI4NDdjYy00MTAwLTQwMWEtOTczMi1kMGE5M2YwNmVkMWUifSwgImVudiI6ICJwcm9kdWN0aW9uIiwgImV4cCI6IDE1Njc1ODExMTksICJpbmRpdmlkdWFsIjogZmFsc2UsICJwZXJtcyI6IHsiYWNhZG0iOiAidiIsICJhcGlkYyI6ICJ2IiwgImNuZnJjIjogInYiLCAiY3ByZXgiOiAidiIsICJjc3N0ZCI6ICJ2IiwgImVwdWJzIjogInYiLCAibHJwdGgiOiAidiIsICJsdnRyZyI6ICJ2IiwgIm9yaW9sIjogInYiLCAicGx5bHMiOiAidiIsICJ1c2FnZSI6ICJjIiwgInVzcnBmIjogImV2IiwgInZpZGVvIjogInYifSwgInN1YiI6ICI4NDA2ZmRhZS03ZWZjLTRhOTAtODAyMS03Y2QyYmVhNmU4OTEifQ.oNbhQxr1iwJpWZeVSUHkHjCCxjwQ0ZOmdfzoxuvvAe19U_X6HsHoEfk665HopCESkderqMQ_gvs1AeKq-08clcdK9OSbzpA9t-qAGEhDRHFh33FGTgxbyY2mKV7g4UpwHjLPkFM97jm37jzbla2mWpUCOkpxQAp67hB2Z5QhSYE; orm-rt=a2404d4926284437baf7f26098092b81; groot_sessionid=w36xgzxv6mregqzyzprqvpv7u4ou5emm; logged_in=y; sessionid=pum1r5ojazu07cvzngacinommvlyxu42; kampyle_userid=0f2f-4cb9-f304-4d1b-8856-bc6c-9c48-8c19; kampyleUserSession=1567577590055; kampyleUserSessionsCount=1; kampyleSessionPageCounter=1; kampyleUserPercentile=8.305180309136539',
            'cookie': '_gcl_au=1.1.133396938.1567567636; _vwo_uuid_v2=D033E8044EF005855CAE02DA5D7F3148B|8f34d31375c2d007d22c116c534ce1c6; _mkto_trk=id:107-FMS-070&token:_mch-oreilly.com-1567567636226-94813; _ga=GA1.2.1693235207.1567567636; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_uuid=D033E8044EF005855CAE02DA5D7F3148B; _vis_opt_exp_166_combi=2; cd_user_id=16cfa500399228-01c23aef07c447-38637501-1aeaa0-16cfa50039a821; BrowserCookie=4b7b3f12-4d28-416f-889c-07a29dafe7f7; csrfsafari=9jw8MdHlI86zQPpZo6phn9T2s3aOUINTzCZAAAToNpsiyZl2JmNo7UJZnyvtHpwF; orm-rt=ab62ebd72aa74ca1bc2a163c33387537; groot_sessionid=r3c6w105g3tg2ib4ovf97exgodybcckh; logged_in=y; sessionid=em85naukd2uu07ma7l6gmoud4pms7n8b; _ga=GA1.3.1693235207.1567567636; _gid=GA1.3.1199747008.1567739412; _gid=GA1.2.1199747008.1567739412; recently-viewed=%5B%220596007124%22%5D; kampyleUserSession=1567822548209; kampyleUserSessionsCount=9; kampyleSessionPageCounter=1; _gat=1; _gat_UA-112091926-1=1',
            referer: url,
            ':authority': 'learning.oreilly.com',
            ':method': 'GET',
            ':scheme': 'https',
            ':path': '',
            // accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
            // 'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'en-US,en;q=0.9',
            //'sec-fetch-mode': 'no-cors',
            //'sec-fetch-site': 'same-origin'
        }
    };
    const booksFolder = './books/';
    const processPaths =  checkExistingImages(booksFolder)
    const client = new Client(new Http2Request('https://learning.oreilly.com', options), processPaths);
    //const client =new Http2Request('https://learning.oreilly.com', options);

    try {


        const book = await readBookCover(client, bookUrl, options, booksFolder);
        for (const chapterUrl of chaptersFromBook(book.html)) {
            try {
                await readChapter(client, chapterUrl, options, booksFolder);
            } catch (error) {
                console.log(error.message);
            }
        };

    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }
}
main();