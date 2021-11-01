const fetch = require('cross-fetch');
const { customers } = require('./customers.json');

const createCustomers = async (token, data = customers) => {
  data.forEach((customer) => {
    fetch('https://api-sandbox.dwolla.com/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.dwolla.v1.hal+json',
        Authorization: `Bearer ${token}`,
        'content-length': customer.length,
      },
      body: JSON.stringify(customer),
    })
      .then((res) => res.text())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
};

module.exports = createCustomers;
