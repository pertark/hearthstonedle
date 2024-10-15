const fs = require('node:fs');
const { mkdir } = require("node:fs/promises");
const { Readable } = require('node:stream');
const { finished } = require('node:stream/promises');
const path = require("node:path");

(async () => {
let pagesToFetch = 1;
let currPage = 1;
let cards = [];
while (pagesToFetch > 0) {
await fetch(`https://api.blizzard.com/hearthstone/cards?class=all&page=${currPage}&pageSize=100&set=standard&sort=manaCost%3Aasc%2Cname%3Aasc%2Cclasses%3Aasc&locale=en_US`, {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "authorization": "Bearer USOg2jfFHziCXY7niNoe4gs2pnVqpdbHBt",
    "content-type": "application/json",
    "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site"
  },
  "referrer": "https://hearthstone.blizzard.com/en-us/cards?set=standard",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
}).then(x => x.json()).then(x => {
  console.log(x);
  cards = cards.concat(x.cards)
  pagesToFetch = x.pageCount - currPage;
  currPage += 1;
  console.log(`${cards.length}/${x.cardCount}`)
  return Promise.all(x.cards.map((card) => downloadCard(card.image, `${card.id}.png`)));
});
}
fs.writeFile("cards.json", JSON.stringify(cards), 'utf-8', () => {})
})();

async function downloadCard(dlUrl, fileName) {
  await fetch(dlUrl, {
    "headers": {
      "sec-ch-ua": "\"Google Chrome\";v=\"129\", \"Not=A?Brand\";v=\"8\", \"Chromium\";v=\"129\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\""
    },
    "referrer": "https://hearthstone.blizzard.com/en-us/cards?set=standard",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
  }).then(x => {
    // write to disk
    (async () => {
      const destination = path.resolve("./cards", fileName);
      const fileStream = fs.createWriteStream(destination, { flags: 'wx' });
      await finished(Readable.fromWeb(x.body).pipe(fileStream));
    })();
  });
}
