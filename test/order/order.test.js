import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/config/express';

chai.should(); 

chai.use(chaiHttp);

/*
 * Test the /POST Order
 */
describe('POST /order -> create ', () => {
    it('it should create a new order', (done) => {
        chai.request(app)
            .post('/api/v1/order')
            .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGkudXBwYWxAeW1haWwuY29tIiwiaWF0IjoxNjUxMzk0NjIyfQ.GOyn16BrRjM9PG1iVdjjEGmzjfHVxnB1r1ZunwcYggM`)
            .send({
                "product": 1
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});