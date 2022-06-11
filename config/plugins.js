module.exports = ({env}) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'smtp.yandex.ru'),
        port: env('SMTP_PORT', 465),
        secure: true,
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: 'kudim84@yandex.ru',
        defaultReplyTo: 'kudim84@gmail.com',
      },
    },
  },
  upload: {
    provider: 'aws-s3',
    providerOptions: {
      accessKeyId: env('AWS_ACCESS_KEY_ID'),
      secretAccessKey: env('AWS_ACCESS_SECRET'),
      endpoint: 'https://s3.storage.selcloud.ru',
      apiVersion: 'latest',
      region: env('AWS_REGION'),
      params: {
        Bucket: env('AWS_BUCKET_NAME'),
      },
      logger: console
    }

  }

})
