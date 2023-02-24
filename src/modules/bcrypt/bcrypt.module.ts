import { Global, Module } from '@nestjs/common';
import { BcryptService } from './bcrypt.services';

@Global()
@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
