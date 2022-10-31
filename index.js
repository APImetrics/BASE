const express = require('express')
const { darkspark } = require('darkspark-expressjs-plug');
const app = express()
const port = 3000

const API_KEY = process.env.DARKSPARK_API_KEY;
if (!API_KEY) {
    console.error("Please set DARKSPARK_API_KEY environment variable");
    process.exit(1);
}

app.get('/', (req, res) => {
    res.send('Hello World!')
});

darkspark(app, API_KEY);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
