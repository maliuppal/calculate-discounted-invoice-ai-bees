import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/config/express';

chai.should(); 

chai.use(chaiHttp);

/*
 * Test the /POST Product
 */
describe('POST /product -> create ', () => {
    it.only('it should create a product', (done) => {
        chai.request(app)
            .post('/api/v1/product')
            .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGkudXBwYWxAeW1haWwuY29tIiwiaWF0IjoxNjUxMzk0NjIyfQ.GOyn16BrRjM9PG1iVdjjEGmzjfHVxnB1r1ZunwcYggM`)
            .send({
                name: "furniture",
                discount: 20,
                price: 20,
                categoryId : 1
            })
            .end((err, res) => {
                console.log('err', err)
                console.log('res', res)
                done();
            });
    });
});

/*
 * Test the /POST product
 */
describe('POST /product -> create ', () => {
    it('it should create a product', (done) => {
        chai.request(app)
            .put('/api/v1/product/1')
            .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGkudXBwYWxAeW1haWwuY29tIiwiaWF0IjoxNjUxMzk0NjIyfQ.GOyn16BrRjM9PG1iVdjjEGmzjfHVxnB1r1ZunwcYggM`)
            .send({
                "discount": 40
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});