import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Result } from './Result';
import { User } from './entity/User';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/name')
  getName(): string {
    const name: Result<string> = this.appService.getName();
    if (name.isFailure) {
      return name.error.toString();
    }
    return name.getValue();
  }

  @Get('/error')
  async getError(): Promise<string> {
    const name: Result<string> = await this.appService.getError();
    if (name.isFailure) {
      console.log('Error occured');
      return name.error.toString();
    }
    return name.getValue();
  }

  @Get('/third')
  async getErrorFromThirdParty(): Promise<string> {
    const name: Result<string> = await this.appService.generateError();
    if (name.isFailure) {
      console.log('Error occured thirdparty');
      return name.error.toString();
    }
    return name.getValue();
  }

  @Get('/user')
  async getUser(): Promise<User> {
    // Static user for demo purpose
    return this.appService.findOneById(1);
  }
}
