let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;
var mainURL= "http://localhost:3000/api";
describe('Ruta principal API: ',()=>{

    it('GET  / devuelve un código 200', (done) => {
        chai.request(mainURL)
            .get('')
            //.send({id:0, country: "Croacia", year: 2017, days: 10})
            .end( function(err,res){
                //console.log(res);
                expect(res).to.have.status(200);
                done();
            });
    });
    it('GET / devuelve un objeto', (done) => {
        chai.request(mainURL)
            .get('')
            //.send({id:0, country: "Croacia", year: 2017, days: 10})
            .end( function(err,res){
                //console.log(res.body);
                expect(res.body).to.be.an("Object");
                var obj=res.body;
                expect(obj.message).to.be.an("String");
                expect(obj.message).equal("Welcome to the API");
                    //.equals({message:"Welcome to the API"});
                done();
            });
    });
});



