const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const fieldClassesData = require('./data/fields');

server.get('/api/field-classes', (req, res, next) => {
  res.status(200).send(fieldClassesData.getFieldClasses);
});

server.get('/api/field-classes/outputkeys', (req, res, next) => {
  res.status(200).send(fieldClassesData.getOutputKeys);
});

server.listen(3000, () => {
  console.log('JSON Server is listening on port 3000');
});
