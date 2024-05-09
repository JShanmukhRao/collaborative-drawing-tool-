import { Module } from '@nestjs/common';
import { MongoRepository } from './repository/mongo.repository';
import { MongoProvider } from '@/providers/database/mongo.provider';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongoProvider,
    JwtModule.registerAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        return {
          secret,
          signOptions: { expiresIn: '1d' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [MongoRepository],
  exports: [MongoRepository, JwtModule],
})
export class SharedModule {}
