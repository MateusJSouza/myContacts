module.exports = (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Methods', '*');
  response.header('Access-Control-Allow-Headers', '*');
  response.header('Access-Control-Max-Age', '10');
  next();
}
