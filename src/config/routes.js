import glob from 'glob';

import path from 'path';
const routes = (app) => {

    const version = `/api/v1`;

    console.log('Routes Loading Started...');
    const routesPath ='src/routes/*.route.js';
    const files = glob.sync(routesPath);        
    files.forEach((file) => {
        require(`../../${file}`)(app,version);
        console.log(`'${file}' is loaded`);
    });
    console.log('Routes Loading Completed...');
};

export default routes;
