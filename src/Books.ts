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
        bookName: '',
        bookSeq: '',
        bookFolder: ''
    }
    const re = /https:\/\/learning.oreilly.com\/library\/view\/([a-z-]+)\/(\d+)\//;
    const matches = bookUrl.match(re);
    try {
        book.bookName = matches[1];
        book.bookSeq = matches[2];
        book.bookFolder = book.bookName + '/';

    } catch(error) {
        console.log(`parse book url: ${bookUrl} met error!`);
    }

    return book;
}
export {
    parseBookUrl
}