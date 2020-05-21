import {Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CatsController} from './cats.controller';
import {CatsSecuredController} from './cats-secured.controller';
import {CatsIntercepterController} from './cats-interceptor.controller';
import {CatsService} from './cats.service';
import {CatsOrmService} from './cats.orm.service';
import {CatsEntity} from './entities/cats.entity';
import {FakeAdminMiddleware} from '../common/middleware/fake-admin.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([CatsEntity]),
  ],
  controllers: [
    CatsController,
    CatsSecuredController,
    CatsIntercepterController
  ],
  providers: [
    CatsService,
    CatsOrmService
  ],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FakeAdminMiddleware)
    .forRoutes('*')
  }
}
