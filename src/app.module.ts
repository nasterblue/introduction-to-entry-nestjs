import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsModule} from './cats/cats.module';
import {CoreModule} from './core/core.module';
import {LoggerMiddleware} from './common/middleware/logger.middleware';
import {CatsEntity} from './cats/entities/cats.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'nest',
        password: 'nest',
        database: 'nest',
        entities: [CatsEntity],
        synchronize: true,
      }),
    }),
    CoreModule,
    CatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
    .forRoutes('*')
  }
}
