import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/service';
import { ConfigService } from './common/config/service';
import { SERVICE_CONFIGS } from './common/config/const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = app.getHttpAdapter();
  const loggerService = app.get(LoggerService);
  const configService = app.get(ConfigService);

  const name = <string>configService.get(SERVICE_CONFIGS.NAME);
  const desc = <string>configService.get(SERVICE_CONFIGS.DESCRIPTION);
  const version = <string>configService.get(SERVICE_CONFIGS.VERSION);
  const baseUrl = <string>configService.get(SERVICE_CONFIGS.BASE);
  const docsUrl = <string>configService.get(SERVICE_CONFIGS.DOCS);
  const port = <number>configService.get(SERVICE_CONFIGS.PORT);

  app.setGlobalPrefix(baseUrl);
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle(name)
    .setDescription(`${desc} | [swagger.json](swagger.json)`)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync(
    `${process.cwd()}/swagger.json`,
    JSON.stringify(document, null, 2),
    { encoding: 'utf8' },
  );
  server.get(`${docsUrl}/swagger.json`, (_req, res) => {
    res.json(document);
  });
  SwaggerModule.setup(docsUrl, app, document, {
    swaggerOptions: {
      displayOperationId: true,
    },
  });

  try {
    app.enableCors();
    await app.listen(port);
    loggerService.log(
      `API endpoints are ready on port (${<number>(
        configService.get('server.port')
      )})`,
      'NestApplication',
    );
  } catch (error) {
    loggerService.error('Unable to lunch the API', error, 'NestApplication');
  }
}
bootstrap();
