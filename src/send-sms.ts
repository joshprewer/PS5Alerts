import aws from 'aws-sdk'

export async function sendSms (message: string) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
  })

  const smsParams = {
    attributes: {
      DefaultSMSType: 'Promotional',
      DefaultSenderID: 'PS5Alerts'
    }
  }
  const msgParams = {
    Message: message,
    PhoneNumber: process.env.PHONE_NUMBER
  }

  if (process.env.BUILD_ENVIRONMENT === 'prod') {
    const setSMSType = new aws.SNS({ apiVersion: '2010-03-31' })
      .setSMSAttributes(smsParams)
      .promise()
    const publishText = new aws.SNS({ apiVersion: '2010-03-31' })
      .publish(msgParams)
      .promise()

    try {
      await setSMSType
      await publishText
    } catch (error) {
      console.log(error)
    }
  }
}
