const fetch = require('cross-fetch');

// Currently not used, needs some fixes
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
  
    const header = new fetch.Headers({
      'Api-User-Agent': 'Bot/israelgonzalezb@gmail.com',
    });
  
    const corsUrl = ''; // process.env.CORS_URL;
    const wikiFirstNameUrl = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Given_names&cmtype=page&cmnamespace=0&format=json&cmlimit=1&cmprop=title|sortkey&cmstartsortkeyprefix=`;
    const wikiLastNameUrl = `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:Surnames&cmtype=page&cmnamespace=0&format=json&cmlimit=1&cmprop=title|sortkey&cmstartsortkeyprefix=`;
  
    const wikiFirstNameUrlList = stringArr
      .splice(0, 20)
      .map((sortKey) => `${corsUrl}${wikiFirstNameUrl}${sortKey.join('')}`);
  
    const wikiLastNameUrlList = stringArr.map(
      (sortKey) => `${corsUrl}${wikiLastNameUrl}${sortKey.join('')}`
    );
  
    // Wikipedia bans us if we send a bunch of concurrent requests
    //   so we'll use map and push to make them sequential
    let sequentialFirstNameRequests = [wikiFirstNameUrlList.pop()];
    let sequentialLastNameRequests = [wikiLastNameUrlList.pop()];
    let lastNameRequestResults = [];
    let firstNameRequestResults = sequentialFirstNameRequests.map(async (url) => {
      return fetch(
        /*url*/ 'https://ohqs.herokuapp.com/services/dwolla-sandbox/' + url,
        header
      )
        .then((res) => {
          if (wikiFirstNameUrlList.length) {
            sequentialFirstNameRequests.push(wikiFirstNameUrlList.pop());
          } else {
            lastNameRequestResults = sequentialLastNameRequests.map(
              async (url) => {
                return fetch(
                  /*url*/ 'https://ohqs.herokuapp.com/services/dwolla-sandbox/' +
                    url,
                  header
                )
                  .then((res) => {
                    if (wikiLastNameUrlList.length)
                      sequentialLastNameRequests.push(wikiLastNameUrlList.pop());
  
                    return res.json();
                  })
                  .catch((err) => {
                    return {
                      err,
                    };
                  });
              }
            );
          }
  
          return res.json();
        })
        .catch((err) => {
          return { err };
        });
    });
  
    // let wikiResponses = await Promise.allSettled(
    //   stringArr.splice(0, 20).map((sortStart) =>
    //     fetch(`${corsUrl}${wikiFirstNameUrl}${sortStart.join('')}`, {
    //       headers: { 'Api-User-Agent': 'Bot/israelgonzalezb@gmail.com' },
    //     })
    //       .then((res) => res.text())
    //       .catch((err) => console.log('!!!', err))
    //   )
    // );
    // let wikiResponses = await Promise.allSettled(
    //   stringArr.splice(0, 20).map((sortStart) =>
    //     fetch(`${corsUrl}${wikiFirstNameUrl}${sortStart.join('')}`, {
    //       headers: { 'Api-User-Agent': 'Bot/israelgonzalezb@gmail.com' },
    //     })
    //       .then((res) => res.text())
    //       .catch((err) => console.log('!!!', err))
    //   )
    // );
    // return wikiResponses;
    return Promise.allSettled([firstNameRequestResults, lastNameRequestResults]).then(async (...res) => console.log(res[0][0].value[0].then(async res=> await res)));
};
  
module.exports = generateNames;