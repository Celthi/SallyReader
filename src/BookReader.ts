import { parseBookUrl } from './Books';
import fs from 'fs';
import { JSDOM} from 'jsdom';

// chapter url: 'https://learning.oreilly.com/library/view/head-first-design/0596007124/ch11.html';
/*const options = {
    headers: {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
        'cookie': '_gcl_au=1.1.133396938.1567567636; _vwo_uuid_v2=D033E8044EF005855CAE02DA5D7F3148B|8f34d31375c2d007d22c116c534ce1c6; _mkto_trk=id:107-FMS-070&token:_mch-oreilly.com-1567567636226-94813; _ga=GA1.2.1693235207.1567567636; _gid=GA1.2.1962332957.1567567636; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_uuid=D033E8044EF005855CAE02DA5D7F3148B; _vis_opt_exp_166_combi=2; cd_user_id=16cfa500399228-01c23aef07c447-38637501-1aeaa0-16cfa50039a821; BrowserCookie=4b7b3f12-4d28-416f-889c-07a29dafe7f7; csrfsafari=9jw8MdHlI86zQPpZo6phn9T2s3aOUINTzCZAAAToNpsiyZl2JmNo7UJZnyvtHpwF; orm-jwt=eyJhbGciOiAiUlMyNTYifQ.eyJhY2N0cyI6IFsiNTU1YzFkOTgtNDZkYS00NmRlLThjYTAtMDAzMmRiY2M0NmQyIl0sICJlaWRzIjogeyJoZXJvbiI6ICI0OGI4NDdjYy00MTAwLTQwMWEtOTczMi1kMGE5M2YwNmVkMWUifSwgImVudiI6ICJwcm9kdWN0aW9uIiwgImV4cCI6IDE1Njc1NzEyODUsICJpbmRpdmlkdWFsIjogZmFsc2UsICJwZXJtcyI6IHsiYWNhZG0iOiAidiIsICJhcGlkYyI6ICJ2IiwgImNuZnJjIjogInYiLCAiY3ByZXgiOiAidiIsICJjc3N0ZCI6ICJ2IiwgImVwdWJzIjogInYiLCAibHJwdGgiOiAidiIsICJsdnRyZyI6ICJ2IiwgIm9yaW9sIjogInYiLCAicGx5bHMiOiAidiIsICJ1c2FnZSI6ICJjIiwgInVzcnBmIjogImV2IiwgInZpZGVvIjogInYifSwgInN1YiI6ICI4NDA2ZmRhZS03ZWZjLTRhOTAtODAyMS03Y2QyYmVhNmU4OTEifQ.WIbNPjipJCe_Z0eVyg9XSuwkma4i3zF26RxBktF5zUQ0m1czaHAzwauWWOunWbJSWHf7K-WHiBG9oXBjcWck-MjxFw1hcDee37oD0dddxCMFLkDgcRdUtce6l7oVJwS2zWGcKw6wNQ6ow16TyGkDGrtO9oSqfCbuziBa56JRIhk; orm-rt=ab62ebd72aa74ca1bc2a163c33387537; groot_sessionid=r3c6w105g3tg2ib4ovf97exgodybcckh; logged_in=y; kampyleUserSession=1567567695423; kampyleUserSessionsCount=2; kampyleUserPercentile=24.409470673610436; sessionid=em85naukd2uu07ma7l6gmoud4pms7n8b; _ga=GA1.3.1693235207.1567567636; _gid=GA1.3.1962332957.1567567636; recently-viewed=%5B%220596007124%3Ach10.html%22%5D; kampyleSessionPageCounter=3',
        referer: 'https://learning.oreilly.com/home/'
    },
} */

const readBook = (client, path: string, options) => {
    return client.getRequest(path, options);
}

const chaptersFromBook = (bookHtml) => {
    const chapterUrls = [];
    const dom = new JSDOM(bookHtml);
    let chapterUrlNodes = dom.window.document.querySelectorAll('a.t-chapter');
    chapterUrlNodes.forEach((node:HTMLAnchorElement) => {
        chapterUrls.push(node.href);
    })
    return chapterUrls;
}
const readBookCover = async (client, bookUrl: string, options, booksFolder: string) => {
    let book = parseBookUrl(bookUrl);
    let bookResponse = await readBook(client, book.path, options);
    const bookFolder = `${booksFolder}${book.folder}`;
    const bookCover = `${bookFolder}${book.name}.html`;
    fs.mkdirSync(bookFolder, { recursive: true });
    console.log(`read book: ${bookCover}`);
    fs.writeFileSync(bookCover, bookResponse);
    return {book, html: bookResponse};
}
export {
    chaptersFromBook
}
export {
    readBookCover
}
