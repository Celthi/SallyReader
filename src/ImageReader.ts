import fs from 'fs';
const readImages = async (client, chapterUrl, imageNodes, options) => {
    // todo: use chapterUrl to get url
    for(const element of imageNodes) {
        const imageUrl = element.src;
        try {
            const image = await client.getRequest(imageUrl, options);
            const imgLocation = './books' + imageUrl;
            const folder = imgLocation.substring(0, imgLocation.lastIndexOf('/'));
            fs.mkdirSync(folder, { recursive: true });
            console.log(`Get image: ${imageUrl}`);
            fs.writeFileSync(imgLocation, image);
        } catch(error) {
            console.log(error.message);
        }
    };
}

export { readImages }