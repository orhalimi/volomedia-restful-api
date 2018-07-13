const http = require('http');
const storeCatalogueHandler = require('./storeCatalogueHandler');
const utils = require('./utils');
const url = require('url');

const PORT = process.env.PORT || 3000;

const routes = {
  '/store_catalogue': storeCatalogueHandler,
};

const server = http.createServer((req, res) =>{
  const path = url.parse(req.url);  
  const route = routes[path.pathname];
  if (route) {
    route(req, res);
  } else {
    utils.sendResponse(res, "Not found", 404);
  }
});

server.listen(PORT, ()=>{
    console.log(`server start at port ${PORT}`); 
});
