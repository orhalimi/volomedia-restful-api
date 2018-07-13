
const utils = require("./utils.js");
const storeDataHandler = require("./storeDataHandler");
const header = {'Content-Type': 'application/json'};
const url = require('url');

const storeDataCycleHandler = (req, res, fn) => {
  utils.collectDataAsync(req)
  .then(data => utils.parseJson(data))
  .then(json => fn(json))
  .then (catalogueData => {
    utils.sendResponse(res, catalogueData, 200, header);
    })
  .catch (error =>{
    utils.sendResponse(res, error, 400);
  })
}

module.exports = (req, res) => {
if (utils.isAuthenticated(req,res)) {
    if(req.method === 'GET' ) {
      const quary = url.parse(req.url,[true]).query;
      const searchQuary = quary.search || '';
      storeDataHandler.getStoreCatalogue(searchQuary).then(catalogueData =>{   
        utils.sendResponse(res, catalogueData, 200, header);
      })
    } else if ( req.method === 'POST'){
      storeDataCycleHandler(req, res, storeDataHandler.addStoreCatalogue)
    } else if ( req.method === 'PUT'){
      storeDataCycleHandler(req, res, storeDataHandler.updateStoreCatalogue)
    } else if ( req.method === 'DELETE'){
      storeDataCycleHandler(req, res, storeDataHandler.deleteStoreCatalogue)
    } else {
      const header = {'Content-Type': 'application/json'};
      utils.sendResponse(res, "Method Not Allowed\n", 405, header);
    }
  }
}


