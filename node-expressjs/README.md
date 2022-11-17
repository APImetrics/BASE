# BASE - Node (Express)

## How to Use

1. Create an account on [Darkspark](https://darkspark.io)
2. Skip the onboarding dialog and navigate to Account / [API Keys](https://darkspark.io/account/apikeys).
3. Click "Create Adaptor API Key Now"
   1. Enter the name "darkspark-example-expressjs'
   2. Select Node.js (express.js) as the type
   3. Click Create New API Key
4. Copy the resulting API key string to the clipboard
5. Open Terminal, cd to BASE/node-expressjs
6. Set the environment variable `DARKSPARK_API_KEY` to the copied value using following command: export DARKSPARK_API_KEY = <insert key here>
7. Run `npm install`
8. Run `npm start`

The final two steps can be done in one command via:

```shell
DARKSPARK_API_KEY=<insert key here> npm start
```

An expressjs webserver will start on port 3000. All accesses to this server will be observed by Darkspark.
   Browse to 'http://localhost:3000/api-doc'

## Postman Collection

TBD

## Tutorial

TBD
