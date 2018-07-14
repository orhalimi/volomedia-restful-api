
// store mock date to simulate db
// id 5-10
// name 3-20
// price: 0.1 - 999,999
// quantity: 1-99


const mockData = {
    a2sdf: {
      id:`a2sdf`,
      name: `Coca-Cola`,
      price: 11.4,
      quantity: 4
    },
    csah2: {
      id:`csah2`,
      name: `Iphone`,
      price: 3600,
      quantity: 20
    },
    vf33s: {
      id:`vf33s`,
      name: `Table`,
      price: 720,
      quantity: 1
    }
}

exports.getStoreCatalogue = async (searchQuary) =>{
  if (searchQuary) {  
    const cloneData = JSON.parse(JSON.stringify(mockData));
    for (let property in cloneData) {
      if (cloneData.hasOwnProperty(property) &&
         !cloneData[property].name.includes(searchQuary)) {
        delete cloneData[property];
      }
   }
   return await JSON.stringify(cloneData);
  }
  return await JSON.stringify(mockData);
}

exports.addStoreCatalogue = async (json) =>{
  try {
    if (isValidInput(json) && (json.id in mockData)) {
      throw `${json.id} already exist`;
    } else {
      mockData[json.id] = json;
      return await module.exports.getStoreCatalogue();
    }
  } catch(e) {
    throw e;
  }
}

exports.updateStoreCatalogue = async (json) =>{
  try {
    if (isValidInput(json) && !(json.id in mockData)) {
      throw `couldn't find ${json.id}`
    } else {
      mockData[json.id] = json;
      return await module.exports.getStoreCatalogue();
    }
  } catch(e) {
    throw e;
  }
}

exports.deleteStoreCatalogue = async (json) =>{
  try {
    if (!json.id || json.id.length < 5 || json.id.length > 10) {
      throw "ID must be between 5-10 characters";
    }
    else if (!(json.id in mockData)) {
      throw `couldn't find ${json.id}`;
    } else {
      delete mockData[json.id];
      return await module.exports.getStoreCatalogue();
    }
  } catch(e) {
    throw e;
  }
}

const isValidInput = (json) => {
  if (json && json.id && json.name && json.price && json.quantity){
    if (json.id.length < 5 || json.id.length > 10) {
      throw "ID must be between 5-10 characters";
    } else if (json.name.length < 3 || json.name.length > 20) {
      throw "Name must be between 3-20 characters";
    } else if (isNaN(json.price) || Number(json.price) < 0.1 || Number(json.price) > 9999999) {
      throw "Price must be between 0.1 to 999999";
    } else if (isNaN(json.quantity) || Number(json.quantity) < 1 || Number(json.quantity) > 100 || Number(json.quantity) % 1 !== 0) {
      throw "quantity must be a number between 1 to 99";
    } else {
      
      return true;
    }
  } else {
    throw "The request doesn't contain all the fields";
  }
};


