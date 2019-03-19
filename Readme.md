# API Rest ExpressJS (NodeJS), Mongoose y Swagger
Este API sirve de ejemplo de Rest con una base de Datos MongoDB
* La aplicación está desarrollada con Express 4.x
* Se utiliza mongoose para conectar a una BBDD MongoDB
* La base de datos debe estar en [mongodb://localhost:27017/user]
* El modelo y la conexión están definidos en ./models/UserDao.js
* Dispone de un API para loguearse

## Arranque
$ node bin/www
## Arranque modo desarrollo
$ nodemon bin/www

## URL principal
* [http://localhost:3000/]
## Documentación generada con Swagger
* [http://localhost:3000/api-docs/]

## Licencia
David Vaquero <pepesan@gmail.com>
GPL v3