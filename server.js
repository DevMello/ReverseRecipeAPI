const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const sleep = require('sleep-promise');
const port = 4000;
let answer;
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Success! Your application is running on port ${port}.`);
});
function api(kitchen) {
  fetch("https://d1.supercook.com/dyn/results", { // API that I'm using to run this entire project. Took alot of time to find. Make a pull request if better api found
  "headers": { // headers sent to the public website
    "accept": "application/json, text/plain, /", // application/json preferable
    "accept-language": "en-US,en;q=0.9", //language being returned. Im not sure of all the languages supported but i recommend english
    "content-type": "application/x-www-form-urlencoded", // CANNOT BE CHANGED
    "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"9\9\", \"Google Chrome\";v=\"99\"", // leave as be
    "sec-ch-ua-mobile": "?0", // don't edit
    "sec-ch-ua-platform": "\"macOS\"", // macOS seems to work better then Windows
    "sec-fetch-dest": "empty", // leave as be
    "sec-fetch-mode": "cors", // leave as be
    "sec-fetch-site": "same-site", // leave as be
    "Referer": "https://supercook.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": `needsimage=1&app=1&kitchen=${kitchen}&focus=&kw=&catname=&start=0&fave=false&lang=en&cv=2`,
  "method": "POST"
}).then(res => res.text()).then(text => answer = text); // on result assign data to a variable which can read and returned to the customer
}
app.get('/', async function (req, res) {
    console.log((req.headers)); // testing/Can be removed now
    if (req.headers.api === "YvI?MZGHlNPeHJQYD.gcH.PlVPGYUn8c") { //api authentication. Not very secure as visible
        api(req.headers.ingredients); // should be edited to hava an await there for has enough time to complete the request even on slow servers
        await sleep(3000); // pause to wait for unofficial api call to return a result. Not consistent
        console.log(answer) // testing to see if api calls anything. Can be removed
        res.json(answer) // return data in json format
    }
});