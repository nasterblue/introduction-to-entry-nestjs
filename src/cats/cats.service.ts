import {Injectable} from '@nestjs/common';
import {Cat} from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  async create(cat: Cat): Promise<Cat> {
    this.cats.push(cat);
    return cat;
  }

  async findAll(): Promise<Cat[]> {
    return this.cats;
  }

  async findOne(name: string): Promise<Cat> {
    return this.cats.find((cat) => {
      return cat.name == name
    });
  }
}
