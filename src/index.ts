import * as dotenv from 'dotenv'
import { argosHandler } from './argos'
import { gameHandler } from './game'
import { sendSms } from './send-sms'

const TIMEOUT = 5 * 60 * 1000

function sleep (timer: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), timer))
}

async function main () {
  dotenv.config()

  while (true) {
    try {
      const checkProductResponses = await Promise.all([
        argosHandler(),
        gameHandler()
      ])

      const availableResponse = checkProductResponses.find(
        (response) => response.isAvailable
      )

      if (availableResponse) {
        console.log(`PS5 might be available at ${availableResponse.name}`)
        sendSms()
        break
      }

      console.log('PS5 is unavailable')
      console.log('------------- SLEEPING -------------')
      await sleep(TIMEOUT)
    } catch (error) {
      console.log(error)
      break
    }
  }
}

main()
