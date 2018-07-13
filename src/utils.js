exports.sendResponse = (res, data, statusCode, headers) => {
  res.writeHead(statusCode, headers);
  res.end(data);
};

exports.collectDataAsync = (req) => {
  return new Promise((r,j) =>{
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      r(data);
    });
  });
};

exports.parseJson = data => {
  try{
    return JSON.parse(data);
  } catch (e) {
    throw "invalid JSON";
  }
}