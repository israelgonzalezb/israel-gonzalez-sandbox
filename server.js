const server = require('express')();
const fs = require('fs');
// node-fetch ^3.0 doesn't allow require
const fetch = require('cross-fetch');


// Sync prevents the app from serving index early
const indexFile = fs.readFileSync('./index.html');
const indexHtml = indexFile.toString();    
            
server.get('/', (req, res) => {
    res
       .type("html")
       .send(indexHtml);
})

server.listen(process.env.PORT || 3000, err => {
	if (err) throw err
})
