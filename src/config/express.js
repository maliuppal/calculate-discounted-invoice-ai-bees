import express from 'express';
import passport from 'passport';
import 'dotenv/config'
import errorCodes from './errors';
import routes from './routes';
import swagger from './swagger';
import './database';
import './passport';

import pkg from 'lodash';
const { map } = pkg;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// loading swagger
swagger(app);

// loading route
routes(app);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    console.log(`Global error handler: [${JSON.stringify(err)}]`);
    if (err.name === 'ValidationError') {
        const errors = map(err.errors, (code) => ({ message: errorCodes[code].msg, code }));
        res.json({
            success: false,
            status: err.status,
            message: 'Errors encountered while validating request parameters.',
            data: {},
            errors,
        });
    } else if (err.status === 404) {
        const errors = map(err.errors, (code) => ({ message: errorCodes[code].msg, code }));
        res.json({
            success: false,
            status: err.status,
            message: 'Provided endpoint is not available.',
            data: {},
            errors
        });
    } else if (err.msgCode) {
        const data = err.data || {};
        res.json({
            success: false,
            status: err.status,
            message: errorCodes['REQUEST_FAILED'].msg,
            data,
            errors: [{
                    message: errorCodes[err.msgCode].msg,
                    code: err.status
                }]
        });
    } else if (err.message) {
        const data = err.data || {};
        const errors = map(err.errors, (code) => ({ message: errorCodes[code].msg, code }));
        res.json({
            success: false,
            status: err.status,
            message: errorCodes['REQUEST_FAILED'].msg,
            data,
            errors
        });
    } else {
        const errors = map(err.errors, (code) => ({ message: errorCodes[code].msg, code }));
        res.json({
            success: false,
            message: 'Something went wrong. Please try again.',
            status: err.status,
            data: {},
            errors
        });
    }
});

// Handle not found routing, return all requests to 404
app.get('*', (req, res) => {
    res.send('404 - route not found!')
});

export default app;
