const server = require('express')();
const fs = require('fs');
// node-fetch ^3.0 doesn't allow require
const fetch = require('cross-fetch');

/*
check if customer json file exists
generate 20 fake names and emails
make customers
put data in json file
html file has script to append table
when user submits search, search module executes

*/

const generateNames = async () => {

  let results = [...list];
  let continueKey = next;

  const corsUrl = process.env.CORS_URL;
  const wikiBaseNameUrl = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${category}&cmtype=page&cmnamespace=0&format=json&cmlimit=1&cmprop=title|sortkey&cmstartsortkeyprefix=dft`;

  let wikiResponse = await fetch(
    `${corsUrl}${wikiBaseNameUrl}&${continueKey}`
  ).then((res) => res.json());
  return wikiResponse;

}

if (!fs.existsSync("./customers.json")) {
    /*
    fetch(
        "https://ohq-cors.herokuapp.com/https://randomincategory.toolforge.org/?category=Category:Given_names&server=en.wikipedia.org&namespace=0&type=page&action=raw&r=4&section=0"
).then((res) => res.text()) */

 

}

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
