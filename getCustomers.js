const fetch = require('cross-fetch');

const getCustomers = async (token) => {
  const response = await fetch('https://api-sandbox.dwolla.com/customers', {
    headers: {
      Accept: 'application/vnd.dwolla.v1.hal+json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return response;
};

module.exports = getCustomers;
