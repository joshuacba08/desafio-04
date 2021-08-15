const express = require('express');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.routes();
    }

    routes() {

    }

    listen() {
        this.app.listen( this.port , () => {
            console.log('Servidor activo en puerto', this.port);
        });
    }

}


module.exports = Server;