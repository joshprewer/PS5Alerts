import * as dotenv from "dotenv";
import { isAvailable } from "./check-product";
import { sendSms } from "./send-sms";

const TIMEOUT = 5 * 60 * 1000;

function sleep(timer: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), timer));
}

async function main() {
  dotenv.config();

  while (true) {
    try {
      const available = await isAvailable();

      if (available) {
        console.log("PS5 might be available");
        sendSms();
        break;
      }

      console.log("PS5 is unavailable");
      console.log("------------- SLEEPING -------------");
      await sleep(TIMEOUT);
    } catch (error) {
      console.log(error);
      break;
    }
  }
}

main();
