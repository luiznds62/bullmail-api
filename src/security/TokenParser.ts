import express from 'express';
import * as jwt from 'jsonwebtoken';
import { Inject, Singleton } from 'typescript-ioc';
import { UserService } from '../domain/user/UserService';
import { User } from '../domain/user/User';
import environment from '../common/Environments';

export interface IAuthenticatedRequest extends express.Request {
  authenticated: User;
}
@Singleton
class TokenParser {
  @Inject
  userService: UserService;

  parse: express.RequestHandler = (req: IAuthenticatedRequest, res, next) => {
    const token = this.extractToken(req);
    if (token) {
      jwt.verify(token, environment.SECURITY.API_SECRET, this.applyBearer(req, next));
    } else {
      next();
    }
  };

  extractToken(req: express.Request) {
    let token = undefined;
    const authorization = req.header('authorization');
    if (authorization) {
      const parts: string[] = authorization.split(' ');
      if (parts.length == 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }
    return token;
  }

  applyBearer(req: IAuthenticatedRequest, next): (error, decoded) => void {
    return async (error, decoded) => {
      if (decoded) {
        try {
          const user = await this.userService.findByEmail(decoded.sub);
          if (user) {
            req.authenticated = user;
          }
          next();
        } catch (e) {
          next(e);
        }
      } else {
        next();
      }
    };
  }
}

export { TokenParser };
