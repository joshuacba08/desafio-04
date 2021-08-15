const fs = require('fs');

class Contenedor {
    

    constructor(ruta) {
        this.ruta = ruta;
        this.productos = [];
    }

    async getAll() {

        try {
            const contenido = await fs.promises.readFile(this.ruta,(err,data)=>data);
            return JSON.parse(contenido);

        } catch (error) {
            console.log(error);
        }
    }

    async save(producto){
        try {
            this.productos = this.getAll();
            producto.id = this.productos.length;
            this.productos.push(producto);
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos));
            return producto.id;
        } catch (error) {
            return null;
        }
    }

    async getById(id) {
        try {
            const productos = await this.getAll();
            return productos.find( producto => producto.id === id ) || null;
        } catch (error) {
            return null;
        }
    }

    async deleteById(id){
        try {
            const productos = await this.getAll();
            const newArray = productos.filter( producto => producto.id !== id);
            await fs.promises.writeFile(this.ruta, JSON.stringify(newArray));
        } catch (error) {
            return null;
        }
    }

    async deleteAll() {
        await fs.promises.writeFile(this.ruta,"[]");
    }

    async productRandom() {

        const productos = await this.getAll();
        const idRandom =  (min, max) => Math.floor(Math.random() * (max - min)) + min;
        const productoRandom = await this.getById(idRandom(1,productos.length+1));
        return productoRandom;
    }


}

module.exports = {
    Contenedor,
}



