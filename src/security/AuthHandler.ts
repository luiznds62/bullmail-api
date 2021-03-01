import * as jwt from 'jsonwebtoken';
import environment from '../common/Environments';
import { Inject, Singleton } from 'typescript-ioc';
import { logger } from '../common/Logger';
import { NotAuthorizedError } from '../core/exception/NotAuthorizedError';
import { UserService } from '../domain/user/UserService';
import { User } from '../domain/user/User';

@Singleton
class AuthHandler {
  @Inject
  private userService: UserService;

  authenticate = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user: User = await this.userService.findByEmail(email);
      if (user && this.userService.isPasswordMatch(password, user.getPassword())) {
        const token = jwt.sign({ sub: user.getEmail(), iss: environment.SECURITY.ISS }, environment.SECURITY.API_SECRET, { expiresIn: 60 * 60 });

        res.json({
          _id: user._id,
          name: user.getName(),
          email: user.getEmail(),
          accessToken: token
        });
        return next(false);
      } else {
        return next(new NotAuthorizedError('Invalid credentials'));
      }
    } catch (e) {
      logger.error(e.message);
    }
  };
}

export { AuthHandler };
