const server = require('express')();
const fs = require('fs');
// node-fetch ^3.0 doesn't allow require
const fetch = require('cross-fetch');

const createCustomers = require('./createCustomers');
const getCustomers = require('./getCustomers');
const base64 = require('./base64');

let auth = base64(`${process.env.DWOLLA_KEY}:${process.env.DWOLLA_SECRET}`);

if (!fs.existsSync('./customers.json')) {
  //generateNames();
}

// Sync prevents the app from serving index early
const indexFile = fs.readFileSync('./index.html');
const indexHTML = indexFile.toString();

let token = '';
let tokenResponse = fetch('https://api-sandbox.dwolla.com/token', {
  method: 'POST',
  headers: {
    Authorization: `Basic ${auth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: `grant_type=client_credentials`,
}).then(async (res) => {
  token = (await res.json()).access_token;
});

server.get('/', (req, res) => {
  res.type('html').send(indexHTML);
});

server.get('/customers', async (req, res) => {
  let response = await getCustomers(token);
  let customers = response._embedded.customers;
  if (customers.length !== 0) res.send(customers);

  await createCustomers(token);
  response = await getCustomers(token);
  customers = response._embedded.customers;
});

server.get('/create', async (req, res) => {
  res.type('json').send(await createCustomers(token));
});

server.get('/search/:term', async (req, res) => {
  const term = encodeURIComponent(req.params.term);

  const {
    _embedded: { customers },
  } = await fetch(`https://api-sandbox.dwolla.com/customers?search=${term}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.dwolla.v1.hal+json',
    },
  }).then((res) => res.json());

  res.send(customers);
});

server.listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;
});
