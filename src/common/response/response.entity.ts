import { Exclude, Expose } from 'class-transformer';
import { ResponseStatus } from './response.status';

export class ResponseEntity {
  @Exclude() private readonly statusCode: number;
  @Exclude() private readonly data?: any;
  @Exclude() private readonly error?: string;
  @Exclude() private readonly message?: string;

  private constructor(_status: ResponseStatus);
  private constructor(_status: ResponseStatus, _data: any);
  private constructor(
    _status: ResponseStatus,
    _data: any,
    _error: string,
    _message: string,
  );
  private constructor(
    _status?: ResponseStatus,
    _data?: any,
    _error?: string,
    _message?: string,
  ) {
    this.statusCode = _status;
    this.data = Array.isArray(_data)
      ? [..._data]
      : typeof _data === 'object'
      ? { ..._data }
      : undefined;
    this.error = _error;
    this.message = _message;
  }

  static OK(): ResponseEntity {
    return new ResponseEntity(ResponseStatus.OK);
  }

  static OK_WITH_DATA(data: any): ResponseEntity {
    return new ResponseEntity(ResponseStatus.OK, data);
  }

  static CREATED(): ResponseEntity {
    return new ResponseEntity(ResponseStatus.CREATED);
  }

  static CREATED_WITH_DATA(data: any): ResponseEntity {
    return new ResponseEntity(ResponseStatus.CREATED, data);
  }

  static BAD_REQUEST(message: string): ResponseEntity {
    return new ResponseEntity(
      ResponseStatus.BAD_REQUEST,
      undefined,
      'Bad Request',
      message,
    );
  }

  static UNAUTHORIZED(
    message = '로그인이 필요한 서비스입니다',
  ): ResponseEntity {
    return new ResponseEntity(
      ResponseStatus.UNAUTHORIZED,
      undefined,
      'UnAuthorized',
      message,
    );
  }

  static NOT_FOUND(message: string): ResponseEntity {
    return new ResponseEntity(
      ResponseStatus.NOT_FOUND,
      undefined,
      'Not Found',
      message,
    );
  }

  static LOCKED(message: string): ResponseEntity {
    return new ResponseEntity(
      ResponseStatus.LOCKED,
      undefined,
      'Locked',
      message,
    );
  }

  @Expose()
  get _statusCode(): number {
    return this.statusCode;
  }

  @Expose()
  get _data(): any {
    return this.data;
  }

  @Expose()
  get _error(): string {
    return this.error;
  }

  @Expose()
  get _message(): string {
    return this.message;
  }
}
