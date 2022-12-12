import { JwtPayload, VerifyCallback, VerifyErrors } from 'jsonwebtoken';
import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import User from '../../user/entities/User';

export const enableJwtStrategy = () => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwtPayload: JwtPayload, done: VerifyCallback) => {
        return User.findOneOrFail({
          where: { id: jwtPayload.id, email: jwtPayload.email },
        })
          .then((user) => {
            return done(null, user);
          })
          .catch((err: VerifyErrors) => {
            return done(err, {
              success: false,
            });
          });
      }
    )
  );
};
