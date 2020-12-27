import fetch from 'node-fetch'
import { CheckProductResponse } from '../check-product'

const name = 'Game'

export async function gameHandler (): Promise<CheckProductResponse> {
  const response = await fetch(
    'https://www.game.co.uk/en/playstation-5-additional-dualsense-wireless-controller-2835866',
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:83.0) Gecko/20100101 Firefox/83.0',
        Accept: 'text/html',
        'Accept-Language': 'en-GB,en;q=0.5',
        Referer: 'https://www.google.com/',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'gzip, deflate, br',
        Cookie: null
      }
    }
  )

  const redirectURL = response.url === 'https://www.game.co.uk/playstation-5'
  const isAvailable = !response.redirected || !redirectURL

  return {
    name,
    isAvailable
  }
}
