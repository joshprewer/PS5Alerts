import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import dotenv from "dotenv";

async function main() {
  dotenv.config();

  const Nexmo = require('nexmo');
  const nexmo = new Nexmo({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
  });

  try {
    const gameResponse = await fetch(
      "https://www.argos.co.uk/product/8349000",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0",
          Accept: "text/html",
          "Accept-Language": "en-GB,en;q=0.5",
          Referer: "https://www.google.com/",
          Pragma: "no-cache",
          "Cache-Control": "no-cache",
          "Accept-Encoding": "gzip, deflate, br",
          Cookie: null,
        },
      }
    );

    const text = await gameResponse.text();
    const dom = new JSDOM(text);
    const document = dom.window.document;

    const phrase = "Sorry, PlayStation®5 is currently unavailable.";
    const isAvailable = document.querySelector("h1").textContent !== phrase;

    console.log(isAvailable);

    if (isAvailable) {
      const from = "ShoppingBot";
      const to = process.env.PHONE_NUMBER;
      const text = "PS5 potentially available at Argos";

      nexmo.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
          console.log(err);
        } else {
          if (responseData.messages[0]["status"] === "0") {
            console.log("Message sent successfully.");
          } else {
            console.log(
              `Message failed with error: ${responseData.messages[0]["error-text"]}`
            );
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

main();
