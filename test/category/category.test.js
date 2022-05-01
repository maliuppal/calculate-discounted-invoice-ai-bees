import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/config/express';

chai.should(); 

chai.use(chaiHttp);

/*
 * Test the /POST category
 */
describe('POST /category -> create ', () => {
    it('it should create a category', (done) => {
        chai.request(app)
            .post('/api/v1/category')
            .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGkudXBwYWxAeW1haWwuY29tIiwiaWF0IjoxNjUxMzk0NjIyfQ.GOyn16BrRjM9PG1iVdjjEGmzjfHVxnB1r1ZunwcYggM`)
            .send({
                "name": "furniture",
                "discount": 20
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});


/*
 * Test the /POST category
 */
describe('POST /category -> create ', () => {
    it('it should create a category', (done) => {
        chai.request(app)
            .put('/api/v1/category/1')
            .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGkudXBwYWxAeW1haWwuY29tIiwiaWF0IjoxNjUxMzk0NjIyfQ.GOyn16BrRjM9PG1iVdjjEGmzjfHVxnB1r1ZunwcYggM`)
            .send({
                "name": "furniture",
                "discount": 20
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});