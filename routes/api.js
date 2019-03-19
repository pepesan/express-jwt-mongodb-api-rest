var express = require('express');
var jwt = require('jsonwebtoken');
var UserDAO=require('../models/UserDao');
var router = express.Router();

/* GET api home. */
router.get('/', function(req, res, next) {
  res.json({
    message: "Welcome to the API"
  });
});

/* POST api home. */
router.post('/', function(req, res, next) {
  res.json({
    message: "Post created..."
  });
});

/* POST api home. */
router.post('/login', function(req, res, next) {
  //console.log(req.body);
  //Mock User
  /*const user ={
    id: 1,
    username: "admin",
    email: "admin@localhost",
    password: "admin"
  };
  */
  var user=req.body;
  //TODO: validar entrada user
  // SecretKey
  const secretkey= 'secretkey';
  // Verificación de login
  if (user.username=='admin' && user.password=='admin') {
    /*
      Codificación del Token
      user: Datos de usuario: username, grupos, fecha expiración
     */
    jwt.sign({user: user}, secretkey, {expiresIn:'30m' }, (err, token) => {
      //console.log(err);
      // Comprobamos si nno hay error
      if (err == null) {
        //devolvemos el token
        res.json({token});
      }else{
        // Devolvemos el error
        res.json({
          message: "Login incorrect",
          user: user
        });
      }
    });
  }else{
    //devolvemos el error de login
    res.json({
      message: "Login incorrect",
      user: user
    });
  }

});


function verifyToken(req,res,next){
  const bearerHeader= req.headers['authorization'];
  console.log(bearerHeader);
  // Comprobamos que está presente el token
  if(typeof bearerHeader !== "undefined"){
    // Presente
    //Dividimos la cadena
    const bearer= bearerHeader.split(" ");
    // Cogemos el token en sí
    const bearerToken = bearer[1];
    // Lo colocamos como un valor de la petición pero ya procesado
    req.token=bearerToken;
  }else{
    // Acceso prophibido - Forbiden
    // Devolvemos que no hay token
    req.token=null;
  }
  // Ejecutamos la siguiente función
  next();
}

// API Seguro, fijate en el verifyToken
router.get('/secret', verifyToken,function(req, res, next) {
  if (req.token !=null ){
    // Verificamos el Token con JWT
    jwt.verify(req.token,'secretkey',(err,data)=>{
      // Si hay error
      if(err!=null){
        // Devolvemos un 403
        res.sendStatus(403);
      }else {
        // Si no el token es correcto
        // console.log(data);
        // Devolvemos los datos del API seguro
        res.json({
          message: "Datos Correctos",
          tokenDescifrado: data
        })
      }

    });
  }else{
    // Devolvemos que el token es incorrecto
    res.json({
      message: "Wrong Token",
      token: req.token
    });
  }
});

module.exports = router;
