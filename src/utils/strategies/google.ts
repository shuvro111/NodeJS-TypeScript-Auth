import passport from 'passport';
import { Profile, VerifyCallback } from 'passport-google-oauth20';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const enableGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        callback: VerifyCallback
      ) => {
        // console.log(accessToken, refreshToken, profile);
        callback(null, profile);
      }
    )
  );

  //Serialize User
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  //De-Serialize User
  passport.deserializeUser((user: object, done) => {
    done(null, user);
  });
};

export default enableGoogleStrategy;
