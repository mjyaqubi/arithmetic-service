import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from './common/config/module';
import { LoggerModule } from './common/logger/module';
import { CalculatorModule } from './calculator/module';
import { LoggerMiddleware } from './common/logger/middleware';
import { ConfigService } from './common/config/service';
import { LOGGER_CONFIGS } from './common/config/const';

@Module({
  imports: [ConfigModule, LoggerModule, CalculatorModule],
})
export class AppModule {
  httpLogger = false;

  constructor(private readonly config: ConfigService) {
    this.httpLogger = config.get(LOGGER_CONFIGS.HTTP, false);
  }

  configure(consumer: MiddlewareConsumer) {
    if (this.httpLogger) {
      consumer.apply(LoggerMiddleware).forRoutes('*');
    }
  }
}
