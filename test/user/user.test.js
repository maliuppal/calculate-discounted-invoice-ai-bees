import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../src/config/express';

chai.should(); 

chai.use(chaiHttp);

/*
 * Test the /POST User Register
 */
describe('POST /register -> user ', () => {
    it('it should register a user', (done) => {
        chai.request(app)
            .post('/api/v1/user/register')
            .send({
                "fullName": "Ali Uppal",
                "email": "ali.uppal1@ymail.com",
                "password": "123456"
            })
            .expect('Content-Type', /json/)
            .expect(200, {
                message: 'Thanks for registering'
            }, done);
    });
});

/*
 * Test the /POST User Login
 */
describe('POST /login -> user ', () => {
    it('it should allow login user', (done) => {
        chai.request(app)
            .put('api/v1/user/login')
            .send({
                "email": "ali.uppal@ymail.com",
                "password": "123456"
            })
            .expect('Content-Type', /json/)
            .expect(200, {
                message: 'Welcome Back!'
            }, done);
    });
});