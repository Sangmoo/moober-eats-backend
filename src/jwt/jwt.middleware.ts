import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

// export class JwtMiddleware implements NestMiddleware {
//   // like Express Server
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(req.headers);
//     next();
//   }
// }

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.headers);
  next();
}
