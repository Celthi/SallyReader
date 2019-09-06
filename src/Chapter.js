"use strict";
exports.__esModule = true;
var parseChapterUrl = function (chapterUrl) {
    var chapter = {
        chapterName: '',
        chapterUrl: '',
        book: ''
    };
    var re = /(https:\/\/learning.oreilly.com)?\/library\/view\/([a-z-]+)\/(\d+)\/([^#]+)/;
    var matches = chapterUrl.match(re);
    try {
        chapter.chapterName = matches[4];
        chapter.chapterUrl = matches[0];
        chapter.book = matches[2];
    }
    catch (error) {
        console.log("parse book url: " + chapterUrl + " met error!");
    }
    return chapter;
};
exports.parseChapterUrl = parseChapterUrl;
//# sourceMappingURL=Chapter.js.map