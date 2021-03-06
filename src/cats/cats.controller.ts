import {Body, Controller, ForbiddenException, Get, Inject, Param, Post, UseFilters} from '@nestjs/common';
import {HttpExceptionFilter} from '../common/filters/http-exception.filter';
import {CatsOrmService} from './cats.orm.service';
import {CatBreed, CreateCatDto} from './dto/create-cat.dto';
import * as faker from 'faker';
import {Cat, CreateCatRequest} from './interfaces/cat.interface';
import {ApiTags} from '@nestjs/swagger';

@UseFilters(HttpExceptionFilter)
@ApiTags('Public Cats')
@Controller('cats')
export class CatsController {
  constructor(@Inject(CatsOrmService) private readonly catsService: CatsOrmService) {
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/findByName/:name')
  async findOne(@Param('name')
                  name: string): Promise<Cat> {
    return this.catsService.findOne(name);
  }


  @Get('/throwError')
  async throwError(): Promise<any> {
    throw new ForbiddenException('Can not access');
  }

  @Get('/seedDB/:total')
  async seedDB(@Param('total') total: number): Promise<any> {
    for (let i = 0; i < total; i++) {
      await this.catsService.create(this.randomCat());
    }
  }

  private randomCat(): CreateCatRequest {
    return {
      name: faker.name.firstName(),
      age: Math.floor((Math.random() * 10) + 1),
      breed: Math.floor((Math.random() * 10)) % 2 === 0 ? CatBreed.male : CatBreed.female
    };
  }


}
