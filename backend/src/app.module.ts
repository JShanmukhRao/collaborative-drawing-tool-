import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { ConfigModule } from '@nestjs/config';
import { AllExceptionsFilter } from './shared/filters/all-exception.filters';
import { WhiteboardModule } from './modules/whiteboard/whiteboard.module';
import { Constants } from './constants';
import { LoggerModule } from 'nestjs-pino';
import { UserWhiteboardModule } from './modules/user-whiteboard/user-whiteboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config/.configurations.env',
      cache: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: true,
        level: Constants.DEFAULT_LOG_LEVEL,
        transport:
          process.env.ENVIRONMENT === Constants.LOCAL
            ? { target: 'pino-pretty' }
            : undefined,
        serializers: {
          req(req) {
            req.body = req.raw.body;
            return req;
          },
        },
        customAttributeKeys: {
          req: 'request',
          res: 'response',
          err: 'error',
          reqId: 'X-Request-Id',
        },
        formatters: {
          level: (label) => {
            return { level: label };
          },
        },
      },
    }),
    AuthModule,
    WhiteboardModule,
    UserWhiteboardModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
