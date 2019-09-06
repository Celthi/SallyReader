// book url: https://learning.oreilly.com/library/view/head-first-design/0596007124/
const parseChapterUrl = (chapterUrl: string) => {
    const chapter = {
        chapterName: '',
        chapterUrl: '',
        book: ''
    }
    const re = /(https:\/\/learning.oreilly.com)?\/library\/view\/([a-z-]+)\/(\d+)\/([^#]+)/;
    const matches = chapterUrl.match(re);
    try {
        chapter.chapterName = matches[4];
        chapter.chapterUrl = matches[0];
        chapter.book = matches[2];

    } catch(error) {
        console.log(`parse book url: ${chapterUrl} met error!`);
    }

    return chapter;
}
export {
    parseChapterUrl
}