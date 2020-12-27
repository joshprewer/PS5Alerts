import fetch from 'node-fetch'
import { JSDOM } from 'jsdom'
import { CheckProductResponse } from '../check-product'

const name = 'Amazon'

export async function amazonHandler (): Promise<CheckProductResponse> {
  const response = await fetch('https://www.amazon.co.uk/Far-Amazon-Limited-Exclusive-Amazon-co-uk/dp/B08H95Y452/', {
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
  })

  const text = await response.text()
  const dom = new JSDOM(text)
  const document = dom.window.document

  const addToCart = document.querySelector("input[id='add-to-cart-button']")
  const isAvailable = addToCart !== null

  return {
    name,
    isAvailable
  }
}
