import * as dotenv from 'dotenv';
import { isAvailable } from './check-product'

const TIMEOUT = 5 * 60 * 1000;

function sleep(timer: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), timer));
}

async function main() {
  dotenv.config();

  var keepChecking = true;

  while (keepChecking) {
    try {
      const available = await isAvailable();
      keepChecking = !available;

      console.log('------------- SLEEPING -------------');
      await sleep(TIMEOUT);

    } catch (error) {
      console.log(error);
      break
    }
  }
}

main();

