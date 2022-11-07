import usersService from "./api/services/users.mjs";

import express from "express";
import { initialize } from "express-openapi";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import bodyParser from "body-parser";

const apiDocPath = "./api/api-doc.yml";
const apiDoc = YAML.load(apiDocPath);

import basicAuth from "express-basic-auth";
import darksparkPlug from "darkspark-expressjs-plug";
import { Users, RegisterUser, GetUser } from "./api/operations/users.mjs";
const { darkspark } = darksparkPlug;

const app = express();
const port = 3000;

const API_KEY = process.env.DARKSPARK_API_KEY;

if (!API_KEY) {
    console.error("Please set DARKSPARK_API_KEY environment variable");
    console.error("Darkspark Disabled!");
} else {
    darkspark(app, API_KEY);
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

// console.log(apiDoc['paths']['/users']['post']);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(apiDoc));

app.use(basicAuth({ authorizer: myAuthorizer, challenge: true }));

initialize({
    app,
    apiDoc,
    dependencies: {
        usersService,
    },
    operations: {
        Users,
        RegisterUser,
        GetUser,
    },
    consumesMiddleware: {
        "application/json": bodyParser.json(),
        "text/text": bodyParser.text(),
    },
});

function myAuthorizer(email, password) {
    const user = usersService.getUser(email, ":user/email");
    if (!user) {
        return false;
    }

    return basicAuth.safeCompare(password, user.password);
}

console.log(
    "Admin User:",
    usersService.registerUser({ email: "admin@example.darkspark.io" })
);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(apiDoc));
