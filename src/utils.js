const AUTH = process.env.AUTH || "1q2w3e4r5t";

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

exports.isAuthenticated = (req, res) => {
  const header = req.headers['authorization'] || '';  
  const token = header.split(/\s+/).pop()||'';          
  if (token === AUTH) {
    return true;
  } module.exports.sendResponse(res, "Unauthorized", 401,)
}