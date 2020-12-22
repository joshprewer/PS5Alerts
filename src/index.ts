import * as dotenv from 'dotenv';
import { checkProduct } from './check-product'

// 5 minutes
const TIMEOUT = 5 * 60 * 1000;

function sleep(timer: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), timer));
}

async function main() {
  dotenv.config();

  while (true) {

    await checkProduct();

    console.log('------------- SLEEPING -------------');
    await sleep(TIMEOUT);
  }
}

main();

