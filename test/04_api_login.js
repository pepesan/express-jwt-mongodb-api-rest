let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;
var mainURL= "http://localhost:3000/api";
var usuario;
var usuarioEnviado={
    "groups": [],
    "username": "admin",
    "password": "admin123"

};
var tokenG;
describe('Login/CreateUser/Token: ',()=>{


    it('POST /login devuelve un error sin usuario en presente', (done) => {
       chai.request(mainURL)
           .post('/login')
           .send({username:"admin", password: "admin10"})
           .end( function(err,res){
               //console.log(res.body);
               expect(res.body).to.be.an("Object");
               var token=res.body;
               expect(token.message).to.be.an('String');
               expect(token.message).equals( 'Login incorrect');
               //expect(token.token).to.be.an('String');
               //console.log(token);

               //.equals({message:"Welcome to the API"});
               done();
           });
    });
    it('POST /users crea un usuario', (done) => {
        chai.request(mainURL)
            .post('/users')
            .send(usuarioEnviado)
            .end( function(err,res){
                //console.log(res.body);
                expect(res.body).to.be.an("Object");
                var p=res.body.user;
                usuario=p;
                expect(p).to.be.an('Object');
                //console.log(p._id);
                expect(p._id).to.be.an("String");
                expect(p.username).to.be.an("String");
                expect(p.password).to.be.an("String");
                expect(p.groups).to.be.an("Array");
                expect(p.active).to.be.an("Boolean");
                expect(new Date(p.createdAt)).to.be.an("Date");
                //console.log(new Date(p.createdAt));
                expect(new Date(p.updatedAt)).to.be.an("Date");
                //console.log(new Date(p.updatedAt));
                expect(p.__v).to.be.an("Number");

                done();
            });
    });
    it('POST /login devuelve token con el usuario correcto', (done) => {
        chai.request(mainURL)
            .post('/login')
            .send({username:"admin", password: "admin123"})
            .end( function(err,res){
                //console.log(res.body);
                expect(res.body).to.be.an("Object");
                var token=res.body;
                expect(token.message).to.be.an('String');
                expect(token.message).equals( 'Login Correct');
                expect(token.token).to.be.an('String');
                //console.log(token);
                tokenG=token.token;
                //console.log(tokenG);
                //.equals({message:"Welcome to the API"});
                done();
            });
    });
    it('GET /secret devuelve un objeto', (done) => {
        chai.request(mainURL)
            .get('/secret')
            .set("authorization","Bearer "+tokenG)
            //.send({id:0, country: "Croacia", year: 2017, days: 10})
            .end( function(err,res){
                //console.log(res.body);
                expect(res.body).to.be.an("Object");
                var obj=res.body;
                expect(obj.message).to.be.an("String");
                expect(obj.message).equal("Datos Correctos");
                //.equals({message:"Welcome to the API"});
                done();
            });
    });
    it('GET /secret devuelve un fallo sin token', (done) => {
        chai.request(mainURL)
            .get('/secret')
            //.set("authorization","Bearer "+tokenG)
            //.send({id:0, country: "Croacia", year: 2017, days: 10})
            .end( function(err,res){
                //console.log(res.body);
                expect(res.body).to.be.an("Object");
                var obj=res.body;
                expect(obj.message).to.be.an("String");
                expect(obj.message).equal('Wrong Token');
                //.equals({message:"Welcome to the API"});
                done();
            });
    });
    it('DELETE  /users/:id borra un usuario', (done) => {
        chai.request(mainURL)
            .delete('/users/'+usuario._id)
            //.send({id:0, country: "Croacia", year: 2017, days: 10})
            .end( function(err,res){
                //console.log(res);
                expect(res).to.have.status(200);
                //console.log(res.body);

                var p = res.body.user;
                expect(p).to.be.an('Object');
                expect(res.body.res).to.be.an('String');
                expect(res.body.res).equals('Success');
                expect(p._id).to.be.an("String");
                expect(p.username).to.be.an("String");
                expect(p.password).to.be.an("String");
                expect(p.groups).to.be.an("Array");
                expect(p.active).to.be.an("Boolean");
                expect(new Date(p.createdAt)).to.be.an("Date");
                expect(new Date(p.updatedAt)).to.be.an("Date");
                expect(p.__v).to.be.an("Number");
                done();
            });
    });
});



