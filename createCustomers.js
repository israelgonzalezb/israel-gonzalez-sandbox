const fetch = require('cross-fetch');
const { customers } = require('./customers.json');

const base64 = (data) => {
    let buffer = new Buffer(data);
    return buffer.toString('base64');
}
const createCustomers = async (data = customers) => {
    return {msg: "hello!"}
    let auth = base64(`${process.env.DWOLLA_KEY}:${process.env.DWOLLA_SECRET}`)
  //data.forEach((customer) => {
    fetch('https://api-sandbox.dwolla.com/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.dwolla.v1.hal+json',
        Accept: 'application/vnd.dwolla.v1.hal+json',
        Authorization:
          `Bearer ${auth}`,
      },
      body: JSON.stringify(customers[0]),
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  //});
  
  console.log(customers);
};

module.exports = createCustomers;
