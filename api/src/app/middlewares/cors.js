module.exports = (request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  next();
}
