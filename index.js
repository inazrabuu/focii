require('dotenv').config()
const express = require('express')
const { Telegraf } = require('telegraf')

const TME_BOT_TOKEN = process.env.TME_BOT_TOKEN,
      PUBLIC_URL = process.env.PUBLIC_URL?.replace(/\/$/, ''),
      PORT = process.env.PORT || 3000

if (!TME_BOT_TOKEN) {
  console.error('Missing TME_BOT_TOKEN')
  process.exit(1)
}

const bot = new Telegraf(TME_BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Hello! Webhook is alive!`))
bot.help((ctx) => ctx.reply(`Send me text and I will echo it.`))
bot.on('text', (ctx) => ctx.reply(`You said: ${ctx.message.text}`))

const app = express()
app.use(express.json())

const WEBHOOK_PATH = `/webhook/${TME_BOT_TOKEN}`

app.post(WEBHOOK_PATH, (req, res, next) => {
  bot.handleUpdate(req.body, res).catch((err) => {
    console.error(`handleUpdate error: ${err}`)
  })

  res.sendStatus(200)
})

app.get('/', (req, res) => res.send('OK'))

app.listen(PORT, async () => {
  if (PUBLIC_URL) {
    const webhookUrl = `${PUBLIC_URL}${WEBHOOK_PATH}`
    try {
      const ok = await bot.telegram.setWebhook(webhookUrl)
      console.log(`Set webhook: ${ok} -> ${webhookUrl}`)
    } catch (err) {
      console.error(`Failed to set webhook: ${err}`)
    }
  } else {
    console.error(`PUBLIC_URL is not set!`)
    process.exit(1)
  }
})