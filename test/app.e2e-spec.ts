import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /:expressions(*)', () => {
    it('should return 8', () => {
      return request(app.getHttpServer()).get('/3+5').expect(200).expect('8');
    });

    it('should return 12.77', () => {
      return request(app.getHttpServer())
        .get('/(3+9)/0.94')
        .expect(200)
        .expect('12.77');
    });

    it('should return 4', () => {
      return request(app.getHttpServer())
        .get('/(3+5)/(4-2)')
        .expect(200)
        .expect('4');
    });

    it('should return 72', () => {
      return request(app.getHttpServer())
        .get('/(5*(3+1)-2)*(3+1)')
        .expect(200)
        .expect('72');
    });
  });
});
