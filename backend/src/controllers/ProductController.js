const connection = require('../database/connection');
const { index } = require('./VendorController');

module.exports = {

    async index(request, response) {
        const { page = 1} = request.query;

        const [count] = await connection('products').count();


        const products = await connection('products').join('vendors' , 'vendors.id' , '=' , 'products.vendor_id') .limit(5)
        .offset((page - 1) * 5).select(['products.*', 'vendors.name', 'vendors.email', 'vendors.whatsapp', 'vendors.city', 'vendors.uf']);

response.header('x-Total-Count', count['count(*)']);

        return response.json(products);
    },

    async create(request, response) {
        const { title, description, value, } = request.body;
        const vendor_id = request.headers.authorization;
        
        const [id] = await connection('products').insert({
            title,
            description,
            value,
            vendor_id
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const vendor_id = request.headers.authorization;

        const product = await connection('products')
        .where('id', id)
        .select('vendor_id')
        .first();

    if (product.vendor_id != vendor_id) {
        return response.status(401).json({ error: 'operation not permited' });

    }

    await connection('products').where('id', id).delete();

    return response.status(204).send();
    }
}