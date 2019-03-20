let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;
var mainURL= "http://localhost:3000/api";
var tokenG="";
var usuario;
describe('Users: ',()=>{
    /*
    it('POST /login devuelve un token', (done) => {
       chai.request(mainURL)
           .post('/login')
           .send({username:"admin", password: "admin10"})
           .end( function(err,res){
               //console.log(res.body);
               expect(res.body).to.be.an("Object");
               var token=res.body;
               expect(token.message).to.be.an('String');
               expect(token.message).equals( 'Login Correct');
               expect(token.token).to.be.an('String');
               tokenG=token.token;
               //console.log(token);
               /*
               expect(listado).to.be.an('Array');
               for (let p of listado) {
                   expect(p).to.be.an('Object');
                   //expect(p.userId).to.be.equal(users[0].id);
                   //expect(p.id).to.be.a('Number');
                   //expect(p.title).to.be.a('String');
                   //expect(p.body).to.be.a('String');
               }

               //.equals({message:"Welcome to the API"});
               done();
           });
    });
    */
    it('GET  /users', (done) => {
        chai.request(mainURL)
            .get('/users')
            //.send({id:0, country: "Croacia", year: 2017, days: 10})
            .end( function(err,res){
                //console.log(res);
                expect(res).to.have.status(200);
                //console.log(res.body);
                var listado = res.body.users;
                expect(res.body).to.be.an('Object');
                expect(listado).to.be.an('Array');
                expect(res.body.res).to.be.an('String');
                expect(res.body.res).equals('Success');
                usuario=listado[0];
                for (let p of listado) {
                    //console.log(p);
                    expect(p).to.be.an('Object');
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

                    //expect(p.id).to.be.a('Number');
                    //expect(p.title).to.be.a('String');
                    //expect(p.body).to.be.a('String');
                }

               done();
            });
    });
    it('POST /users crea un usuario', (done) => {
        chai.request(mainURL)
            .post('/users')
            .send({
                "groups": [],
                "username": "admin",
                "password": "admin123"

            })
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
    it('GET  /users/:id', (done) => {
        chai.request(mainURL)
            .get('/users/'+usuario._id)
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
    it('PUT /users edita un usuario', (done) => {
        chai.request(mainURL)
            .put('/users/'+usuario._id)
            .send({
                "groups": [],
                "username": "admin",
                "password": "admin321"

            })
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



