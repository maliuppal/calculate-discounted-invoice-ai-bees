import glob from 'glob';
import fs from 'fs';
import _ from 'lodash';

console.log('loading error messages');

const errorsFilesPath = '../errors/*.errors.json';

const errorObject = {
    REQUEST_FAILED: {
        msg: 'Request failed.',
    },
    USER_ID_UNAVAILABLE: {
        msg: 'User id not available in provided token.',
    },
    USER_NOT_FOUND: {
        msg: 'No user found with the provided id',
    },
    UNAUTHENTICATED: {
        msg: 'User is not authenticated.',
    },
    UNAUTHORIZED: {
        msg: 'User is not authorized to visit this api.',
    },
    RECORD_NOT_FOUND: {
        msg: "Record doesn't exist.",
    },
    USER_LOGIN_FALIED: {
        msg: 'Username or Password is incorrect.',
    },
    USER_CREATION_FALIED: {
        msg: 'Exception in creating new user, please try again',
    },
    USER_CREATION_FALIED_ROLE_NOT_ALLOW: {
        msg: 'Exception in creating new user (requested role(s) not allow), please try again',
    },
    PERMISSION_DENIED: {
        msg: 'Permission denied',
    },
};

const loadErrorFiles = (fileRoute) => {
    glob.sync(fileRoute).forEach((file) => {
        _.extend(errorObject, JSON.parse(fs.readFileSync(file, 'utf-8')));
        console.log(`'${file}' +  is loaded`);
    });
};

loadErrorFiles(errorsFilesPath);

export default errorObject;
