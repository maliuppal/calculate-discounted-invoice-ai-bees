import fs from "fs";
import { serve, setup } from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
const swaggerDefinition = require('../common/swagger.json');

const swagger = (app) => {

    const options = {
        swaggerDefinition,
        apis: ["../routes/*.route.js"],
    };

    const specs = swaggerJsDoc(options);

    app.use("/api-docs", serve, setup(specs));
}

export default swagger;