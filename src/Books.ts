/*
./books/
--bookname/
----chapterNo.html 
----libary/

*/

// turn book url into book structure

// book url: https://learning.oreilly.com/library/view/head-first-design/0596007124/
const parseBookUrl = (bookUrl: string) => {
    const book = {
        name: '',
        seq: '',
        folder: '',
        path: ''

    }
    const re = /https:\/\/learning.oreilly.com(\/library\/view\/([a-z-]+)\/(\d+)\/)/;
    const matches = bookUrl.match(re);
    try {
        book.name = matches[2];
        book.seq = matches[3];
        book.folder = book.name + '/';
        book.path = matches[1]

    } catch(error) {
        console.log(`parse book url: ${bookUrl} met error!`);
    }
    return book;
}
export {
    parseBookUrl
}