import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interfaces';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions, // private readonly configService: ConfigService,
  ) {}

  sign(userID: number): string {
    return jwt.sign({ id: userID }, this.options.privateKey);
    // return jwt.sign(payload, this.configService.get('PRIVATE_KEY'));
  }

  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
