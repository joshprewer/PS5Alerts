import fetch from 'node-fetch'
import { CheckProductResponse } from './check-product'

const name = 'Very'

export async function veryHandler (): Promise<CheckProductResponse> {
  const response = await fetch(
    'https://www.very.co.uk/playstation-5-disc-console-with-optional-extras/1600516836.prd',
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        Accept: 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'en-GB,en;q=0.5',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'gzip, deflate, br',
        Cookie: null
      }
    })

  const redirectURL = response.url === 'https://www.very.co.uk/'
  const isAvailable = !response.redirected || !redirectURL

  return {
    name,
    isAvailable
  }
}
