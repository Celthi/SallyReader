import fs from 'fs';
import path from 'path';
const readImages = async (client, chapterUrl, imageNodes, options) => {
    // todo: use chapterUrl to get url
    for (const element of imageNodes) {
        const imageUrl = element.src;
        if (!client.has(imageUrl)) {
            try {
                const image = await client.getRequest(imageUrl, options);
                const imgLocation = './books' + imageUrl;
                const folder = imgLocation.substring(0, imgLocation.lastIndexOf('/'));
                fs.mkdirSync(folder, { recursive: true });
                console.log(`Get image: ${imageUrl}`);
                fs.writeFileSync(imgLocation, image);
                client.add(imageUrl);
            } catch (error) {
                console.log(error.message);
            }
        }
    };
}
const getImageFrom = (root:string, folder:string, existing: Set<string>) => {
    const dirs = fs.readdirSync(folder);
    dirs.forEach((ele) => {
        const p = path.join(folder, ele);
        const info = fs.statSync(p);
        if (info.isDirectory()) {
            getImageFrom(root, p, existing);
        } else {
            if (ele.match(/.+\.(jpg|png$)/)) {
                existing.add(p.substring(root.length-3));
            }
        }
    })
}
const checkExistingImages = (folder:string) => {
    const existing = new Set<string>();
    getImageFrom(folder, folder, existing);
    return existing;
}

export { readImages, checkExistingImages}