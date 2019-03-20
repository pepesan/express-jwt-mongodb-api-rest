var express = require('express');
var UserDAO= require('../models/UserDao');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  UserDAO.find(function( err, usuarios, count )
  {
    res.json({
      res:"Success",
      users: usuarios
    });
  });
});

router.post('/', function(req, res, next)
{
  //console.log(req.body);
  new UserDAO({
    username: req.body.username,
    password: req.body.password,
    active: true
  }).save(function(err, user, count)
  {
    //console.log(user);
    res.json({res:"Success",user:user});
  });
});

//http://localhost:3000/api/users/:id
router.get('/:id', function(req, res, next)
{
  UserDAO.findOne({_id: req.params.id}, function (err, user)
  {
    res.json({res:"Success",user: user});
  });
});

//http://localhost:3000/api/users/:id
router.put('/:id', function(req, res, next)
{
  //console.log(req.body);
  req.body._id=req.params.id;

  UserDAO.findOneAndUpdate({_id: req.params.id},req.body,{new : true},(err,user)=>{
    //  console.log(user);
    res.json({res:"Success",user:user}
  );
});

});

//http://localhost:3000/api/users/:id
router.delete('/:id', function(req, res, next)
{
  UserDAO.findOneAndRemove({_id: req.params.id})
      .exec(function(err, user, count)
      {
        res.json({res:"Success",user:user});
      });
});

module.exports = router;
