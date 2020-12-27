import * as dotenv from 'dotenv'
import { argosHandler } from './argos'
import { gameHandler } from './game'
import { veryHandler } from './very'
import { amazonHandler } from './amazon'
import { sendSms } from './send-sms'

const TIMEOUT = 5 * 60 * 1000

function sleep (timer: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(() => resolve(), timer))
}

async function main () {
  dotenv.config()
  console.log('Alerts started')

  while (true) {
    try {
      const checkProductResponses = await Promise.all([
        argosHandler(),
        gameHandler(),
        // veryHandler(),
        amazonHandler()
      ])

      const availableResponse = checkProductResponses.find(
        (response) => response.isAvailable
      )

      if (availableResponse) {
        const message = `PS5 might be available at ${availableResponse.name}`
        console.log(message)
        sendSms(message)
        break
      }

      console.log('PS5 is unavailable')
      console.log('------------- SLEEPING -------------')
      await sleep(TIMEOUT)
    } catch (error) {
      sendSms('Something went wrong. Please restart me!')
      console.log(error)
      break
    }
  }
}

main()
