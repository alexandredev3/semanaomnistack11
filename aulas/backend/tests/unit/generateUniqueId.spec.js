const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique Id', () => {
    it('should generate an unique ID', () => {  // Aqui dentro que vai acontece os teste.
        const id = generateUniqueId();

        expect(id).toHaveLength(8); // Vc espera que o id tenha 8 letras.
        
        // Vc espera que alguma coisa aconteça, EX: expect(2 + 2).toBe(4)
    });
});