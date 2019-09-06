"use strict";
exports.__esModule = true;
var parseBookUrl = function (bookUrl) {
    var book = {
        bookName: '',
        bookSeq: '',
        bookFolder: ''
    };
    var re = /https:\/\/learning.oreilly.com\/library\/view\/([a-z-]+)\/(\d+)\//;
    var matches = bookUrl.match(re);
    try {
        book.bookName = matches[1];
        book.bookSeq = matches[2];
        book.bookFolder = book.bookName + '/';
    }
    catch (error) {
        console.log("parse book url: " + bookUrl + " met error!");
    }
    return book;
};
exports.parseBookUrl = parseBookUrl;
//# sourceMappingURL=Books.js.map