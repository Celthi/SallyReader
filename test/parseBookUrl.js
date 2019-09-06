"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Books_1 = require("../src/Books");
const Chapter_1 = require("../src/Chapter");
const chai_1 = __importDefault(require("chai"));
describe('parse book', () => {
    it('should parse book', () => {
        const book = Books_1.parseBookUrl('https://learning.oreilly.com/library/view/head-first-design/0596007124/');
        console.log(book);
        chai_1.default.assert.deepEqual(book, {
            bookName: 'head-first-design',
            bookSeq: '0596007124',
            bookFolder: 'head-first-design/'
        });
    });
    it('should parse chapter url', () => {
        const chapter = Chapter_1.parseChapterUrl('/library/view/head-first-design/0596007124/ch09.html#reworking_the_diner_menu_with_iterator');
        console.log(chapter);
        chai_1.default.assert.deepEqual(chapter, {
            chapterName: 'ch09.html',
            chapterUrl: '/library/view/head-first-design/0596007124/ch09.html',
            book: 'head-first-design'
        });
    });
    it('should parse chapter url', () => {
        const chapter = Chapter_1.parseChapterUrl('/library/view/head-first-design/0596007124/ch09.html');
        console.log(chapter);
        chai_1.default.assert.deepEqual(chapter, {
            chapterName: 'ch09.html',
            chapterUrl: '/library/view/head-first-design/0596007124/ch09.html',
            book: 'head-first-design'
        });
    });
});
//# sourceMappingURL=parseBookUrl.js.map