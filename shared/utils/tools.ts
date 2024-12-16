// ./utils/logger.ts
import { pino } from 'pino'

const logger = pino({
  name: 'electron',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
})

export { logger }
