const express = require('express');
var cors = require('cors');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Directorio público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use('/api/products', require('../routes/products.routes'));

    }

    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor activo en puerto', this.port);
        });
    }

}


module.exports = Server;