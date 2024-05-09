import { Injectable, Inject } from '@nestjs/common';
import {
  AnyBulkWriteOperation,
  Db,
  Filter,
  FindOptions,
  UpdateFilter,
  UpdateOptions,
} from 'mongodb';

import { Constants } from '@/constants';

@Injectable()
export class MongoRepository {
  constructor(
    @Inject(Constants.MONGO_PROVIDER)
    protected db: Db,
  ) {}

  find(
    collection: string,
    query: Filter<any> = {},
    options: FindOptions<any> = {},
  ): Promise<Array<any>> {
    return this.db.collection(collection).find(query, options).toArray();
  }

  findOne(
    collection: string,
    query: Filter<any>,
    options?: FindOptions<any>,
  ): Promise<any> {
    return this.db.collection(collection).findOne(query, options);
  }

  insertOne(collection: string, document: any) {
    return this.db.collection(collection).insertOne(document);
  }

  updateOne(
    collection: string,
    filter: Filter<any>,
    update: UpdateFilter<any>,
    options?: UpdateOptions,
  ) {
    return this.db.collection(collection).updateOne(filter, update, options);
  }

  insertMany(collection: string, document: any) {
    return this.db.collection(collection).insertMany(document);
  }

  deleteMany(collection: string, query: Filter<any>) {
    return this.db.collection(collection).deleteMany(query);
  }

  deleteOne(collection: string, query: Filter<any>) {
    return this.db.collection(collection).deleteOne(query);
  }

  aggregate(collection: string, pipeline: any) {
    return this.db
      .collection(collection)
      .aggregate(pipeline, {
        allowDiskUse: true,
      })
      .toArray();
  }

  bulkWrite(collection: string, pipeline: Array<AnyBulkWriteOperation>) {
    return this.db.collection(collection).bulkWrite(pipeline);
  }

  deleteCollection(collection: string) {
    return this.db.collection(collection).drop();
  }
}
