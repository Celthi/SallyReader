import {checkExistingImages} from '../src/ImageReader';
import chai from 'chai';
describe('get the image', ()=> {
    it('should get the images', ()=> {
        const folder = './test/data/images/';
        const existing = checkExistingImages(folder);
        //console.log(existing);
        chai.assert(existing.size === 186);
    })
})