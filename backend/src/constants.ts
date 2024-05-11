export class Constants {
  static readonly MONGO_PROVIDER = 'MONGO_PROVIDER';
  static readonly MONGO_URI = 'MONGO_URI';
  static readonly DB_NAME = 'DB_NAME';
  static readonly DATABASE = 'drawing_db';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_ERROR = 'error';

  // Log Configurations
  static readonly LOG_LEVEL_DEBUG = 'debug';
  static readonly LOG_LEVEL_INFO = 'info';
  static readonly DEFAULT_LOG_LEVEL = this.LOG_LEVEL_DEBUG;
  static readonly LOCAL = 'LOCAL';

  // collection
  static readonly USER_COLLECTION = 'user';
  static readonly WHITEBOARD_COLLECTION = 'whiteboards';
}
