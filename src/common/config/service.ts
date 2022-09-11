import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_PROVIDER, IConfig } from './provider';

@Injectable()
export class ConfigService {
  public env: string;

  public constructor(
    @Inject(CONFIG_PROVIDER) private readonly configProvider: IConfig,
  ) {
    switch (process.env.NODE_ENV) {
      case 'dev':
      case 'development':
        this.env = 'development';
        break;
      case 'prod':
      case 'production':
        this.env = 'production';
        break;
      case 'stage':
      case 'staging':
        this.env = 'staging';
        break;
      default:
        this.env = 'development';
    }
  }

  public getEnv(key: string): string {
    return process.env[key];
  }

  public get<T>(keyConfig: string, def: any = ''): T {
    return (
      this.getEnv(this.configProvider.get(keyConfig)) ||
      this.configProvider.get(keyConfig) ||
      def
    );
  }

  public has(keyConfig: string): boolean {
    return this.configProvider.has(keyConfig);
  }
}
