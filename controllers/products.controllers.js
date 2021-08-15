const { response } = require('express');
const Contenedor = require('../src/helpers/contenedor');

const contenedor = new Contenedor('./src/data/productos.json');


const productsGet = async (req, res) => {
    
    const products = await contenedor.getAll();

    res.send( products );
};

const productGetById = async (req, res) => {
    
    const id = parseInt(req.params.id);
    const product = await contenedor.getById(id);

    product?res.send(product):res.status(404).send('Producto no encontrado');

};

const productsPost = async (req, res) => {

    const body = req.body;

    const newId= await contenedor.save(req.body);

    res.json({
        msg:'post API - Se guardó un nuevo producto',
        body,
        newId,
    });
};

const productsPut = async (req, res) => {
    const producto = req.body;
    const id = parseInt(req.params.id);
    const result = await contenedor.replaceById(id, producto)
    console.log(result);
    result?res.json({
        msg:'put API - Se reemplazo el producto',
        producto,
        id,
    }):res.status(404).json({
        error: 'Producto no encontrado'
    });
    
};


const productsDelete = async (req, res) => {

    const id = parseInt(req.params.id);
    const result = await contenedor.deleteById(id);

    result?res.json({
        msg:'delete API - se eliminó el producto',
        id,
    }):res.status(404).json({
        error: 'Producto no encontrado'
    });
};




module.exports = {
    productsGet,
    productGetById,
    productsPost,
    productsPut,
    productsDelete,
}