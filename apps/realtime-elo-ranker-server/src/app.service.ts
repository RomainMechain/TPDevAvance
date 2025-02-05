import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private data: string = 'Un test pour voir si ca marche';

  getHello(): string {
    return 'Hello World!';
  }

  getData(): string {
    return this.data;
  }
}
