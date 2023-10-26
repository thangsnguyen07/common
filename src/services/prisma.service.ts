import { PrismaClient } from '@prisma/client'

import { Injectable, Logger, OnModuleInit } from '@nestjs/common'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name)
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    })
    this.$on('query', (e) => {
      if (process.env.NODE_ENV !== 'production') {
        this.logger.debug('Query: ' + e.query)
        this.logger.debug('Params: ' + e.params)
        this.logger.debug('Duration: ' + e.duration + 'ms')
      }
    })
  }

  async onModuleInit() {
    this.logger.log('Successfully connected to database...')
    await this.$connect()
  }
}
