const fetch = require("cross-fetch")

const base64 = (data) => {
    let buffer = new Buffer(data);
    return buffer.toString('base64');
}

const getCustomers = async () => {
    
    let auth = base64(`${process.env.DWOLLA_KEY}:${process.env.DWOLLA_SECRET}`)
    const response = await fetch("https://api-sandbox.dwolla.com/customers", {
        headers: {
            'Content-Type': 'application/vnd.dwolla.v1.hal+json',
            Accept: 'application/vnd.dwolla.v1.hal+json',
            Authorization:
              `Bearer ${auth}`,
          },
  }).then((res) => res.json())
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
  
    return response;
}

module.exports = getCustomers;