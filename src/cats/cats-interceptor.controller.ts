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
  Req,
  UseInterceptors
} from '@nestjs/common';
import {Roles} from '../common/decorators/roles.decorator';
import {RolesGuard} from '../common/guards/roles.guard';
import {HttpExceptionFilter} from '../common/filters/http-exception.filter';
import {TimeoutInterceptor} from '../common/interceptors/timeout.interceptor';
// import {CatsService} from './cats.service';
import {CatsOrmService} from './cats.orm.service';
import {CreateCatDto} from './dto/create-cat.dto';
import {Cat} from './interfaces/cat.interface';
import {ApiTags} from '@nestjs/swagger';

@UseGuards(RolesGuard)
@UseFilters(HttpExceptionFilter)
@Roles('admin')
@ApiTags('Interceptor Cats')
@UseInterceptors(TimeoutInterceptor)
@Controller('cats-interceptor')
export class CatsIntercepterController {
  constructor(@Inject(CatsOrmService) private readonly catsService: CatsOrmService) {

  }

  async setTimeout(): Promise<any> {
    return new Promise(r => setTimeout(r, 10 * 1000, "done"));
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    await this.setTimeout();
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    await this.setTimeout();
    return this.catsService.findAll();
  }

  @Get('/findByName/:name')
  async findOne(@Param('name')
                  name: string): Promise<Cat> {
    await this.setTimeout();
    return this.catsService.findOne(name);
  }

  @Get('/me')
  async me(@Req() req): Promise<any> {
    await this.setTimeout();
    return req.user;
  }

  @Get('/throwError')
  async throwError(): Promise<any> {
    await this.setTimeout();
    throw new ForbiddenException('Can not access');
  }
}
