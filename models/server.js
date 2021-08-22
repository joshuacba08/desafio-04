const express = require('express');
var cors = require('cors');
const handlebars = require('express-handlebars');

class Server {

    constructor(dirname){
        this.app = express();
        this.port = process.env.PORT;
        this.productsPath = '/api/products';
        this.dirname = dirname;
        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();

        //vistas de la app
        this.views();
    }

    middlewares() {

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        this.app.use( express.urlencoded({ extended: true }) );

        //Directorio público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.productsPath, require('../routes/products.routes'));

    }

    views() {
        //motores de plantillas
        this.app.engine('hbs', handlebars({
            extname: '.hbs',
            defaultLayout: 'index.hbs',
            layoutsDir: this.dirname + '/views/layouts',
            partialsDir: this.dirname + '/views/partials/',
            })
        );

        this.app.set('view engine', 'hbs');
        this.app.set('views', './views');   //TODO: ver si falla
    }

    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor activo en puerto', this.port);
        });
    }

}


module.exports = Server;