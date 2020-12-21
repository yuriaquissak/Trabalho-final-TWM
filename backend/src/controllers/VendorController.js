const connection = require('../database/connection')
const crypto = require('crypto');
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
    async index(request, response) {
        const vendors = await connection('vendors').select('*');
    
        return response.json(vendors);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
    
        const id = generateUniqueId();

        await connection('vendors').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
    })

    return response.json({ id })
    }
}