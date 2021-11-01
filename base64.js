const base64 = (data) => {
    let buffer = new Buffer(data);
    return buffer.toString('base64');
};
  
module.exports = base64;