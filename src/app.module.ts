import { Global, Module } from '@nestjs/common'

import * as services from '@services'

const providers = Object.values(services)

@Global()
@Module({
  providers: providers,
  exports: providers,
})
export class CommonModule {}
