var mongoose = require ('mongoose');
// Solución al problema de los índices
mongoose.set('useCreateIndex', true);
var Schema   = mongoose.Schema;

//Creación del Schema
var User = new Schema({
    username : {
        type: String,
        lowercase: true,
        //validaciones
        minlength: 5,
        maxlength: 20
    },
    password :{
        type: String,
        minlength: 8,
        maxlength: 40
    },
    email: {
        type: String,
        lowercase: true
    },
    active: {
        type: Boolean
    },
    groups: [String]
},
    //gestión de created_at y updated_at
    {
    timestamps: true
});
User.index({username:1},{unique:true});

User.index({email:1});
User.index({active:1});


const updateVersioningPlugin = require('mongoose-update-versioning');
User.plugin(updateVersioningPlugin);
var UserDAO= mongoose.model('users', User);
mongoose.connect('mongodb://127.0.0.1:27017/user',{ useNewUrlParser: true ,useFindAndModify:false});

module.exports = UserDAO;