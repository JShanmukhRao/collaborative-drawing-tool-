import { Logger, Module } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';
import { Constants } from 'src/constants';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: Constants.MONGO_PROVIDER,
      useFactory: async (configService: ConfigService): Promise<Db> => {
        try {
          console.log(
            'Connecting to database',
            configService.get(Constants.MONGO_URI),
          );
          const client = await MongoClient.connect(
            configService.get(Constants.MONGO_URI),
          );
          return configService.get(Constants.DB_NAME)
            ? client.db(configService.get(Constants.DB_NAME))
            : client.db(Constants.DATABASE);
        } catch (error) {
          Logger.error(`Error connecting to database ${error}`);
          return error;
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: [Constants.MONGO_PROVIDER],
})
export class MongoProvider {}
