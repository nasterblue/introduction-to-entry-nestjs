import {Injectable, NestMiddleware} from '@nestjs/common';

@Injectable()
export class FakeAdminMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`FakeAdminMiddleware...`);
    req.user = {
      roles: ['admin', 'moderate'],
      username: "nasterblue"
    };
    next();
  }
}
