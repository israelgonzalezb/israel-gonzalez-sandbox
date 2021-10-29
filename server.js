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

  let countOfNames = 20;

  let emptyArr = Array(countOfNames * 3 * 2).fill();

  let randomChar = () =>
    String.fromCharCode(+(Math.random() * 26).toFixed(0) + 96);

  let randomLetters = emptyArr.map(() => randomChar());

  let stringArr = new Array(40).fill();

  stringArr.forEach((el, idx) => {
    stringArr[idx] = [];
    while (stringArr[idx].length < 3) {
      stringArr[idx].push(randomLetters.pop());
    }
  });


  let results = [...list];
  let continueKey = next;

  const corsUrl = process.env.CORS_URL;
  const wikiFirstNameUrl = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Given_names&cmtype=page&cmnamespace=0&format=json&cmlimit=1&cmprop=title|sortkey&cmstartsortkeyprefix=dft`;
  const wikiLastNameUrl = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Given_names&cmtype=page&cmnamespace=0&format=json&cmlimit=1&cmprop=title|sortkey&cmstartsortkeyprefix=dft`;


  let wikiResponses = await Promise.allSettled(stringArr.splice(0,20).map(sortStart => fetch(
    `${corsUrl}${wikiBaseNameUrl}&cmsortkeyprefix=${sortStart}`
  ).then((res) => res.json()));
  return wikiResponses;

}

if (!fs.existsSync("./customers.json")) {
    console.log(generateNames())

).then((res) => res.text()) 

 

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
