const express = require("express");
const { initialize } = require("express-openapi");
const swaggerUi = require("swagger-ui-express");

const { darkspark } = require("darkspark-expressjs-plug");

const app = express();
const port = 3000;

const API_KEY = process.env.DARKSPARK_API_KEY;
if (!API_KEY) {
    console.error("Please set DARKSPARK_API_KEY environment variable");
    process.exit(1);
}

darkspark(app, API_KEY);

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

initialize({
    app,
    apiDoc: "./api/api-doc.yml",
    paths: "./api/paths",
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup("./api/api-doc.yml"));
