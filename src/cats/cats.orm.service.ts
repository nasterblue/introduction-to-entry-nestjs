import {Injectable} from '@nestjs/common';
import {Cat} from './interfaces/cat.interface';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CatsEntity} from './entities/cats.entity';

@Injectable()
export class CatsOrmService {
  constructor(@InjectRepository(CatsEntity)
              private repository: Repository<CatsEntity>,) {
  }

  async create(cat: Cat): Promise<Cat> {
    const data = this.repository.create(cat as any);
    return this.repository.save(data as any );
  }

  async findAll(): Promise<Cat[]> {
    return await  this.repository.find();
  }

  async findOne(name: string): Promise<Cat> {
    return await  this.repository.findOne({name});
  }
}
