import express from 'express';
import { logger } from '../../common/Logger';
import { IAuthenticatedRequest } from '../../security/TokenParser';
import { ForbiddenError } from '../exception/ForbiddenError';

export const authorize: () => express.RequestHandler = () => {
  return (req: IAuthenticatedRequest, resp, next) => {
    if (req.authenticated != undefined) {
      logger.debug('User %s authorized in path %s', req.authenticated.getEmail(), req.path);
      next();
    } else {
      next(new ForbiddenError('Access denied'));
    }
  };
};
