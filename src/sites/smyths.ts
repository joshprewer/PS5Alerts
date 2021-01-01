import fetch from 'node-fetch'
import { CheckProductResponse } from '../check-product'
import { JSDOM } from 'jsdom'

const name = 'Smyths Toys'

export async function smythHandler (): Promise<CheckProductResponse> {
  const homepageResponse = await fetch(
    'https://www.smythstoys.com/uk/en-gb/video-games-and-tablets/playstation-5/playstation-5-consoles/playstation-5-console/p/191259',
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
        Accept: 'text/html',
        'Accept-Language': 'en-GB,en;q=0.5',
        Referer: 'https://www.google.com',
        Pragma: 'no-cache',
        'Cache-Control': 'no-cache',
        'Accept-Encoding': 'gzip, deflate, br',
        Cookie: null
      }
    }
  )

  const outOfStockPhrase = 'Out of Stock. Expected in stock: January 2021'
  const text = await homepageResponse.text()
  const dom = new JSDOM(text)
  const document = dom.window.document

  const outOfStockElement = document.querySelector('#customAddToCartForm > div.instoreMessage > span:nth-child(14) > table > tbody > tr > td:nth-child(2)')
  const isAvailable = outOfStockElement === null || outOfStockElement.textContent !== outOfStockPhrase

  return {
    name,
    isAvailable
  }
}
