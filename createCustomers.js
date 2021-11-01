const fetch = require('cross-fetch');
const { customers } = require('./customers.json');
const base64 = require("./base64");

const createCustomers = async (token, data = customers) => {
  let auth = base64(`${process.env.DWOLLA_KEY}:${process.env.DWOLLA_SECRET}`);
  data.forEach((customer) => {
    fetch('https://api-sandbox.dwolla.com/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.dwolla.v1.hal+json',
        Authorization: `Bearer ${token}`,
        'content-length': customers[1].length,
      },
      body: JSON.stringify(customers[1]),
    })
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
};

module.exports = createCustomers;
