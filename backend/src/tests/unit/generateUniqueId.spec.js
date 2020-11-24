
const genereteUniqueId = require('../../utils/generateUniqueId')


describe('Generete Unique ID', () => {
    it('should generete a unique ID', () => {
        const id = genereteUniqueId();
        
        expect(id).toHaveLength(8);
    });
});