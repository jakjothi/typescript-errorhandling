import { Injectable } from '@nestjs/common';
import { Result } from './Result';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/User';
import { getRepository, Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(@InjectRepository(User, 'default') private readonly userRepository: Repository<User>) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  getName(): Result<string> {
    return Result.ok<string>('Prabu Dass');
  }

  getError(): Result<string> {
    return Result.fail(new Error('User not found'));
  }

  generateError(): Result<string> {
    try {
      const res = this.callThirdParty();
      return Result.ok(res.getValue());
    } catch (e) {
      return Result.fail(e.message);
    }
  }

  callThirdParty(): Result<string> {
    throw new Error('Unauthorized');
  }

  // Your code
  public findOneByIdOld(id: number): Promise<any> {
    return getRepository(User)
      .createQueryBuilder('user').where(`user.id=${id}`).getOne();

    // Alternate way 1
    // return getRepository(User).findOne(id);

    // Alternate way 2
    // return getRepository(User)
    //     .createQueryBuilder('user') .where('user.id = :userId', { userId: id }) .getOne();

  }

  // Rewritten code
  public findOneById(id: number): Promise<User> {
    return getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: id })
      .getOne();

    // Alternate ways
    // return getRepository(User).findOne(id);
    // return this.userRepository.findOne(id);
  }
}
