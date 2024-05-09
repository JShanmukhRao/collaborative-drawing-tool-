import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '@/constants';

export class Response<T> {
  data: T;
  timestamp: string;
  path: string;
  statusCode: number;
  message: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => ({
        message: data?.message,
        data: data?.message ? data.response : data,
        timestamp: new Date().toISOString(),
        path: request.url,
        statusCode: statusCode,
        status: Constants.STATUS_SUCCESS,
      })),
    );
  }
}
