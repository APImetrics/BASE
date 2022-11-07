import usersService from "./api/services/users.mjs";

import express from "express";
import { initialize } from "express-openapi";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import bodyParser from "body-parser";

const apiDocPath = "./api/api-doc.yml";
const apiDoc = YAML.load(apiDocPath);

import darksparkPlug from "darkspark-expressjs-plug";
import { Users, RegisterUser } from "./api/operations/users.mjs";
const { darkspark } = darksparkPlug;
const app = express();
const port = 3000;

const API_KEY = process.env.DARKSPARK_API_KEY;

if (!API_KEY) {
    console.error("Please set DARKSPARK_API_KEY environment variable");
    console.error("Darkspark Disabled!");
    // process.exit(1);
} else {
    darkspark(app, API_KEY);
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

initialize({
    app,
    apiDoc,
    dependencies: {
        usersService,
    },
    operations: {
        Users,
        RegisterUser,
    },
    consumesMiddleware: {
        "application/json": bodyParser.json(),
        "text/text": bodyParser.text(),
    },
});

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(apiDoc));
