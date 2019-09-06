import {parseBookUrl} from '../src/Books';
import {parseChapterUrl} from '../src/Chapter';
import chai from 'chai';
describe('parse book', ()=> {
    it('should parse book', ()=> {
        const book = parseBookUrl('https://learning.oreilly.com/library/view/head-first-design/0596007124/');
        console.log(book);
        chai.assert.deepEqual(book, {
            bookName:'head-first-design',
            bookSeq: '0596007124',
            bookFolder: 'head-first-design/'
        })
    });
    it('should parse chapter url', ()=> {
        const chapter = parseChapterUrl('/library/view/head-first-design/0596007124/ch09.html#reworking_the_diner_menu_with_iterator');
        console.log(chapter);
        chai.assert.deepEqual(chapter, {
            chapterName: 'ch09.html',
            chapterUrl: '/library/view/head-first-design/0596007124/ch09.html',
            book: 'head-first-design'
        });

    });
    it('should parse chapter url', ()=> {
        const chapter = parseChapterUrl('/library/view/head-first-design/0596007124/ch09.html');
        console.log(chapter);
        chai.assert.deepEqual(chapter, {
            chapterName: 'ch09.html',
            chapterUrl: '/library/view/head-first-design/0596007124/ch09.html',
            book: 'head-first-design'
        });
        
    })
});