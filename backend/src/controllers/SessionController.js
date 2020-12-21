
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const vendor  = await connection('vendors')
        .where('id', id)
        .select('name')
        .first();

        if(!vendor) {
            return response.status(400).json({ error: 'No vendor found with this id'});
        }
        return response.json(vendor);
    }
}