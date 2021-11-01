const server = require('express')();
const fs = require('fs');
// node-fetch ^3.0 doesn't allow require
const fetch = require('cross-fetch');
const createCustomers = require('./createCustomers');
const getCustomers = require('./getCustomers');

/*
check if customer json file exists
generate 20 fake names and emails
make customers
put data in json file
html file has script to append table
when user submits search, search module executes

*/

const base64 = (data) => {
  let buffer = new Buffer(data);
  return buffer.toString('base64');
};

let auth = base64(`${process.env.DWOLLA_KEY}:${process.env.DWOLLA_SECRET}`);

if (!fs.existsSync('./customers.json')) {
  //generateNames()//.then((res) => console.log(Promise.resolve(res[0].value).then(res => res)));
}

// Sync prevents the app from serving index early
const indexFile = fs.readFileSync('./index.html');
const indexHtml = indexFile.toString();

server.get('/', (req, res) => {
  // if (customers.length === 0) createCustomers();
  res.type('html').send(indexHtml);
});

server.get('/customers', async (req, res) => {
  res.type('json').send(await getCustomers());
});

server.get('/search/:term', async (req, res) => {
  const term = encodeURIComponent(req.params.term);

  const response = await fetch(
    `https://api-sandbox.dwolla.com/customers?search=${term}`,
    {
      headers: {
        'Content-Type': 'application/vnd.dwolla.v1.hal+json',
        Accept: 'application/vnd.dwolla.v1.hal+json',
        Authorization: `Bearer ${auth}`,
      },
    } 
  );
  response
    .then((resp) => res.type('json').send(resp))
    .catch((err) => console.log(err));
}); 

server.listen(process.env.PORT || 3000, (err) => {
  if (err) throw err;
});
