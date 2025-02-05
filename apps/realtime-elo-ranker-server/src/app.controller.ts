import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/data') // Add a slash before 'data' to match the route
  getData(): string {
    return this.appService.getData();
  }
}
