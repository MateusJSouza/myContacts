const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  console.log('#### Error handler');
  console.log(error);
  response.sendStatus(500);
});

app.listen(3001, () => console.log('🔥 Server started at http://localhost:3001'));

/*
  Para utilizarmos o nodemon, basta digitar no terminal o seguinte comando:
  npx nodemon src/index.js (ou seja, o caminho da aplicação)
*/
