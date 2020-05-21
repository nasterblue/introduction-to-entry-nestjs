import {
  Inject,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseFilters,
  ForbiddenException,
  Req
} from '@nestjs/common';
import {Roles} from '../common/decorators/roles.decorator';
import {RolesGuard} from '../common/guards/roles.guard';
import {HttpExceptionFilter} from '../common/filters/http-exception.filter';
// import {CatsService} from './cats.service';
import {CatsOrmService} from './cats.orm.service';
import {CreateCatDto} from './dto/create-cat.dto';
import {Cat} from './interfaces/cat.interface';
import {ApiTags} from '@nestjs/swagger';

@UseGuards(RolesGuard)
@UseFilters(HttpExceptionFilter)
@Roles('admin')
@ApiTags('Secured Cats')
@Controller('cats-secured')
export class CatsSecuredController {
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

  @Get('/me')
  async me(@Req() req): Promise<any> {
    return req.user;
  }

  @Get('/throwError')
  async throwError(): Promise<any> {
    throw new ForbiddenException('Can not access');
  }
}
