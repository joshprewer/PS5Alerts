import Nexmo from 'nexmo'

export function sendSms () {
  const nexmo = new Nexmo({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET
  })

  const from = 'ShoppingBot'
  const to = process.env.PHONE_NUMBER
  const text = 'PS5 potentially available at Argos'

  nexmo.message.sendSms(from, to, text, {}, (err, responseData) => {
    if (err) {
      console.log(err)
    } else {
      if (responseData.messages[0].status === '0') {
        console.log('Message sent successfully.')
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0].status}`
        )
      }
    }
  })
}
