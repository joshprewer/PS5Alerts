import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import { sendSms } from "./send-sms";

const FETCH_TIMEOUT = 20 * 1000;

export async function isAvailable(): Promise<boolean> {
  const argosResponse = await fetch("https://www.argos.co.uk/product/8349000", {
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
    timeout: FETCH_TIMEOUT,
  });

  const text = await argosResponse.text();
  const dom = new JSDOM(text);
  const document = dom.window.document;

  const phrase = "Sorry, PlayStation®5 is currently unavailable.";
  const isAvailable = document.querySelector("h1").textContent !== phrase;

  if (isAvailable) {
    console.log("PS5 might be available");
    sendSms();

    return true;
  }

  console.log("PS5 is unavailable");
  return false;
}
