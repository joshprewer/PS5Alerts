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
      const responses = await Promise.all([
        argosHandler(),
        gameHandler(),
        // veryHandler(),
        amazonHandler()
      ])

      const unavailableSites = responses
        .filter(element => !element.isAvailable)
        .map(element => element.name)

      const availableSites = responses
        .filter(element => element.isAvailable)
        .map(element => element.name)

      if (availableSites.length !== 0) {
        const message = `PS5 might be available at ${availableSites.join(', ')}`
        console.log('\x1b[32m%s\x1b[0m', message)
        sendSms(message)
        break
      }

      unavailableSites.forEach(site => console.log('\x1b[31m%s\x1b[0m', `PS5 is unavailable at ${site}`))

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
